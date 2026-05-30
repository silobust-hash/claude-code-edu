import Link from "next/link";

/**
 * Dark-ink footer. Preserves all cross-site links (홈·AI업무학교·Threads)
 * and adds internal navigation. Pure presentational — no SEO logic here.
 */
export default function SiteFooter() {
  return (
    <footer className="relative mt-28 overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0 bg-grid-dark opacity-40 mask-fade-b" aria-hidden="true" />
      <div className="absolute -top-24 left-1/2 h-48 w-[42rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[110px]" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-white text-base font-extrabold shadow-glow">
                CC
              </span>
              <span className="text-[15px] font-bold tracking-tight">
                노무사 <span className="text-brand-300">×</span> Claude Code
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55 balance">
              1M 컨텍스트 시대, 노무사의 새로운 무기. 19년차 공인노무사 박실로가
              비개발자를 위해 만든 Claude Code 실무 교육.
            </p>
          </div>

          {/* 학습 */}
          <div>
            <p className="eyebrow text-brand-300/80">학습</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>
                <Link href="/curriculum" className="hover:text-white transition-colors">
                  전체 커리큘럼
                </Link>
              </li>
              <li>
                <Link href="/lessons" className="hover:text-white transition-colors">
                  강의 목록
                </Link>
              </li>
              <li>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Claude AI
                </a>
              </li>
            </ul>
          </div>

          {/* 네트워크 */}
          <div>
            <p className="eyebrow text-brand-300/80">네트워크</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>
                <a
                  href="https://silronomu.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  홈페이지
                </a>
              </li>
              <li>
                <a
                  href="https://ai-school.silronomu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  AI업무학교
                </a>
              </li>
              <li>
                <a
                  href="https://www.threads.com/@silrobag?hl=ko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Threads
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-white/70">
            한동노무법인 · 대표 공인노무사 박실로
          </p>
          <p>© {new Date().getFullYear()} 노무사 × Claude Code</p>
        </div>
      </div>
    </footer>
  );
}
