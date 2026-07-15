import { NextRequest, NextResponse } from "next/server";
import { login, logout } from "@/lib/auth";
import { getTrustedClientIp } from "@/lib/client-ip";

const ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const ADMIN_LOGIN_RATE_LIMIT_MAX = 5;

interface AdminLoginRateBucket {
  firstAttemptAt: number;
  failCount: number;
}

const adminLoginFailureBuckets = new Map<string, AdminLoginRateBucket>();

export function getFirstIpFromRequest(request: NextRequest): string {
  return getTrustedClientIp(request);
}

export function validateAdminPasswordInput(password: unknown): password is string {
  return typeof password === "string" && password.length >= 1 && password.length <= 256;
}

function getNoStoreHeaders() {
  return { "Cache-Control": "no-store" };
}

export function calculateRetryAfter(bucket: AdminLoginRateBucket, now: number) {
  const windowExpiredAt = bucket.firstAttemptAt + ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS;
  const remainingMs = Math.max(0, windowExpiredAt - now);
  return Math.ceil(remainingMs / 1000);
}

export function isAdminLoginRateLimited(ip: string, now = Date.now()) {
  const bucket = adminLoginFailureBuckets.get(ip);
  if (!bucket) return { limited: false, bucket: null };

  const remainingWindow = now - bucket.firstAttemptAt;
  if (remainingWindow >= ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS) {
    adminLoginFailureBuckets.delete(ip);
    return { limited: false, bucket: null };
  }

  if (bucket.failCount < ADMIN_LOGIN_RATE_LIMIT_MAX) {
    return { limited: false, bucket };
  }

  return { limited: true, bucket };
}

export function clearAdminLoginBucket(ip: string) {
  adminLoginFailureBuckets.delete(ip);
}

export function recordAdminLoginFailure(ip: string, now = Date.now()) {
  const bucket = adminLoginFailureBuckets.get(ip);
  if (!bucket || now - bucket.firstAttemptAt >= ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS) {
    adminLoginFailureBuckets.set(ip, { firstAttemptAt: now, failCount: 1 });
    return;
  }
  adminLoginFailureBuckets.set(ip, { ...bucket, failCount: bucket.failCount + 1 });
}

export function getAdminLoginFailureBucket(ip: string): AdminLoginRateBucket | null {
  return adminLoginFailureBuckets.get(ip) ?? null;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getFirstIpFromRequest(request);
    const rateState = isAdminLoginRateLimited(ip);
    if (rateState.limited) {
      const retryAfter = calculateRetryAfter(
        rateState.bucket as AdminLoginRateBucket,
        Date.now(),
      );
      return NextResponse.json(
        { error: "로그인 시도 횟수가 초과되었습니다. 잠시 후 다시 시도해주세요." },
        {
          status: 429,
          headers: {
            ...getNoStoreHeaders(),
            "Retry-After": String(retryAfter),
          },
        },
      );
    }

    const body = await request.json();
    const { password } = body ?? {};
    if (!validateAdminPasswordInput(password)) {
      recordAdminLoginFailure(ip);
      return NextResponse.json(
        { error: "비밀번호는 1~256자 문자열이어야 합니다." },
        {
          status: 400,
          headers: getNoStoreHeaders(),
        },
      );
    }

    const hasAdminSecret = !!process.env.ADMIN_SESSION_SECRET;
    if (!hasAdminSecret) {
      return NextResponse.json(
        { error: "관리자 로그인 설정이 미완료되었습니다. 운영자에게 문의하세요." },
        {
          status: 500,
          headers: getNoStoreHeaders(),
        },
      );
    }

    const success = await login(password);
    if (!success) {
      recordAdminLoginFailure(ip);
      return NextResponse.json(
        { error: "비밀번호가 올바르지 않거나 인증 설정이 올바르지 않습니다." },
        {
          status: 401,
          headers: getNoStoreHeaders(),
        },
      );
    }

    clearAdminLoginBucket(ip);
    return NextResponse.json({ success: true }, { headers: getNoStoreHeaders() });
  } catch {
    return NextResponse.json(
      { error: "로그인 처리 중 오류가 발생했습니다." },
      {
        status: 500,
        headers: getNoStoreHeaders(),
      },
    );
  }
}

export async function DELETE() {
  try {
    await logout();
    return NextResponse.json({ success: true }, { headers: getNoStoreHeaders() });
  } catch {
    return NextResponse.json(
      { error: "로그아웃 처리 중 오류가 발생했습니다." },
      {
        status: 500,
        headers: getNoStoreHeaders(),
      },
    );
  }
}
