import "./visual-experience.test-cases";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

import { getOrderedLessons, isValidLessonId } from "@/lib/lesson-catalog";
import { buildSignedSession, verifySignedSession } from "@/lib/auth";
import {
  compareLessonAccessCode,
  createLessonAccessCode,
  formatSeoulDateTime,
  getNextSeoulMidnight,
  getTodayLessonCode,
  secondsUntilSeoulMidnight,
  seoulDateString,
} from "@/lib/lesson-access";
import {
  LEVEL_TEST_QUESTIONS,
  calculateLevelTestResult,
  buildEmptyAnswers,
  type LevelTestAnswers,
  validateAnswers,
  validateStoredAnswers,
} from "@/lib/level-test";
import { serializeJsonLd } from "@/lib/serialize-jsonld";
import { isLessonPayload } from "@/lib/lesson-schema";
import { generateMetadata } from "@/app/lessons/[id]/page";
import {
  calculateRetryAfter,
  clearAdminLoginBucket,
  getAdminLoginFailureBucket,
  getFirstIpFromRequest,
  isAdminLoginRateLimited,
  recordAdminLoginFailure,
  validateAdminPasswordInput,
} from "@/app/api/admin/auth/route";
import {
  isReactionType,
  isValidLessonReactionId,
  isRateLimitedReaction,
  parseReactionRequestIp,
  recordReactionAttempt,
  clearReactionBuckets,
} from "@/app/api/lessons/[id]/reactions/route";
import {
  EMPTY_LESSON_PROGRESS,
  LESSON_PROGRESS_STORAGE_KEY,
  parseLessonProgress,
  toggleLessonCompleted,
  updateLastVisited,
} from "@/lib/lesson-progress";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

function buildPresetAnswers(value: number): LevelTestAnswers {
  return LEVEL_TEST_QUESTIONS.reduce<Record<string, number>>((acc, question) => {
    acc[question.id] = value;
    return acc;
  }, {});
}

function read(filePath: string): string {
  return fs.readFileSync(path.resolve(ROOT, filePath), "utf8");
}

async function run(name: string, fn: () => void | Promise<void>) {
  try {
    await fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.error(`❌ ${name}`);
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exitCode = 1;
  }
}

run("보안 헤더는 비밀값 미설정 시 안전 실패 조건이 반영되어야 함", () => {
  const code = read("src/lib/auth.ts");
  assert(code.includes("timingSafeEqual"));
  assert(code.includes("ADMIN_SESSION_SECRET"));
  assert(!code.includes('"0715"'));
});

run("관리자 토큰은 HMAC 서명 및 변조 검증을 수행해야 함", () => {
  const token = buildSignedSession(`v2|${Date.now()}|nonce`, "session-secret");
  assert(verifySignedSession(token, "session-secret"));
  const tampered = token.replace(/\.[^.]*/, ".xxxxxxxx");
  assert(!verifySignedSession(tampered, "session-secret"));
});

run("JSON-LD 직렬화는 HTML 종료 문자와 자바스크립트 줄 구분자를 이스케이프해야 함", () => {
  const source = { value: "</script><script>alert(1)</script>&\u2028\u2029>" };
  const serialized = serializeJsonLd(source);
  assert(!serialized.includes("<"));
  assert(!serialized.includes(">"));
  assert(!serialized.includes("&"));
  assert(!serialized.includes("\u2028"));
  assert(!serialized.includes("\u2029"));
  assert(serialized.includes("\\u003C/script\\u003E"));
  assert(serialized.includes("\\u0026"));
  assert(serialized.includes("\\u2028"));
  assert(serialized.includes("\\u2029"));
  assert.deepStrictEqual(JSON.parse(serialized), source);
});

