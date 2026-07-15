"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 bg-indigo-600 text-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="text-lg font-bold">
            CMS 관리
          </Link>
          <Link
            href="/admin/dashboard"
            className="text-sm text-indigo-100 hover:text-white transition-colors px-2 py-1 rounded-md min-h-[44px] flex items-center"
            aria-label="관리자 대시보드로 이동"
          >
            대시보드
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-100 hover:text-white transition-colors px-2 py-1 rounded-md min-h-[44px] flex items-center"
            aria-label="사이트 새 탭에서 보기"
          >
            사이트 보기
          </a>
          <button
            onClick={handleLogout}
            className="text-sm bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-lg transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
            aria-label="관리자 로그아웃"
          >
            로그아웃
          </button>
        </div>
      </div>
    </nav>
  );
}
