import { randomBytes, createHmac, timingSafeEqual, createHash } from "node:crypto";
import { cookies } from "next/headers";

const LESSON_ACCESS_COOKIE = "lesson-access-session";
const ACCESS_PREFIX = "cxa";

interface AccessPayload {
  date: string;
  session: string;
}

interface SeoulDateParts {
  year: number;
  month: number;
  day: number;
}

function getLessonAccessSecret(): string | null {
  return process.env.LESSON_ACCESS_SECRET || null;
}

function getSeoulDateParts(date: Date): SeoulDateParts {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = fmt.formatToParts(date);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  if (!year || !month || !day) throw new Error("서울 시간 계산 실패");
  return { year, month, day };
}

export function seoulDateString(date: Date = new Date()): string {
  const { year, month, day } = getSeoulDateParts(date);
  return `${String(year).slice(2)}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
}

export function getNextSeoulMidnight(date: Date = new Date()): Date {
  const { year, month, day } = getSeoulDateParts(date);
  return new Date(Date.UTC(year, month - 1, day + 1, -9, 0, 0));
}

export function secondsUntilSeoulMidnight(date: Date = new Date()): number {
  const remainingMilliseconds = getNextSeoulMidnight(date).getTime() - date.getTime();
  return Math.max(0, Math.ceil(remainingMilliseconds / 1000));
}

export function formatSeoulDateTime(date: Date): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = fmt.formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value;
  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  const hour = getPart("hour");
  const minute = getPart("minute");

  if (!year || !month || !day || !hour || !minute) {
    throw new Error("서울 시간 표시 실패");
  }
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export function createLessonAccessCode(secret: string, date: string): string {
  const raw = `${secret}:${date}`;
  const digest = createHash("sha256").update(raw).digest("hex");
  const slice = digest.slice(0, 8);
  const code = Number.parseInt(slice, 16) % 1_000_000;
  return code.toString().padStart(6, "0");
}

export function compareLessonAccessCode(
  expected: string,
  input: string
): boolean {
  const expectedBuf = Buffer.from(expected);
  const inputBuf = Buffer.from(input);
  if (expectedBuf.length !== inputBuf.length) return false;
  return timingSafeEqual(expectedBuf, inputBuf);
}

export function getTodayLessonCode(): string {
  const secret = getLessonAccessSecret();
  if (!secret) return "";
  return createLessonAccessCode(secret, seoulDateString());
}

function createSignedAccessToken(secret: string, date: string, nonce: string): string {
  const payload: AccessPayload = { date, session: nonce };
  const payloadJson = JSON.stringify(payload);
  const sig = createHmac("sha256", secret).update(payloadJson).digest("base64url");
  const payloadBase64 = Buffer.from(payloadJson).toString("base64url");
  return `${payloadBase64}.${sig}`;
}

function parseSignedAccessToken(secret: string, token: string): AccessPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  let payloadJson: string;
  try {
    payloadJson = Buffer.from(payloadB64, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expectedSig = createHmac("sha256", secret).update(payloadJson).digest("base64url");
  if (expectedSig.length !== signature.length) return null;

  const a = Buffer.from(expectedSig);
  const b = Buffer.from(signature);
  if (!timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(payloadJson) as AccessPayload;
    if (typeof payload.date !== "string" || typeof payload.session !== "string") {
      return null;
    }
    if (!/^\d{6}$/.test(payload.date)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function createLessonAccessCookie(): {
  cookieName: string;
  value: string;
  maxAgeSeconds: number;
} | null {
  const secret = getLessonAccessSecret();
  if (!secret) return null;

  const session = randomBytes(16).toString("base64url");
  const date = seoulDateString();
  const value = `${ACCESS_PREFIX}.${createSignedAccessToken(secret, date, session)}`;
  const maxAgeSeconds = secondsUntilSeoulMidnight();

  return {
    cookieName: LESSON_ACCESS_COOKIE,
    value,
    maxAgeSeconds,
  };
}

export async function setLessonAccessCookie(): Promise<void> {
  const token = createLessonAccessCookie();
  if (!token) return;

  const cookieStore = await cookies();
  cookieStore.set(LESSON_ACCESS_COOKIE, token.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: token.maxAgeSeconds,
    path: "/",
  });
}

export async function getLessonAccessStatus(): Promise<boolean> {
  const secret = getLessonAccessSecret();
  if (!secret) return false;

  const cookieStore = await cookies();
  const cookie = cookieStore.get(LESSON_ACCESS_COOKIE);
  if (!cookie?.value || !cookie.value.startsWith(`${ACCESS_PREFIX}.`)) return false;

  const token = cookie.value.replace(`${ACCESS_PREFIX}.`, "");
  const payload = parseSignedAccessToken(secret, token);
  if (!payload) return false;
  if (payload.date !== seoulDateString()) return false;

  return true;
}