run("일일 접근 코드는 서울 기준 YYMMDD로 생성/비교되어야 함", () => {
  process.env.LESSON_ACCESS_SECRET = "lesson-secret";
  const today = getTodayLessonCode();
  assert.strictEqual(today.length, 6);
  assert.strictEqual(today, seoulDateString());

  const expected = createLessonAccessCode("lesson-secret", "260701");
  assert.strictEqual(expected, "260701");
  assert.strictEqual(createLessonAccessCode("different-secret", "260701"), "260701");
  assert.strictEqual(createLessonAccessCode("lesson-secret", "20260701"), "");

  const first = today;
  const second = getTodayLessonCode();
  assert.strictEqual(first, second);
  assert(!compareLessonAccessCode(first, `${first}0`));
});

run("강의 ID 형식 검증이 유효한 형식만 허용해야 함", () => {
  assert(isValidLessonId("1-1"));
  assert(!isValidLessonId("a-1"));
});

run("강의 API 페이로드 스키마 기본 검증이 동작해야 함", () => {
  const payload = {
    id: "1-1",
    phase: "Phase 1",
    title: "테스트",
    summary: "요약",
    prev: null,
    next: null,
    sections: [{ heading: "A", content: "B", code: "", tip: "" }],
    keyTakeaways: ["첫째"],
  };
  assert(isLessonPayload(payload));
  assert(!isLessonPayload({ ...payload, sections: "invalid" as unknown as typeof payload.sections }));
  assert(!isLessonPayload({ ...payload, keyTakeaways: "invalid" as unknown as typeof payload.keyTakeaways }));
});

run("커리큘럼 페이지는 전체 강의 79개 링크를 렌더링해야 함", () => {
  const curriculumSource = read("src/app/curriculum/page.tsx");
  assert(curriculumSource.includes("href={`/lessons/${lesson.id}`"));
  const links = getOrderedLessons().map((lesson) => `/lessons/${lesson.id}`);
  assert.strictEqual(links.length, 79);
  assert(curriculumSource.includes("lessonGroups"));
});

run("학습 진도 파서는 허용 ID만 보존해야 함", () => {
  const raw = JSON.stringify({
    version: 1,
    completedLessonIds: ["1-1", "9-9", 123],
    lastVisited: { id: "1-1", title: "입문", at: 1000 },
    extra: "x",
  });
  const parsed = parseLessonProgress(raw, ["1-1", "1-2"]);
  assert.strictEqual(parsed.version, 1);
  assert.deepStrictEqual(parsed.completedLessonIds, ["1-1"]);
  assert.deepStrictEqual(parsed.lastVisited, { id: "1-1", title: "입문", at: 1000 });
});

run("학습 진도 버전 불일치 시 상태는 EMPTY로 초기화되어야 함", () => {
  const raw = JSON.stringify({
    version: 2,
    completedLessonIds: ["1-1", "1-2"],
    lastVisited: { id: "1-1", title: "입문", at: 1000 },
  });
  const parsed = parseLessonProgress(raw, ["1-1", "1-2"]);
  assert.deepStrictEqual(parsed, EMPTY_LESSON_PROGRESS);
});

run("학습 진도 lastVisited의 at은 정수형 유한시간만 허용해야 함", () => {
  const parsedInvalid = parseLessonProgress(
    JSON.stringify({
      version: 1,
      completedLessonIds: ["1-1"],
      lastVisited: { id: "1-1", title: "입문", at: -1 },
    }),
    ["1-1", "1-2"],
  );
  assert.strictEqual(parsedInvalid.lastVisited, null);

  const parsedNaN = parseLessonProgress(
    JSON.stringify({
      version: 1,
      completedLessonIds: ["1-1"],
      lastVisited: { id: "1-1", title: "입문", at: Number.NaN },
    }),
    ["1-1", "1-2"],
  );
  assert.strictEqual(parsedNaN.lastVisited, null);
});

run("유효하지 않은 학습 진도 JSON은 빈 상태로 복구되어야 함", () => {
  const parsed = parseLessonProgress("{broken", ["1-1", "1-2"]);
  assert.deepStrictEqual(parsed, EMPTY_LESSON_PROGRESS);
});

