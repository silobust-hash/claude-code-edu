import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "클로드 코드 강의 | 19년차 노무사 박실로";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
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
            fontSize: 30,
            fontWeight: 600,
            opacity: 0.85,
            marginBottom: 24,
          }}
        >
          1M 컨텍스트 시대의 AI 활용
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.1 }}>
          클로드 코드 강의
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            opacity: 0.92,
            marginTop: 28,
          }}
        >
          19년차 노무사 박실로 · 한동노무법인
        </div>
      </div>
    ),
    { ...size }
  );
}
