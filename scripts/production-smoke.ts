import assert from "node:assert/strict";
import { once } from "node:events";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { lessons } from "@/data/lessons";
import { createLessonAccessCookie } from "@/lib/lesson-access";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const HOST = "127.0.0.1";
const PORT = Number(process.env.SMOKE_PORT || "3417");
const BASE_URL = `http://${HOST}:${PORT}`;
const LESSON_ACCESS_SECRET = "production-smoke-lesson-secret";
const PUBLIC_HTML_PATHS = [
  "/",
  "/about",
  "/curriculum",
  "/lessons",
  "/lessons/1-1",
  "/level-test",
];

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function countMainElements(html: string): number {
  return (html.match(/<main(?:\s|>)/g) || []).length;
}

async function waitForServer(child: ReturnType<typeof spawn>): Promise<void> {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`운영 서버가 준비 전에 종료되었습니다. 종료 코드: ${child.exitCode}`);
    }
    try {
      const response = await fetch(BASE_URL, { redirect: "manual" });
      if (response.status < 500) return;
    } catch {
      // Server is still starting.
    }
    await delay(200);
  }
  throw new Error("운영 서버 준비 시간이 초과되었습니다.");
}

async function stopServer(child: ReturnType<typeof spawn>): Promise<void> {
  if (child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([once(child, "exit"), delay(5_000)]);
  if (child.exitCode === null) child.kill("SIGKILL");
}

async function fetchHtml(pathname: string, cookie?: string) {
  const response = await fetch(`${BASE_URL}${pathname}`, {
    cache: "no-store",
    headers: cookie ? { cookie } : undefined,
    redirect: "manual",
  });
  assert.strictEqual(response.status, 200, `${pathname} 응답 상태가 200이어야 합니다.`);
  assert(response.headers.get("content-type")?.includes("text/html"));
  return { response, html: await response.text() };
}

async function main() {
  process.env.LESSON_ACCESS_SECRET = LESSON_ACCESS_SECRET;
  const child = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-H", HOST, "-p", String(PORT)],
    {
      cwd: ROOT,
      env: {
        ...process.env,
        NODE_ENV: "production",
        ADMIN_SESSION_SECRET: "production-smoke-admin-session-secret",
        LESSON_ACCESS_SECRET,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  let serverLogs = "";
  child.stdout?.on("data", (chunk) => {
    serverLogs += chunk.toString();
  });
  child.stderr?.on("data", (chunk) => {
    serverLogs += chunk.toString();
  });

  try {
    await waitForServer(child);

    let homeHtml = "";
    for (const pathname of PUBLIC_HTML_PATHS) {
      const { html } = await fetchHtml(pathname);
      assert.strictEqual(
        countMainElements(html),
        1,
        `${pathname}에는 의미론적 main 요소가 정확히 하나여야 합니다.`,
      );
      if (pathname === "/") homeHtml = html;
    }

    const lesson = lessons["1-1"];
    assert(lesson);
    const protectedMarker = (lesson.sections as Array<{ heading: string }>)
      .map((section) => section.heading)
      .find((heading) => heading.length >= 5);
    assert(protectedMarker, "보호 본문 확인용 강의 표식을 찾지 못했습니다.");

    const anonymous = await fetchHtml("/lessons/1-1");
    assert(anonymous.html.includes(lesson.title));
    assert(anonymous.html.includes("본문은 인증 후 공개됩니다."));
    assert(!anonymous.html.includes(protectedMarker));

    const accessCookie = createLessonAccessCookie();
    assert(accessCookie, "강의 접근 쿠키 생성에 실패했습니다.");
    const authenticated = await fetchHtml(
      "/lessons/1-1",
      `${accessCookie.cookieName}=${accessCookie.value}`,
    );
    assert(authenticated.html.includes(lesson.title));
    assert(authenticated.html.includes(protectedMarker));
    assert(!authenticated.html.includes("본문은 인증 후 공개됩니다."));
    assert.strictEqual(countMainElements(authenticated.html), 1);

    await delay(200);
    assert(!serverLogs.includes("DYNAMIC_SERVER_USAGE"), serverLogs);

    const inlineScriptsWithoutNonce = (homeHtml.match(/<script(?![^>]*\bsrc=)(?![^>]*\bnonce=)[^>]*>/g) || []).length;
    console.log(`운영 CSP 관찰: nonce 없는 인라인 script ${inlineScriptsWithoutNonce}개`);
    console.log("운영 통합 스모크 통과");
  } finally {
    await stopServer(child);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
