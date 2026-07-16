"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Scroll-aware sticky nav.
 * - Transparent over the dark hero, then condenses to a glass bar on scroll.
 * - Mobile menu toggle for the link cluster.
 * The JSON-LD / SEO concerns live in layout.tsx; this is purely chrome.
 */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = (
    <>
      <Link
        href="/curriculum"
        onClick={() => setOpen(false)}
        className="hover:text-white transition-colors px-2 py-2 min-h-[44px] flex items-center rounded-md"
        aria-label="커리큘럼 페이지로 이동"
      >
        커리큘럼
      </Link>
      <Link
        href="/about"
        onClick={() => setOpen(false)}
        className="hover:text-white transition-colors px-2 py-2 min-h-[44px] flex items-center rounded-md"
        aria-label="소개 페이지로 이동"
      >
        소개
      </Link>
      <Link
        href="/lessons"
        onClick={() => setOpen(false)}
        className="hover:text-white transition-colors px-2 py-2 min-h-[44px] flex items-center rounded-md"
        aria-label="강의 목록 페이지로 이동"
      >
        강의 목록
      </Link>
      <Link
        href="/level-test"
        onClick={() => setOpen(false)}
        className="hover:text-white transition-colors px-2 py-2 min-h-[44px] flex items-center rounded-md"
        aria-label="수준진단 페이지로 이동"
      >
        수준진단
      </Link>
      <a
        href="https://ai-school.silronomu.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors px-2 py-2 min-h-[44px] flex items-center rounded-md"
        aria-label="AI업무학교 새 창 열기"
      >
        AI업무학교
      </a>
    </>
  );

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-ink-950 shadow-[0_8px_30px_rgba(10,10,26,0.35)]"
            : "border-b border-white/5 bg-ink-950"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="group inline-flex min-h-11 items-center gap-2.5" aria-label="홈으로">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-white text-[15px] font-extrabold shadow-glow">
              CC
            </span>
            <span className="text-[15px] font-bold text-white">
              노무사 <span className="text-brand-300">×</span> Claude Code
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-white/70">
            {links}
            <Link
              href="/lessons"
              className="ml-1 px-4 py-2 rounded-full bg-white text-ink-900 font-semibold text-[13px] hover:bg-brand-50 transition-colors min-h-[44px] flex items-center"
              aria-label="강의 시작하기"
            >
              시작하기
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid place-items-center w-11 h-11 rounded-lg text-white/80 hover:bg-white/10 transition-colors min-h-[44px]"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <nav className="md:hidden border-t border-white/10 bg-ink-950/95 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 text-sm font-medium text-white/75">
              {links}
              <Link
                href="/lessons"
                onClick={() => setOpen(false)}
                className="mt-1 px-4 py-2.5 rounded-full bg-white text-ink-900 font-semibold text-center min-h-[44px] flex items-center justify-center"
                aria-label="강의 시작하기"
              >
                시작하기
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
