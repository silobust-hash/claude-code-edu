import { NextRequest, NextResponse } from "next/server";
import {
  compareLessonAccessCode,
  createLessonAccessCookie,
  getTodayLessonCode,
} from "@/lib/lesson-access";
import { getTrustedClientIp } from "@/lib/client-ip";

const WINDOW_MS = 60_000;
const MAX_TRIES = 12;
const triesByIp = new Map<string, number[]>();
const NO_STORE_HEADERS = { "Cache-Control": "no-store" } as const;

function jsonNoStore(body: Record<string, string | boolean>, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE_HEADERS });
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const raw = triesByIp.get(ip) || [];
  const filtered = raw.filter((ts) => now - ts < WINDOW_MS);

  if (filtered.length >= MAX_TRIES) {
    triesByIp.set(ip, [...filtered]);
    return true;
  }

  filtered.push(now);
  triesByIp.set(ip, filtered);
  return false;
}

export async function POST(request: NextRequest) {
  const secretExists = Boolean(process.env.LESSON_ACCESS_SECRET);
  if (!secretExists) {
    return jsonNoStore({ error: "일일 코드 발급 설정이 없습니다." }, 500);
  }

  const ip = getTrustedClientIp(request);
  if (isRateLimited(ip)) {
    return jsonNoStore({ error: "요청이 과도합니다. 잠시 뒤 다시 시도하세요." }, 429);
  }

  try {
    const { code } = await request.json();
    if (typeof code !== "string") {
      return jsonNoStore({ error: "코드 형식이 잘못되었습니다." }, 400);
    }

    const normalizedCode = code.trim();
    const todayCode = getTodayLessonCode();
    if (!todayCode) {
      return jsonNoStore({ error: "일일 코드 발급 설정이 없습니다." }, 500);
    }

    if (normalizedCode.length !== 6 || !compareLessonAccessCode(todayCode, normalizedCode)) {
      return jsonNoStore({ error: "코드가 일치하지 않습니다." }, 401);
    }

    const token = createLessonAccessCookie();
    if (!token) {
      return jsonNoStore({ error: "세션 생성에 실패했습니다." }, 500);
    }

    const response = jsonNoStore({ success: true });
    response.cookies.set(token.cookieName, token.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: token.maxAgeSeconds,
      path: "/",
    });

    return response;
  } catch {
    return jsonNoStore({ error: "코드 검증 실패" }, 500);
  }
}
