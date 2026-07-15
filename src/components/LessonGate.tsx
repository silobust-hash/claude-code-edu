"use client";

import Link from "next/link";
import { useRef, useState } from "react";

interface LessonGateProps {
  children?: React.ReactNode;
  accent?: string;
}

export default function LessonGate({ children, accent = "#6366f1" }: LessonGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    setSubmitting(true);

    try {
      const res = await fetch("/api/lesson-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: value.trim() }),
      });

      if (!res.ok) {
        await res.json().catch(() => ({}));
        setError(true);
        setSubmitting(false);
        errorRef.current?.focus();
        return;
      }

      window.location.reload();
    } catch {
      setError(true);
      setSubmitting(false);
      errorRef.current?.focus();
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px 0 8px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 18,
          boxShadow: "0 10px 40px rgba(15,23,42,0.08)",
          padding: "36px 28px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 10 }} aria-hidden>
          🔒
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
          수강생 전용 강의안
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "#64748b", margin: "0 0 22px" }}>
          이 강의안은 오늘의 접근 코드가 있어야 볼 수 있습니다.
          <br />
          강사가 안내한 6자리 코드를 입력하세요.
        </p>

        {children}

        <form onSubmit={onSubmit}>
          <label htmlFor="lesson-access-code" className="sr-only">
            접근 코드
          </label>
          <input
            id="lesson-access-code"
            value={value}
            onChange={(event) => {
              setError(false);
              setValue(event.target.value);
            }}
            inputMode="numeric"
            autoFocus
            maxLength={6}
            aria-label="접근 코드"
            style={{
              width: "100%",
              boxSizing: "border-box",
              fontSize: 22,
              letterSpacing: 6,
              textAlign: "center",
              padding: "12px 14px",
              border: `2px solid ${error ? "#ef4444" : "#cbd5e1"}`,
              borderRadius: 12,
              outline: "none",
              marginBottom: 12,
            }}
          />
          {error && (
            <p
              ref={errorRef}
              role="alert"
              tabIndex={-1}
              className="text-sm text-red-600"
              style={{ fontSize: 13, margin: "0 0 12px" }}
            >
              접근 코드가 올바르지 않습니다.
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            style={{
              background: accent,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px 0",
              fontSize: 15,
              fontWeight: 700,
              cursor: submitting ? "not-allowed" : "pointer",
              minHeight: 44,
              width: "100%",
            }}
          >
            {submitting ? "확인 중..." : "강의안 열기"}
          </button>
        </form>

        <p style={{ fontSize: 12, color: "#94a3b8", margin: "18px 0 0" }}>
          커리큘럼은 코드 없이 볼 수 있습니다.{" "}
          <Link href="/curriculum" style={{ color: accent, fontWeight: 600 }}>
            커리큘럼 보기 →
          </Link>
        </p>
      </div>
    </div>
  );
}
