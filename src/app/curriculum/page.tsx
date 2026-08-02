import Link from "next/link";
import type { Metadata } from "next";
import { getOrderedLessons } from "@/lib/lesson-catalog";
import { serializeJsonLd } from "@/lib/serialize-jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";

export const metadata: Metadata = {
  title: "전체 커리큘럼",
  description:
    "클로드 코드 16단계 80강 전체 커리큘럼 — 터미널 기초부터 MCP·스킬·플러그인·웹앱 배포까지, 실습 파일과 검증 로그가 남는 비개발자용 단계별 학습 경로.",
  alternates: { canonical: "/curriculum" },
  openGraph: {
    title: "전체 커리큘럼 | 노무사 x Claude Code",
    description:
      "클로드 코드 16단계 80강 전체 커리큘럼 — 터미널 기초부터 MCP·스킬·플러그인·웹앱 배포까지, 실습 파일과 검증 로그가 남는 비개발자용 단계별 학습 경로.",
    url: `${SITE_URL}/curriculum`,
  },
};

const PHASE_TITLES: Record<number, string> = {
  1: "AI 시대 이해하기",
  2: "Claude Code 설치와 첫걸음",
  3: "노무사 실무에 바로 쓰기",
  4: "업무 도구 속의 Claude",
  5: "스킬 — Claude의 핵심 기능",
  6: "코워크 & 플러그인",
  7: "마켓플레이스와 확장 기능",
  8: "MCP 서버로 업무 연동",
  9: "나만의 도구 만들기",
  10: "Worktree — 병렬 AI 코딩",
  11: "고급 활용과 자동화",
  12: "최신 기능 실무 적용",
  13: "영역 확장",
  14: "2026 최전선",
  15: "AI 엔지니어링 5단 진화",
  16: "AI 시대를 읽고 구현하는 법",
};

const lessons = getOrderedLessons();
type LessonGroup = typeof lessons;

const lessonGroups = Object.entries(
  lessons.reduce<Record<number, LessonGroup>>((acc, lesson) => {
    const phase = Number(lesson.id.split("-")[0]);
    if (!acc[phase]) acc[phase] = [];
    acc[phase].push(lesson);
    return acc;
  }, {})
).sort((a, b) => Number(a[0]) - Number(b[0]));

const curriculumJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "클로드 코드 커리큘럼",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: lessons.length,
  itemListElement: lessons.map((lesson, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${lesson.id} ${lesson.title}`,
    url: `${SITE_URL}/lessons/${lesson.id}`,
  })),
};

export default function CurriculumPage() {
  return (
    <div>
      <div className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 mesh-aurora opacity-50" aria-hidden />
        <div className="absolute inset-0 bg-grid-dark mask-radial opacity-55" aria-hidden />
        <div className="grain absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="eyebrow text-brand-300">CURRICULUM</p>
          <h1 className="display mt-3 text-4xl md:text-5xl">전체 커리큘럼</h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/70 balance">
            16단계 · 총 80강. 매 강의는 실제 강의 페이지로 직접 연결되어,
            단계별로 빠르게 이동할 수 있습니다.
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(curriculumJsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 rounded-2xl border border-white/20 bg-white/5 p-6 text-ink-900">
          <h2 className="text-lg font-bold">수준진단 기반 진입</h2>
          <p className="mt-2 text-sm text-ink-600">
            원하는 시작점을 고르기 전에 수준진단을 통해 현재 실무 역량에 맞는 구간으로 바로 이동하세요.
          </p>
          <Link
            href="/level-test"
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-brand-500/50 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800"
          >
            수준진단으로 맞춤 시작 구간 찾기
          </Link>
        </div>
        {lessonGroups.map(([phaseId, phaseLessons]) => {
          const phase = Number(phaseId);
          return (
            <section key={phaseId} className="mb-12">
              <h2 className="mb-4 text-xl font-bold text-ink-900">
                Phase {phase} · {PHASE_TITLES[phase]}
              </h2>
              <div className="space-y-3">
                {phaseLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.id}`}
                    className="group flex items-center gap-4 rounded-2xl border border-ink-200/80 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
                  >
                    <span className="grid h-9 min-w-[2.8rem] shrink-0 place-items-center rounded-lg bg-brand-50 px-2 font-mono text-xs font-bold text-brand-600 ring-1 ring-brand-100">
                      {lesson.id}
                    </span>
                    <span className="text-sm text-ink-800 group-hover:text-brand-700">
                      {lesson.title}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <div className="border-gradient mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-ink-500">
            수준진단 결과에 따라 강의를 선택해도 안전하게 진행할 수 있도록 구성되었습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
