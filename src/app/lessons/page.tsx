import type { Metadata } from "next";
import Link from "next/link";
import { getOrderedLessons } from "@/lib/lesson-catalog";
import LessonProgressPanel from "@/components/LessonProgressPanel";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";

const PHASE_TITLES: Record<number, string> = {
  1: "AI 시대 이해하기",
  2: "Claude Code 설치와 첫걸음",
  3: "노무사 실무에 바로 쓰기",
  4: "업무 도구 속의 Claude",
  5: "스킬 — Claude의 핵심 기능",
  6: "코워크 & 플러그인",
  7: "마켓플레이스 — 만능 공구 사러 가기",
  8: "MCP 서버로 업무 연동",
  9: "나만의 도구 만들기",
  10: "Worktree — 병렬 AI 코딩",
  11: "고급 활용과 자동화",
  12: "최신 기능 마스터하기",
  13: "영역 확장",
  14: "2026 최전선",
  15: "AI 엔지니어링 5단 진화",
  16: "AI 시대를 읽는 눈",
};

const orderedLessons = getOrderedLessons();
const catalog = orderedLessons.map((lesson) => ({ id: lesson.id, title: lesson.title }));

export const metadata: Metadata = {
  title: "강의 목록",
  description: "클로드 코드 16단계 73강 전체 강의 목록 — Phase 1 AI 시대 이해하기부터 Phase 16 AI 시대를 읽는 눈까지, 비개발자 노무사를 위한 단계별 강의를 한눈에 확인하세요.",
  alternates: { canonical: "/lessons" },
  openGraph: {
    title: "강의 목록 | 노무사 x Claude Code",
    description: "클로드 코드 16단계 73강 전체 강의 목록 — Phase 1 AI 시대 이해하기부터 Phase 16 AI 시대를 읽는 눈까지, 비개발자 노무사를 위한 단계별 강의를 한눈에 확인하세요.",
    url: `${SITE_URL}/lessons`,
  },
};

const lessonGroups = Object.entries(
  orderedLessons.reduce((acc, lesson) => {
    const phaseNumber = Number(lesson.id.split("-")[0]);
    const group = acc[phaseNumber] || [];
    group.push(lesson);
    acc[phaseNumber] = group;
    return acc;
  }, {} as Record<number, { id: string; title: string }[]>)
).sort(([a], [b]) => Number(a) - Number(b));

export default function LessonsPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 mesh-aurora opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid-dark mask-radial opacity-55" aria-hidden="true" />
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
          <p className="eyebrow text-brand-300">LESSONS · 73 강의</p>
          <h1 className="display mt-4 text-4xl md:text-5xl">강의 목록</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65 balance">
            순서대로 따라가세요. 각 강의는 독립적이지만, 앞 단계를 먼저 보시면 더 잘 이해됩니다.
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#fbfbfe]" aria-hidden="true" />
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <LessonProgressPanel totalLessons={catalog.length} catalog={catalog} />
        <div className="space-y-12">
          {lessonGroups.map(([phaseId, lessons]) => (
            <div key={phaseId}>
              <h2 className="mb-4 flex items-center gap-2.5 text-lg font-bold text-ink-900">
                <span className="rounded-full bg-brand-600 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                  Phase {phaseId}
                </span>
                {PHASE_TITLES[Number(phaseId)]}
              </h2>
              <div className="space-y-2">
                {lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.id}`}
                    className="group flex items-center gap-4 rounded-2xl border border-ink-200/80 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
                  >
                    <div className="grid h-9 min-w-[2.6rem] shrink-0 place-items-center rounded-lg bg-brand-50 px-2 font-mono text-xs font-bold text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      {lesson.id}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-ink-800 transition-colors group-hover:text-brand-700">
                        {lesson.title}
                      </span>
                    </div>
                    <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 sm:inline-flex">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      수강 가능
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-gradient relative mt-16 rounded-2xl bg-white p-8 text-center shadow-sm">
          <h3 className="text-lg font-bold text-ink-900">전체 16단계, 73개 강의</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            Phase 1부터 순서대로 따라가시면 됩니다.
            <br />
            코딩 경험이 전혀 없어도 괜찮습니다. 함께 가봅시다!
          </p>
        </div>
      </div>
    </div>
  );
}
