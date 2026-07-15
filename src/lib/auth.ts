import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "admin-session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours
const SESSION_VERSION = "v2";
const LEGACY_COOKIES = ["admin-session-v1", "admin-session-hash"];

function getAdminSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null;
}

export function buildSignedSession(rawToken: string, secret: string): string {
  const sig = createHmac("sha256", secret).update(rawToken).digest("base64url");
  return `${rawToken}.${sig}`;
}

export function verifySignedSession(raw: string, secret: string): boolean {
  const parts = raw.split(".");
  if (parts.length !== 2) return false;

  const [token, signature] = parts;
  const expected = createHmac("sha256", secret).update(token).digest("base64url");

  if (signature.length !== expected.length) return false;

  const expectedBuf = Buffer.from(expected);
  const sigBuf = Buffer.from(signature);
  if (!timingSafeEqual(expectedBuf, sigBuf)) return false;

  const [version, issuedAtStr, nonce] = token.split("|");
  if (version !== SESSION_VERSION) return false;
  if (!issuedAtStr || !nonce) return false;

  const issuedAt = Number(issuedAtStr);
  if (!Number.isFinite(issuedAt) || issuedAt <= 0) return false;
  if (Date.now() > issuedAt + SESSION_MAX_AGE * 1000) return false;

  return true;
}

export async function invalidateAdminSessionCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  for (const cookieName of LEGACY_COOKIES) {
    cookieStore.delete(cookieName);
  }
}

export async function login(password: string): Promise<boolean> {
  const cookieStore = await cookies();
  const secret = getAdminSessionSecret();

  // Safe failure if secret is missing
  if (!secret) {
    return false;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || adminPassword.length === 0) {
    return false;
  }

  const normalizedPassword = password.trim();
  const provided = Buffer.from(normalizedPassword);
  const expected = Buffer.from(adminPassword);

  if (provided.length !== expected.length) {
    return false;
  }
  if (!timingSafeEqual(provided, expected)) {
    return false;
  }

  const issuedAt = Date.now();
  const nonce = randomBytes(18).toString("base64url");
  const rawToken = `${SESSION_VERSION}|${issuedAt}|${nonce}`;
  const signedToken = buildSignedSession(rawToken, secret);

  cookieStore.set(ADMIN_SESSION_COOKIE, signedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return true;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  for (const cookieName of LEGACY_COOKIES) {
    cookieStore.delete(cookieName);
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const secret = getAdminSessionSecret();
  if (!secret) {
    return false;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  if (!session?.value) {
    return false;
  }

  const isValid = verifySignedSession(session.value, secret);
  if (!isValid) {
    return false;
  }

  return true;
}

export async function isAuthenticatedStrict(): Promise<boolean> {
  const authed = await isAuthenticated();
  if (!authed) {
    await invalidateAdminSessionCookies();
  }
  return authed;
}
