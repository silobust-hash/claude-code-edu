import { isIP } from "node:net";

const VERCEL_CLIENT_IP_HEADER = "x-vercel-forwarded-for";
const TRUSTED_HEADER_NAME_PATTERN = /^[a-z0-9-]{1,64}$/;

function firstValidIp(headerValue: string | null): string | null {
  const candidate = headerValue?.split(",", 1)[0]?.trim();
  if (!candidate || candidate.length > 64 || isIP(candidate) === 0) {
    return null;
  }
  return candidate;
}

function getTrustedHeaderName(): string | null {
  if (process.env.VERCEL === "1") {
    return VERCEL_CLIENT_IP_HEADER;
  }

  const configured = process.env.TRUSTED_CLIENT_IP_HEADER?.trim().toLowerCase();
  if (!configured || !TRUSTED_HEADER_NAME_PATTERN.test(configured)) {
    return null;
  }
  return configured;
}

export function getTrustedClientIp(request: Pick<Request, "headers">): string {
  const headerName = getTrustedHeaderName();
  if (!headerName) return "unknown";
  return firstValidIp(request.headers.get(headerName)) ?? "unknown";
}
