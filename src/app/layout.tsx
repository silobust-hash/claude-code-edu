import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "노무사를 위한 Claude Code 실무 교육",
  description: "코딩 경험 없는 노무사도 Claude Code로 업무를 혁신할 수 있습니다. 1M 컨텍스트 시대, AI와 함께 일하는 법을 배워보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              노무사 x Claude Code
            </Link>
            <div className="flex gap-6 text-sm font-medium text-slate-600">
              <Link href="/curriculum" className="hover:text-indigo-600 transition-colors">커리큘럼</Link>
              <Link href="/lessons" className="hover:text-indigo-600 transition-colors">강의 목록</Link>
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Claude AI</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-slate-200 mt-20">
          <div className="max-w-6xl mx-auto px-6 py-10 text-center text-sm text-slate-500">
            <p>한동노무법인 | 대표 공인노무사 박실로</p>
            <p className="mt-1">1M 컨텍스트 시대, 노무사의 새로운 무기</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
