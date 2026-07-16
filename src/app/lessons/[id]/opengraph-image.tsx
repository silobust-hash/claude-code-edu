import { ImageResponse } from "next/og";
import { lessons } from "@/data/lessons";

export const alt = "클로드 코드 실무 교육";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return Object.keys(lessons).map((id) => ({ id }));
}

export default async function LessonOpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = lessons[id];
  const title = lesson?.title || "클로드 코드 강의";
  const phase = lesson?.phase || "노무사 x Claude Code";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            opacity: 0.85,
            marginBottom: 24,
            display: "flex",
          }}
        >
          {phase} · 클로드 코드 강의
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.15,
            display: "flex",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            opacity: 0.92,
            marginTop: 32,
          }}
        >
          박실로 공인노무사 · 현업 적용 중심
        </div>
      </div>
    ),
    { ...size }
  );
}
