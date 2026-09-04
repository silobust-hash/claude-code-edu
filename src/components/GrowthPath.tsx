"use client";

const STORAGE_KEY = "claude-code-edu-next-action-v1";

export const growthPath = {
  id: "claude-code-implementation-to-consulting",
  name: "Claude Code 실무 교육 실행·상담 경로",
  read_url: "https://ai-school.silronomu.com/curriculum",
  prepare_url: "https://edu.silronomu.com/curriculum",
  request_url: "https://silropanda.com/products/ai-workflow-consulting-halfday",
  follow_url: "https://edu.silronomu.com/lessons",
} as const;

const steps = [
  {
    number: "01",
    title: "AI 업무 기초 보강",
    description: "프롬프트와 업무 설계가 낯설다면 AI업무학교의 기초 과정부터 확인합니다.",
    href: growthPath.read_url,
    label: "기초 커리큘럼 보기",
  },
  {
    number: "02",
    title: "실행 구간 찾기",
    description: "수준진단으로 설치·명령·검증 중 필요한 강의부터 시작합니다.",
    href: "/level-test",
    label: "수준진단 하기",
  },
  {
    number: "03",
    title: "작은 결과물 만들기",
    description: "전체 커리큘럼에서 실습·배포까지 한 단계씩 실행합니다.",
    href: growthPath.prepare_url,
    label: "실행 커리큘럼 보기",
  },
  {
    number: "04",
    title: "강의·업무화 상담",
    description: "팀 적용이 필요하면 기존 전문직 AI 업무화 컨설팅 상세에서 범위를 확인합니다.",
    href: growthPath.request_url,
    label: "업무화 컨설팅 상세 보기",
  },
  {
    number: "05",
    title: "다음 실습으로 이어가기",
    description: "실행 기록을 바탕으로 다음 강의와 실습을 계속 진행합니다.",
    href: growthPath.follow_url,
    label: "전체 강의 계속 보기",
  },
] as const;

function isExternal(href: string) {
  return href.startsWith("https://");
}

export default function GrowthPath({ compact = false }: { compact?: boolean }) {
  function remember(label: string) {
    try {
      window.localStorage.setItem(STORAGE_KEY, label);
    } catch {
      // 회원정보·서버 추적 없이 동선만 제공한다.
    }
  }

  return (
    <section
      aria-labelledby="growth-path-title"
      className={`rounded-3xl border border-ink-200 bg-white p-6 shadow-sm md:p-8 ${compact ? "mt-6" : ""}`}
    >
      <div className="max-w-3xl">
        <p className="eyebrow text-brand-600">NEXT ACTION PATH</p>
        <h2 id="growth-path-title" className="mt-2 text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">
          강의 다음에는 직접 실행하고, 필요하면 상담으로 이어가세요
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-base">
          선택한 다음 행동은 로그인 없이 이 브라우저에만 선택적으로 기억됩니다.
        </p>
      </div>

      <ol className="mt-6 grid gap-3 md:grid-cols-5">
        {steps.map((step) => (
          <li key={step.number}>
            <a
              href={step.href}
              {...(isExternal(step.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => remember(step.title)}
              className="group flex h-full min-h-44 flex-col rounded-2xl border border-ink-200 bg-ink-50 p-4 transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <span className="font-mono text-xs font-extrabold text-brand-600">{step.number}</span>
              <h3 className="mt-3 text-sm font-bold leading-snug text-ink-900">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-600">{step.description}</p>
              <span className="mt-auto pt-4 text-xs font-bold text-brand-700">
                {step.label} <span aria-hidden>→</span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs leading-relaxed text-ink-500">
        완성한 서비스·콘텐츠의 AI 검색 노출을 별도로 확인하려면{" "}
        <a href="https://xn--hc0b21et01ao2a.com/diagnose" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-700 underline underline-offset-2">
          AEO·GEO 무료 진단
        </a>{" "}
        을 선택할 수 있습니다.
      </p>
    </section>
  );
}