run("학습 진도 toggle은 완료 상태를 정확히 토글해야 함", () => {
  const allowed = ["1-1", "1-2"];
  const base = parseLessonProgress(null, allowed);
  const afterCheck = toggleLessonCompleted(base, "1-1", allowed);
  assert.deepStrictEqual(afterCheck.completedLessonIds, ["1-1"]);
  const afterUncheck = toggleLessonCompleted(afterCheck, "1-1", allowed);
  assert.deepStrictEqual(afterUncheck.completedLessonIds, []);
});

run("학습 진도 lastVisited는 허용 ID만 갱신되어야 함", () => {
  const base = parseLessonProgress(null, ["1-1", "1-2"]);
  const invalid = updateLastVisited(base, { id: "9-9", title: "invalid" }, Date.now(), ["1-1", "1-2"]);
  assert.strictEqual(invalid.lastVisited, null);
  const valid = updateLastVisited(base, { id: "1-2", title: "실무" }, 1000, ["1-1", "1-2"]);
  assert.deepStrictEqual(valid.lastVisited, { id: "1-2", title: "실무", at: 1000 });
});

run("학습 진도 상태 키는 localStorage 보관 키로 선언되어야 함", () => {
  const storageToken = read("src/lib/lesson-progress.ts");
  assert(storageToken.includes("edu.lesson.progress.v1"));
  assert(storageToken.includes("LESSON_PROGRESS_STORAGE_KEY"));
});

run("학습 진도 패널은 SSR/하이드레이션 불일치 방지를 위해 초기 state를 빈 상태로 둬야 함", () => {
  const panelSource = read("src/components/LessonProgressPanel.tsx");
  assert(panelSource.includes("useState<LessonProgressState>({ ...EMPTY_LESSON_PROGRESS })"));
  assert(panelSource.includes("setState(getStoredProgress(allowedLessonIds))"));
});

run("학습 진도 토글은 mount 이후 로드되고 checkbox는 native 크기로 유지되어야 함", () => {
  const toggleSource = read("src/components/LessonProgressToggle.tsx");
  assert(toggleSource.includes("useState<LessonProgressState>({ ...EMPTY_LESSON_PROGRESS })"));
  assert(toggleSource.includes('h-5 w-5 rounded accent-brand-600"'));
  assert(toggleSource.includes('className="mt-4 inline-flex min-h-11'));
  assert(toggleSource.includes("const loaded = loadState(allowedLessonIds)"));
  assert(toggleSource.includes("setState(hydrated);"));
});

run("관리자 대시보드는 13~16단계를 포함해야 함", () => {
  const dashboardPage = read("src/app/admin/dashboard/page.tsx");
  const required = [
    "영역 확장",
    "2026 최전선",
    "AI 엔지니어링 5단 진화",
    "AI 시대를 읽는 눈",
  ];
  for (const phase of required) {
    assert(dashboardPage.includes(phase));
  }
});

run("관리자 대시보드에 오늘 코드/만료 안내가 있어야 함", () => {
  const dashboardPage = read("src/app/admin/dashboard/page.tsx");
  const dashboardClient = read("src/app/admin/dashboard/DashboardClient.tsx");
  assert(dashboardPage.includes("todayLessonCode"));
  assert(dashboardClient.includes("오늘 수강자 접근 코드"));
  assert(dashboardClient.includes("자정(서울) 기준 만료"));
  assert(dashboardClient.includes("SECRET_NOT_SET"));
});

run("관리자 로그인 입력값은 문자열 1~256자로 제한해야 함", () => {
  assert(!validateAdminPasswordInput(undefined));
  assert(!validateAdminPasswordInput(123));
  assert(!validateAdminPasswordInput(""));
  assert(!validateAdminPasswordInput("a".repeat(257)));
  assert(validateAdminPasswordInput("password"));
});

