import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "비개발자를 위한 클로드 코드 실무 교육";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          장문 컨텍스트를 제대로 쓰는 법
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
          현업에서 직접 써보고 다듬은 실무 과정
        </div>
      </div>
    ),
    { ...size }
  );
}
