const AI_SCHOOL_URL = "https://ai-school.silronomu.com";

export default function EducationChannelBar() {
  return (
    <nav
      aria-label="교육 채널 전환"
      className="relative z-[60] border-b border-white/15 bg-ink-950 text-white"
    >
      <a
        href="https://silronomu.com/hub/ai-nomusa.html"
        aria-label="AI노무사 박실로 문서검증 기준 보기"
        className="flex min-h-11 items-center justify-center gap-2 border-b border-white/15 bg-ink-900 px-4 py-2 text-center text-xs font-bold text-white outline-none transition-colors hover:bg-ink-800 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:text-sm"
      >
        <span>AI노무사 박실로 · AI 노동문서 검증과 노무실무 자동화 기준</span>
        <span aria-hidden="true" className="shrink-0">→</span>
      </a>
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-[12rem_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="hidden min-h-[60px] items-center border-r border-white/15 px-6 md:flex">
          <p className="text-xs font-semibold text-white/70">두 채널 학습 경로</p>
        </div>

        <a
          href={AI_SCHOOL_URL}
          className="group flex min-h-[60px] min-w-0 items-center justify-between gap-2 bg-brand-700 px-4 py-2.5 text-white outline-none transition-colors hover:bg-brand-600 focus-visible:bg-brand-600 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:px-5"
          aria-label="AI업무학교 콘텐츠 설계 채널로 이동"
        >
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold leading-4 text-brand-100">
              이동 · 콘텐츠 설계
            </span>
            <strong className="block whitespace-nowrap text-[13px] leading-5 sm:text-sm">
              AI업무학교
            </strong>
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 text-base font-bold text-brand-100 transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>

        <div
          aria-current="page"
          className="flex min-h-[60px] min-w-0 items-center border-b-[3px] border-b-accent bg-ink-900 px-4 py-2.5 sm:px-5"
        >
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold leading-4 text-accent-soft">
              현재 채널 · 기술 구현·측정
            </span>
            <strong className="block whitespace-nowrap text-[13px] leading-5 text-white sm:text-sm">
              Claude Code 실무 과정
            </strong>
          </span>
        </div>
      </div>
    </nav>
  );
}