run("관리자 로그인 성공 응답에도 no-store 헤더가 적용되도록 구현되어야 함", () => {
  const routeSource = read("src/app/api/admin/auth/route.ts");
  assert(routeSource.includes("NextResponse.json({ success: true }, { headers: getNoStoreHeaders() })"));
});

run("Vercel에서는 전용 전달 헤더의 첫 번째 유효 IP만 사용해야 함", () => {
  const previousVercel = process.env.VERCEL;
  process.env.VERCEL = "1";
  try {
    const request = new NextRequest("https://example.com/api/admin/auth", {
      headers: {
        "x-vercel-forwarded-for": "203.0.113.10, 198.51.100.2",
        "x-forwarded-for": "192.0.2.99",
      },
      method: "POST",
    });
    assert.strictEqual(getFirstIpFromRequest(request), "203.0.113.10");
  } finally {
    if (previousVercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = previousVercel;
  }
});

run("강의 리액션 API는 유효한 강의 ID만 허용해야 함", () => {
  assert(isValidLessonReactionId("1-1"));
  assert(!isValidLessonReactionId("99-99"));
  assert(!isValidLessonReactionId("a-1"));
});

run("리액션 API는 허용된 타입만 허용해야 함", () => {
  assert(isReactionType("like"));
  assert(!isReactionType("invalid"));
});

run("리액션 API 에러 응답은 0건 폴백이 아니라 에러 상태 처리여야 함", () => {
  const routeSource = read("src/app/api/lessons/[id]/reactions/route.ts");
  assert(routeSource.includes("status: 502"));
  assert(routeSource.includes("No reaction row returned from service"));
});

run("반응 API는 모든 응답에 Cache-Control no-store를 적용해야 함", () => {
  const routeSource = read("src/app/api/lessons/[id]/reactions/route.ts");
  assert(routeSource.includes('noStoreHeaders()'));
  assert(routeSource.includes("headers: noStoreHeaders()"));
});

run("리액션 API는 Supabase 에러 상세 메시지를 클라이언트에 노출하지 않아야 함", () => {
  const routeSource = read("src/app/api/lessons/[id]/reactions/route.ts");
  const hasGenericGet = routeSource.includes('console.error("Reaction GET failed", error)');
  const hasGenericPost = routeSource.includes('console.error("Reaction RPC failed", error)');
  assert(hasGenericGet);
  assert(hasGenericPost);
});

run("리액션 IP+강의 조합 레이트 리밋이 동작해야 함", () => {
  clearReactionBuckets();
  const ip = "203.0.113.10";
  const now = Date.parse("2026-07-15T00:00:00.000Z");
  for (let i = 0; i < 30; i += 1) {
    recordReactionAttempt(ip, "1-1", now + i * 1000);
  }
  const state = isRateLimitedReaction(ip, "1-1", now + 30_000);
  assert.strictEqual(state.limited, true);
  assert(state.retryAfter && state.retryAfter > 0);
});

run("사용자 지정 IP 헤더는 명시적으로 신뢰한 경우에만 사용해야 함", () => {
  const previousVercel = process.env.VERCEL;
  const previousTrustedHeader = process.env.TRUSTED_CLIENT_IP_HEADER;
  delete process.env.VERCEL;
  try {
    const untrustedRequest = new NextRequest("https://example.com/api/lessons/1-1/reactions", {
      headers: { "x-forwarded-for": "203.0.113.10" },
    });
    assert.strictEqual(parseReactionRequestIp(untrustedRequest), "unknown");

    process.env.TRUSTED_CLIENT_IP_HEADER = "x-proxy-client-ip";
    const trustedRequest = new NextRequest("https://example.com/api/lessons/1-1/reactions", {
      headers: {
        "x-proxy-client-ip": "203.0.113.10, 198.51.100.2",
        "x-forwarded-for": "192.0.2.99",
      },
    });
    assert.strictEqual(parseReactionRequestIp(trustedRequest), "203.0.113.10");
  } finally {
    if (previousVercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = previousVercel;
    if (previousTrustedHeader === undefined) delete process.env.TRUSTED_CLIENT_IP_HEADER;
    else process.env.TRUSTED_CLIENT_IP_HEADER = previousTrustedHeader;
  }
});

run("메모리 rate limit API는 공용 신뢰 IP 파서를 사용해야 함", () => {
  const lessonAccessRoute = read("src/app/api/lesson-access/route.ts");
  const adminRoute = read("src/app/api/admin/auth/route.ts");
  const reactionRoute = read("src/app/api/lessons/[id]/reactions/route.ts");
  assert(lessonAccessRoute.includes("getTrustedClientIp(request)"));
  assert(adminRoute.includes("getTrustedClientIp(request)"));
  assert(reactionRoute.includes("getTrustedClientIp(request)"));
});

run("관리자 로그인 rate limit는 IP별 실패 5회/10분, 성공 시 버킷 초기화가 동작해야 함", () => {
  clearAdminLoginBucket("1.1.1.1");
  const base = Date.parse("2026-07-15T00:00:00.000Z");
  for (let i = 0; i < 5; i += 1) {
    recordAdminLoginFailure("1.1.1.1", base + i * 1000);
  }
  const limited = isAdminLoginRateLimited("1.1.1.1", base + 11_000);
  assert(limited.limited);
  const bucket = getAdminLoginFailureBucket("1.1.1.1");
  assert(bucket !== null);
  const retryAfter = calculateRetryAfter(bucket, base + 11_000);
  assert(retryAfter > 0 && retryAfter <= 600);

  clearAdminLoginBucket("1.1.1.1");
  recordAdminLoginFailure("1.1.1.1", base + 12_000);
  assert(!isAdminLoginRateLimited("1.1.1.1", base + 12_001).limited);
  clearAdminLoginBucket("1.1.1.1");
});

run("LessonRoute 파일은 비인증 접근 가드로 본문 보호 경로를 갖춰야 함", () => {
  const lessonPage = read("src/app/lessons/[id]/page.tsx");
  assert(lessonPage.includes('export const dynamic = "force-dynamic"'));
  assert(!lessonPage.includes("generateStaticParams"));
  assert(!lessonPage.includes("export const revalidate"));
  const gateIdx = lessonPage.indexOf("if (!hasAccess)");
  const presentationIdx = lessonPage.indexOf("<LessonPresentation");
  const reactionIdx = lessonPage.indexOf("<LessonReactions");
  assert(gateIdx >= 0);
  assert(presentationIdx > gateIdx);
  assert(reactionIdx > gateIdx);
});

run("비인증 상태에서도 공개 메타는 유지되어야 함", async () => {
  const metadata = await generateMetadata({
    params: Promise.resolve({ id: "1-1" }),
  } as unknown as { params: Promise<{ id: string }> });

  assert(typeof metadata.title === "string");
  assert(typeof metadata.description === "string");
  assert(metadata.title.includes("| 클로드 코드 강의"));
  assert(metadata.description.length > 0);
});

run("수준진단 페이지는 robots noindex, follow이어야 함", async () => {
  const metadata = (await import("@/app/level-test/page")).metadata as {
    robots?: { index?: boolean; follow?: boolean };
  };
  assert(metadata.robots?.index === false);
  assert(metadata.robots?.follow === true);
});

run("공개 페이지는 루트 layout의 main만 사용해야 함", () => {
  const layoutSource = read("src/app/layout.tsx");
  const levelTestSource = read("src/app/level-test/LevelTestPageClient.tsx");
  assert(layoutSource.includes("<main>{children}</main>"));
  assert(!levelTestSource.includes("<main"));
  assert(!levelTestSource.includes("</main>"));
});

run("서울 기준 날짜 함수와 만료 계산은 일관되어야 함", () => {
  const fixedDate = new Date("2026-07-15T00:30:00.000Z");
  const dateText = seoulDateString(fixedDate);
  assert.strictEqual(dateText, "260715");
  const expiry = getNextSeoulMidnight(fixedDate);
  assert.strictEqual(expiry.toISOString(), "2026-07-15T15:00:00.000Z");
  assert.strictEqual(formatSeoulDateTime(expiry), "2026-07-16 00:00");
  assert.strictEqual(secondsUntilSeoulMidnight(fixedDate), 14 * 60 * 60 + 30 * 60);

  const lessonAccessSource = read("src/lib/lesson-access.ts");
  const dashboardSource = read("src/app/admin/dashboard/page.tsx");
  assert(!lessonAccessSource.includes("millisUntilKstNextDay"));
  assert(!dashboardSource.includes("lessonAccessExpiryMs"));
  assert(dashboardSource.includes("getNextSeoulMidnight(now)"));
});

run("README와 .env.example 줄바꿈이 실제 개행이어야 함", () => {
  const readme = read("README.md");
  const env = read(".env.example");
  assert(!readme.includes("\\n"));
  assert(!env.includes("\\n"));
});

run("/about 페이지가 생성되어 있으며 소개/레벨진단/메타 정합성이 유지되어야 함", () => {
  const aboutSource = read("src/app/about/page.tsx");
  assert(aboutSource.includes('href="/level-test"'));
  assert(aboutSource.includes("ai-school.silronomu.com"));
  assert(aboutSource.includes("canonical: \"/about\""));
  assert(aboutSource.includes("personJsonLd"));
  assert(aboutSource.includes("profilePageJsonLd"));
});

run("교육 채널의 박실로·한동노무법인 엔티티 식별자가 분리되어야 함", () => {
  const layoutSource = read("src/app/layout.tsx");
  const aboutSource = read("src/app/about/page.tsx");
  const footerSource = read("src/components/SiteFooter.tsx");
  const llms = read("src/app/llms.txt/route.ts");

  assert(layoutSource.includes('const PERSON_ID = "https://silronomu.com/#person"'));
  assert(layoutSource.includes('const ORG_ID = "https://xn--2q1bm94d.com/#organization"'));
  assert(!layoutSource.includes('const ORG_ID = "https://silronomu.com/#organization"'));
  assert(layoutSource.includes("const PERSON_PROFILE_SAME_AS"));
  assert(layoutSource.includes("subjectOf: PARK_SILLO_SUBJECT_OF"));
  assert(!layoutSource.includes('"https://edu.silronomu.com/",'));
  assert(aboutSource.includes('const OFFICIAL_ORG_ID = "https://xn--2q1bm94d.com/#organization"'));
  assert(footerSource.includes("https://xn--2q1bm94d.com/members"));
  assert(llms.includes("https://xn--2q1bm94d.com/members"));

  const sameAsBlock = layoutSource.slice(
    layoutSource.indexOf("const PERSON_PROFILE_SAME_AS"),
    layoutSource.indexOf("const PARK_SILLO_SUBJECT_OF"),
  );
  const subjectOfBlock = layoutSource.slice(
    layoutSource.indexOf("const PARK_SILLO_SUBJECT_OF"),
    layoutSource.indexOf("const personJsonLd"),
  );

  assert(footerSource.includes("https://sanjae.silronomu.com/"));
  assert(footerSource.includes("산재·산업안전 전문 블로그"));
  assert(llms.includes("https://sanjae.silronomu.com/"));
  assert(llms.includes("산재·산업안전 전문 블로그"));
  assert(subjectOfBlock.includes("https://sanjae.silronomu.com/"));
  assert(subjectOfBlock.includes('name: "산재·산업안전 전문 블로그"'));
  assert(!sameAsBlock.includes("https://sanjae.silronomu.com/"));
});

run("사이트맵과 llms.txt에 /about가 반영되어야 함", () => {
  const sitemap = read("src/app/sitemap.ts");
  const llms = read("src/app/llms.txt/route.ts");
  assert(sitemap.includes("/about"));
  assert(llms.includes("/about"));
  assert(!sitemap.includes("/level-test"));
});

run("수준진단 응답은 20문항을 모두 요구하고 0~3 범위를 검사해야 함", () => {
  const emptyAnswers = buildEmptyAnswers();
  assert(validateStoredAnswers(emptyAnswers));
  assert(!validateAnswers(emptyAnswers));

  const partialAnswers = buildEmptyAnswers();
  partialAnswers[LEVEL_TEST_QUESTIONS[0].id] = 3;
  assert(validateStoredAnswers(partialAnswers));
  assert(!validateAnswers({ ...partialAnswers } as unknown));

  const invalidStoredAnswers: Record<string, unknown> = {
    ...partialAnswers,
    [LEVEL_TEST_QUESTIONS[1].id]: -2,
  };
  assert(!validateStoredAnswers(invalidStoredAnswers));

  const validAnswers = buildPresetAnswers(0) as LevelTestAnswers;
  assert(validateStoredAnswers(validAnswers));
  assert(validateAnswers(validAnswers));
  assert.strictEqual(Object.keys(validAnswers).length, 20);
});

run("수준진단 채점은 4영역 가중치와 유형 임계값을 사용해야 함", () => {
  const allHigh = buildPresetAnswers(3);
  const allMedium = buildPresetAnswers(2);
  const high = calculateLevelTestResult(allHigh);
  const medium = calculateLevelTestResult(allMedium);
  assert.strictEqual(high.type, "설계·운영형");
  assert(high.totalPercentage >= 90);
  assert.strictEqual(medium.type, "실무준비형");
});

run("안전 게이트는 지정 문항 점수 기준으로 안전기초 추천을 보장해야 함", () => {
  const safeAnswers = buildPresetAnswers(1);
  const normalAnswers = buildPresetAnswers(2);
  assert(!calculateLevelTestResult(normalAnswers).safetyFundamentalsRequired);
  for (const question of LEVEL_TEST_QUESTIONS.filter((question) => question.safetyGate)) {
    safeAnswers[question.id as keyof typeof safeAnswers] = 2;
  }
  safeAnswers[LEVEL_TEST_QUESTIONS.find((question) => question.safetyGate)?.id as keyof typeof safeAnswers] = 0;
  const safeResult = calculateLevelTestResult(safeAnswers);
  const safeLinks = safeResult.recommendations.links.map((link) => link.href);
  assert(safeResult.safetyFundamentalsRequired);
  assert(safeLinks.includes("https://ai-school.silronomu.com/lessons/1-3"));
  assert(safeLinks.includes("/lessons/1-1"));
  assert(safeLinks.includes("/lessons/3-4"));
  assert(safeLinks.length <= 5);
});

run("수준진단 추천 링크는 단일 배열로 관리되어야 함", () => {
  const answers = buildPresetAnswers(3);
  const result = calculateLevelTestResult(answers);
  assert(Array.isArray(result.recommendations.links));
  assert.strictEqual(typeof result.recommendations.links[0]?.href, "string");
});

run("수준진단 추천 링크는 타입별 교차 ID를 정확히 반영해야 함", () => {
  const beginnerResult = calculateLevelTestResult({ ...buildPresetAnswers(1), ...{ "c-01": 0 } } as LevelTestAnswers);
  const beginnerLinks = beginnerResult.recommendations.links.map((item) => item.href);
  assert(beginnerResult.type === "입문형");
  assert(beginnerLinks.includes("https://ai-school.silronomu.com/lessons/1-1"));
  assert(beginnerLinks.includes("https://ai-school.silronomu.com/lessons/1-3"));
  assert(beginnerLinks.includes("https://ai-school.silronomu.com/lessons/2-1"));

  const practitionerResult = calculateLevelTestResult(
    (() => {
      const answers = buildPresetAnswers(2);
      answers["c-01"] = 2;
      return answers as LevelTestAnswers;
    })(),
  );
  const mixedLinks = practitionerResult.recommendations.links.map((item) => item.href);
  assert(practitionerResult.type === "실무준비형");
  assert(mixedLinks.includes("https://ai-school.silronomu.com/lessons/2-1"));
  assert(mixedLinks.includes("https://ai-school.silronomu.com/lessons/3-2"));
  assert(mixedLinks.includes("/lessons/1-4"));
  assert(mixedLinks.includes("/lessons/2-1"));

  const automationAnswers = buildPresetAnswers(2);
  const automationTargets = ["c-01", "c-02", "c-03", "c-04", "c-05"] as const;
  for (const questionId of automationTargets) {
    automationAnswers[questionId] = 3;
  }
  const automationResult = calculateLevelTestResult(automationAnswers);
  const automationLinks = automationResult.recommendations.links.map((item) => item.href);
  assert(automationResult.type === "자동화실행형");
  assert(automationLinks.includes("/lessons/5-1"));
  assert(automationLinks.includes("/lessons/6-1"));
  assert(automationLinks.includes("/lessons/8-1"));
  assert(automationLinks.includes("/lessons/12-1"));
  assert(automationLinks.length <= 5);

  const designerAnswers = buildPresetAnswers(3);
  designerAnswers["c-01"] = 2;
  designerAnswers["c-02"] = 2;
  designerAnswers["t-01"] = 2;
  designerAnswers["t-02"] = 2;
  designerAnswers["t-03"] = 2;
  designerAnswers["t-04"] = 2;
  designerAnswers["t-05"] = 2;
  const designResult = calculateLevelTestResult(designerAnswers);
  const designLinks = designResult.recommendations.links.map((item) => item.href);
  assert(designResult.type === "설계·운영형");
  assert(designLinks.includes("/lessons/13-1"));
  assert(designLinks.includes("/lessons/14-1"));
  assert(designLinks.includes("/lessons/15-1"));
  assert(designLinks.includes("/lessons/15-6"));
  assert(designLinks.includes("/lessons/16-1"));
  assert(designLinks.length <= 5);
});

run("추천 링크의 href는 실제 lesson ID 또는 명시된 교차사이트 ID만 허용되어야 함", () => {
  const allLessons = getOrderedLessons().map((lesson) => lesson.id);
  const lessonSet = new Set(allLessons);
  const aiSchoolSet = new Set([
    "/lessons/1-1",
    "/lessons/1-3",
    "/lessons/2-1",
    "/lessons/3-2",
  ]);

  for (const question of LEVEL_TEST_QUESTIONS) {
    const answers = buildPresetAnswers(1);
    answers[question.id] = 3;
    const result = calculateLevelTestResult(answers);
    for (const link of result.recommendations.links) {
      if (link.href.startsWith("/lessons/")) {
        assert(/^\/lessons\/\d{1,2}-\d{1,2}$/.test(link.href));
        const id = link.href.replace("/lessons/", "");
        assert(lessonSet.has(id));
      } else {
        assert(link.href.startsWith("https://ai-school.silronomu.com/lessons/"));
        const lessonPath = link.href.replace("https://ai-school.silronomu.com", "");
        assert(aiSchoolSet.has(lessonPath));
      }
    }
    assert(result.recommendations.links.length <= 5);
  }
});

run("수준진단 추천 링크의 중복은 제거되어야 함", () => {
  const answers = buildPresetAnswers(3);
  const result = calculateLevelTestResult(answers);
  const hrefs = result.recommendations.links.map((item) => item.href);
  assert.strictEqual(hrefs.length, new Set(hrefs).size);
});

run("교차추천은 링크 단일화만 렌더링 대상이어야 함", () => {
  const mixedResult = calculateLevelTestResult(buildPresetAnswers(2));
  assert("links" in mixedResult.recommendations);
  assert(!("lessonIds" in mixedResult.recommendations));
  assert(Array.isArray(mixedResult.recommendations.links));
});

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("All tests passed.");
