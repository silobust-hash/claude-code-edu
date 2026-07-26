import type { Metadata } from "next";
import Link from "next/link";
import { serializeJsonLd } from "@/lib/serialize-jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";
const PROFILE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "소개",
  description:
    "Claude Code 실무 과정의 교육 방향과 운영 기준. 업무 적용, 보안, 검증, 단계별 실습을 중심으로 구성합니다.",
  alternates: { canonical: "/about" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://silronomu.com/#person",
  name: "박실로",
  jobTitle: "공인노무사",
  worksFor: {
    "@type": "Organization",
    name: "한동노무법인",
    url: "https://silronomu.com",
  },
  knowsAbout: ["AI 활용", "Claude Code", "노무사 업무 자동화", "비개발자 교육"],
  url: "https://silronomu.com",
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${PROFILE_URL}#profile`,
  url: PROFILE_URL,
  name: "Claude Code 실무 과정 교육 방향과 운영 기준",
  about: personJsonLd,
  mainEntity: { "@id": personJsonLd["@id"] },
  isPartOf: {
    "@type": "WebSite",
    name: "노무사 x Claude Code",
    url: SITE_URL,
  },
};

const principles = [
  {
    number: "01",
    title: "업무 흐름부터 설계",
    description:
      "도구 기능을 나열하기보다 실제 문서, 자료 정리, 검증 흐름에 연결해 실습합니다.",
  },
  {
    number: "02",
    title: "사람의 승인과 검증 유지",
    description:
      "AI가 만든 결과는 근거, 계산, 개인정보, 외부 전송 여부를 사람이 다시 확인합니다.",
  },
  {
    number: "03",
    title: "필요한 수준부터 시작",
    description:
      "입문자는 기초부터, 경험자는 수준진단 결과에 따라 필요한 강의군부터 선택할 수 있습니다.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-ink-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(profilePageJsonLd) }}
      />

      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-400/70 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="eyebrow text-accent-soft">교육 운영 안내</p>
          <h1 className="display-sm mt-4 max-w-3xl text-3xl text-white md:text-5xl">
            Claude Code를 업무에 연결하고,
            <br className="hidden sm:block" /> 결과를 검증하는 방법을 배웁니다
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg balance">
            이 과정은 빠른 생성보다 안전한 적용을 우선합니다. 실제 업무 흐름을
            작은 단위로 나누고, 실행 결과와 근거를 확인하는 습관을 단계별로 익힙니다.
          </p>
          <p className="mt-8 text-sm font-semibold text-white/85">
            박실로 공인노무사 · Claude Code 실무 과정 운영
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <section>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-700">운영 기준</p>
            <h2 className="display-sm mt-3 text-2xl text-ink-900 md:text-3xl">
              화려한 기능보다 반복 가능한 업무 습관
            </h2>
          </div>
          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.number} className="border-t-2 border-brand-500 pt-5">
                <p className="text-xs font-bold text-brand-700">{principle.number}</p>
                <h3 className="mt-2 font-bold text-ink-900">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 balance">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-ink-200 pt-12">
          <p className="eyebrow text-brand-700">학습 경로</p>
          <h2 className="display-sm mt-3 text-2xl text-ink-900 md:text-3xl">
            두 사이트를 목적에 따라 나눴습니다
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-lg border border-ink-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold text-brand-700">입문과 공통 기초</p>
              <h3 className="mt-2 text-lg font-bold text-ink-900">AI업무학교</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 balance">
                프롬프트, 컨텍스트, 바이브코딩, 에이전트 활용의 기본 원리와 안전한 사용 습관을 익힙니다.
              </p>
              <a
                href="https://ai-school.silronomu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:text-brand-600"
              >
                AI업무학교 보기 <span className="ml-1" aria-hidden>→</span>
              </a>
            </article>

            <article className="rounded-lg border border-brand-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold text-brand-700">기술 구현·측정</p>
              <h3 className="mt-2 text-lg font-bold text-ink-900">Claude Code 실무 과정</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 balance">
                터미널, 파일 작업, 자동화, 검증, 웹 서비스 제작과 배포를 단계별 과제로 실습합니다.
              </p>
              <Link
                href="/curriculum"
                className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:text-brand-600"
              >
                커리큘럼 보기 <span className="ml-1" aria-hidden>→</span>
              </Link>
            </article>
          </div>
        </section>

        <section className="mt-16 border-t border-ink-200 pt-12 md:flex md:items-end md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-700">시작 방법</p>
            <h2 className="display-sm mt-3 text-2xl text-ink-900 md:text-3xl">
              20문항 수준진단으로 필요한 과정부터 확인하세요
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-600 balance">
              결과는 학습 경로 추천에만 사용되며, 답변은 브라우저에 저장되고 서버로 전송되지 않습니다.
            </p>
          </div>
          <Link
            href="/level-test"
            className="mt-6 inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 md:mt-0"
          >
            수준진단 시작
          </Link>
        </section>
      </div>
    </div>
  );
}
