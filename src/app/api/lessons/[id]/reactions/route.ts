import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { isValidLessonId } from "@/lib/lesson-catalog";
import { lessons } from "@/data/lessons";
import { getTrustedClientIp } from "@/lib/client-ip";

// 강의 평가(좋아요·도움됐어요·어려워요) 카운트를 Supabase에 저장한다.
// publishable(공개) 키로 접근하되, 쓰기는 increment_lesson_reaction RPC(security definer)로만 가능 —
// RLS가 직접 쓰기를 막으므로 키가 코드에 있어도 안전하다. (테이블/함수는 edu-lesson-reactions-setup.sql 참고)

export const dynamic = "force-dynamic";

const SUPABASE_URL = "https://ewxprzxlleyzxdemmkmb.supabase.co";
const SUPABASE_KEY = "sb_publishable_jvHA1YI-cEDwnBR79qmM0w_HRwfE6Vv";
const SITE = "edu";
const REACTION_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const REACTION_RATE_LIMIT_MAX = 30;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const EMPTY = { like: 0, helpful: 0, difficult: 0 };
const reactionBuckets = new Map<string, { firstAttemptAt: number; count: number }>();

export function parseReactionRequestIp(request: Request): string {
  return getTrustedClientIp(request);
}

export function isValidLessonReactionId(id: string): boolean {
  return isValidLessonId(id) && Object.prototype.hasOwnProperty.call(lessons, id);
}

export function isReactionType(type: string): type is "like" | "helpful" | "difficult" {
  return type === "like" || type === "helpful" || type === "difficult";
}

function getBucketKey(ip: string, lessonId: string) {
  return `${ip}::${lessonId}`;
}

export function isRateLimitedReaction(
  ip: string,
  lessonId: string,
  now = Date.now()
) {
  const key = getBucketKey(ip, lessonId);
  const bucket = reactionBuckets.get(key);
  if (!bucket) return { limited: false };

  if (now - bucket.firstAttemptAt >= REACTION_RATE_LIMIT_WINDOW_MS) {
    reactionBuckets.delete(key);
    return { limited: false };
  }

  if (bucket.count < REACTION_RATE_LIMIT_MAX) return { limited: false };
  const remainingMs = Math.max(0, bucket.firstAttemptAt + REACTION_RATE_LIMIT_WINDOW_MS - now);
  return {
    limited: true,
    retryAfter: Math.max(1, Math.ceil(remainingMs / 1000)),
  };
}

export function clearReactionBuckets() {
  reactionBuckets.clear();
}

export function recordReactionAttempt(ip: string, lessonId: string, now = Date.now()) {
  const key = getBucketKey(ip, lessonId);
  const bucket = reactionBuckets.get(key);
  if (!bucket || now - bucket.firstAttemptAt >= REACTION_RATE_LIMIT_WINDOW_MS) {
    reactionBuckets.set(key, { firstAttemptAt: now, count: 1 });
    return;
  }
  reactionBuckets.set(key, { ...bucket, count: bucket.count + 1 });
}

function noStoreHeaders() {
  return { "Cache-Control": "no-store" };
}

function shape(
  row: { like_count: number; helpful_count: number; difficult_count: number } | null
) {
  if (!row) return EMPTY;
  return { like: row.like_count, helpful: row.helpful_count, difficult: row.difficult_count };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!isValidLessonReactionId(id)) {
    return NextResponse.json(
      { error: "유효하지 않은 강의입니다." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const { data, error } = await supabase
    .from("lesson_reactions")
    .select("like_count, helpful_count, difficult_count")
    .eq("site", SITE)
    .eq("lesson_id", id)
    .maybeSingle();

  if (error) {
    console.error("Reaction GET failed", error);
    return NextResponse.json(
      { error: "리액션 조회 중 오류가 발생했습니다." },
      { status: 502, headers: noStoreHeaders() },
    );
  }

  return NextResponse.json(shape(data), { headers: noStoreHeaders() });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!isValidLessonReactionId(id)) {
    return NextResponse.json(
      { error: "유효하지 않은 강의입니다." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const ip = parseReactionRequestIp(request);
  const rateState = isRateLimitedReaction(ip, id);
  if (rateState.limited) {
    return NextResponse.json(
      { error: "요청이 과도합니다. 잠시 후 다시 시도해 주세요." },
      {
        status: 429,
        headers: {
          ...noStoreHeaders(),
          "Retry-After": String(rateState.retryAfter),
        },
      },
    );
  }

  let body: Record<string, unknown> | null = null;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    recordReactionAttempt(ip, id);
    return NextResponse.json(
      { error: "요청 형식이 올바르지 않습니다." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const type = body?.type;
  if (typeof type !== "string" || !isReactionType(type)) {
    recordReactionAttempt(ip, id);
    return NextResponse.json(
      { error: "유효하지 않은 반응 타입입니다." },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  recordReactionAttempt(ip, id);

  const { data, error } = await supabase.rpc("increment_lesson_reaction", {
    p_site: SITE,
    p_lesson: id,
    p_type: type,
  });

  if (error) {
    console.error("Reaction RPC failed", error);
    return NextResponse.json(
      { error: "리액션 처리 중 오류가 발생했습니다." },
      { status: 502, headers: noStoreHeaders() },
    );
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) {
    return NextResponse.json(
      { error: "No reaction row returned from service" },
      { status: 502, headers: noStoreHeaders() },
    );
  }

  return NextResponse.json(shape(row), { headers: noStoreHeaders() });
}
