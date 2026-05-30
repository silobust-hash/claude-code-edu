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
        className="hover:text-white transition-colors"
      >
        커리큘럼
      </Link>
      <Link
        href="/lessons"
        onClick={() => setOpen(false)}
        className="hover:text-white transition-colors"
      >
        강의 목록
      </Link>
      <a
        href="https://claude.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
      >
        Claude AI
      </a>
      <a
        href="https://www.threads.com/@silrobag?hl=ko"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors flex items-center gap-1.5"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.281 1.332-3.079.856-.74 2.062-1.17 3.386-1.214 1.307-.048 2.463.155 3.463.556.022-.376.006-.77-.05-1.17-.152-1.104-.586-1.903-1.291-2.376-.772-.517-1.832-.772-3.149-.757-1.038.008-1.964.217-2.752.621-.749.384-1.346.921-1.777 1.596l-1.694-1.159c.572-.897 1.378-1.613 2.396-2.13 1.076-.549 2.326-.84 3.717-.869h.136c1.764-.004 3.2.38 4.27 1.143 1.163.83 1.852 2.058 2.048 3.65.064.51.08 1.04.05 1.573.92.56 1.678 1.3 2.22 2.242.783 1.362.945 3.086.482 5.134-.585 2.556-1.96 4.452-4.088 5.637-1.878 1.045-4.116 1.573-6.655 1.573zm1.57-8.6c-.834.036-1.527.233-2.003.568-.399.282-.609.655-.586 1.048.023.39.253.747.648.998.471.3 1.108.455 1.845.42 1.082-.06 1.9-.44 2.43-1.128.376-.488.654-1.14.822-1.932-.7-.278-1.528-.449-2.396-.449-.254 0-.51.016-.76.048v-.573z" />
        </svg>
        Threads
      </a>
    </>
  );

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-ink-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-ink-950/75 shadow-[0_8px_30px_rgba(10,10,26,0.35)]"
            : "border-b border-white/5 bg-ink-950"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="홈으로">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-white text-[15px] font-extrabold shadow-glow">
              CC
            </span>
            <span className="text-[15px] font-bold tracking-tight text-white">
              노무사 <span className="text-brand-300">×</span> Claude Code
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-white/70">
            {links}
            <Link
              href="/lessons"
              className="ml-1 px-4 py-2 rounded-full bg-white text-ink-900 font-semibold text-[13px] hover:bg-brand-50 transition-colors"
            >
              시작하기
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid place-items-center w-9 h-9 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
            aria-label="메뉴 열기"
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
                className="mt-1 px-4 py-2.5 rounded-full bg-white text-ink-900 font-semibold text-center"
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
