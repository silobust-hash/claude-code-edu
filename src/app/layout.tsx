import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";

export const metadata: Metadata = {
  title: {
    default: "클로드 코드 강의 | 19년차 노무사가 가르치는 Claude Code 실무 교육",
    template: "%s | 노무사 x Claude Code",
  },
  description: "코딩 경험 없는 비개발자를 위한 클로드 코드(Claude Code) 실전 강의. 19년차 공인노무사 박실로가 터미널 여는 법부터 웹앱 배포까지, 12단계 52개 강의로 AI 업무 자동화를 가르칩니다.",
  keywords: ["클로드 코드 강의", "Claude Code 교육", "클로드 코드 교육", "AI 노무사", "비개발자 코딩", "바이브코딩", "클로드 코드 설치", "Claude Code 강의", "AI 업무 자동화", "노무사 AI"],
  authors: [{ name: "박실로", url: "https://silronomu.com" }],
  creator: "박실로 (공인노무사)",
  publisher: "한동노무법인",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "노무사 x Claude Code",
    title: "클로드 코드 강의 | 19년차 노무사가 가르치는 Claude Code 실무 교육",
    description: "코딩 경험 없는 비개발자를 위한 클로드 코드 실전 강의. 터미널 여는 법부터 웹앱 배포까지 12단계 52개 강의.",
  },
  twitter: {
    card: "summary_large_image",
    title: "클로드 코드 강의 | 노무사가 가르치는 Claude Code",
    description: "코딩 경험 없는 비개발자를 위한 클로드 코드 실전 강의. 12단계 52개 강의로 AI 업무 자동화.",
  },
  verification: {
    google: "bRgnvlb-svjtVk7G_TzQ4Upk4pjpA6VtOX4Mg1sTy9w",
    other: {
      "naver-site-verification": "b14dc4d237c8ed03a4d32fed0bc1af1d6ee68b99",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "박실로",
  alternateName: ["Park Silro", "실로노무사"],
  jobTitle: "공인노무사",
  worksFor: {
    "@type": "Organization",
    name: "한동노무법인",
  },
  knowsAbout: [
    "노동법", "근로기준법", "산업안전보건법",
    "Claude Code", "AI 업무 자동화", "바이브코딩",
    "클로드 코드 교육", "비개발자 AI 활용",
  ],
  description: "19년차 공인노무사이자 클로드 코드(Claude Code) 교육자. 비개발자 전문직을 위한 AI 활용 교육을 진행합니다.",
  url: "https://silronomu.com",
  sameAs: [
    "https://blog.silronomu.com",
    "https://ai-school.silronomu.com",
    "https://www.threads.com/@silrobag",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "노무사 x Claude Code",
  url: SITE_URL,
  description: "19년차 노무사가 가르치는 비개발자를 위한 클로드 코드(Claude Code) 실무 교육",
  author: { "@type": "Person", name: "박실로" },
  publisher: { "@type": "Organization", name: "한동노무법인" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              노무사 x Claude Code
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/curriculum" className="hover:text-indigo-600 transition-colors">커리큘럼</Link>
              <Link href="/lessons" className="hover:text-indigo-600 transition-colors">강의 목록</Link>
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Claude AI</a>
              <a href="https://www.threads.com/@silrobag?hl=ko" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.281 1.332-3.079.856-.74 2.062-1.17 3.386-1.214 1.307-.048 2.463.155 3.463.556.022-.376.006-.77-.05-1.17-.152-1.104-.586-1.903-1.291-2.376-.772-.517-1.832-.772-3.149-.757-1.038.008-1.964.217-2.752.621-.749.384-1.346.921-1.777 1.596l-1.694-1.159c.572-.897 1.378-1.613 2.396-2.13 1.076-.549 2.326-.84 3.717-.869h.136c1.764-.004 3.2.38 4.27 1.143 1.163.83 1.852 2.058 2.048 3.65.064.51.08 1.04.05 1.573.92.56 1.678 1.3 2.22 2.242.783 1.362.945 3.086.482 5.134-.585 2.556-1.96 4.452-4.088 5.637-1.878 1.045-4.116 1.573-6.655 1.573zm1.57-8.6c-.834.036-1.527.233-2.003.568-.399.282-.609.655-.586 1.048.023.39.253.747.648.998.471.3 1.108.455 1.845.42 1.082-.06 1.9-.44 2.43-1.128.376-.488.654-1.14.822-1.932-.7-.278-1.528-.449-2.396-.449-.254 0-.51.016-.76.048v-.573z"/></svg>
                Threads
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <Analytics />
        <footer className="border-t border-slate-200 mt-20">
          <div className="max-w-6xl mx-auto px-6 py-10 text-center text-sm text-slate-500">
            <p className="font-medium text-slate-600">한동노무법인 | 대표 공인노무사 박실로</p>
            <p className="mt-1">1M 컨텍스트 시대, 노무사의 새로운 무기</p>
            <div className="flex justify-center gap-4 mt-3">
              <a href="https://silronomu.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">홈페이지</a>
              <span className="text-slate-300">|</span>
              <a href="https://ai-school.silronomu.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">AI업무학교</a>
              <span className="text-slate-300">|</span>
              <a href="https://www.threads.com/@silrobag?hl=ko" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Threads</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
