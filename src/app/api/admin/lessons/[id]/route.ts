import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedStrict } from "@/lib/auth";
import { lessons } from "@/data/lessons";
import {
  getLessonFromBlob,
  saveLessonToBlob,
  deleteLessonFromBlob,
} from "@/lib/storage";
import { isLessonPayload } from "@/lib/lesson-schema";
import { isValidLessonId } from "@/lib/lesson-catalog";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isValid = await isAuthenticatedStrict();
  if (!isValid) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  if (!isValidLessonId(id)) {
    return NextResponse.json(
      { error: "유효하지 않은 강의 ID 형식입니다." },
      { status: 400 }
    );
  }

  try {
    // Try blob first
    const blobData = await getLessonFromBlob(id);
    if (blobData) {
      return NextResponse.json({
        lesson: blobData,
        source: "blob",
      });
    }

    // Fall back to static
    const staticData = lessons[id];
    if (!staticData) {
      return NextResponse.json(
        { error: "강의를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      lesson: staticData,
      source: "static",
    });
  } catch (error) {
    console.error("강의 조회 오류:", error);
    return NextResponse.json(
      { error: "강의를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isValid = await isAuthenticatedStrict();
  if (!isValid) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  if (!isValidLessonId(id)) {
    return NextResponse.json(
      { error: "유효하지 않은 강의 ID 형식입니다." },
      { status: 400 }
    );
  }

  try {
    const data = await request.json();

    if (!isLessonPayload(data)) {
      return NextResponse.json(
        { error: "유효하지 않은 강의 데이터 형식입니다." },
        { status: 400 }
      );
    }

    if (data.id !== id) {
      return NextResponse.json(
        { error: "요청 경로와 데이터 ID가 일치하지 않습니다." },
        { status: 400 }
      );
    }

    if (!isValidLessonId(data.id)) {
      return NextResponse.json(
        { error: "유효하지 않은 강의 ID입니다." },
        { status: 400 }
      );
    }

    const staticData = lessons[id];
    if (!staticData) {
      return NextResponse.json(
        { error: "강의 ID가 존재하지 않습니다." },
        { status: 404 }
      );
    }

    const url = await saveLessonToBlob(id, data as unknown as Record<string, unknown>);

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("강의 저장 오류:", error);
    return NextResponse.json(
      { error: "강의를 저장하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isValid = await isAuthenticatedStrict();
  if (!isValid) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  if (!isValidLessonId(id)) {
    return NextResponse.json(
      { error: "유효하지 않은 강의 ID 형식입니다." },
      { status: 400 }
    );
  }

  try {
    await deleteLessonFromBlob(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("강의 초기화 오류:", error);
    return NextResponse.json(
      { error: "강의를 초기화하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
