import type { Metadata } from "next";
import Link from "next/link";
import { serializeJsonLd } from "@/lib/serialize-jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";

export const metadata: Metadata = {
  title: "소개",
  description:
    "공인노무사 박실로가 현업에서 직접 활용하며 정리한 노무사 x Claude Code 소개 페이지입니다. AI업무학교(입문)와 edu(실무 심화) 과정 역할을 안내합니다.",
  alternates: {
    canonical: "/about",
  },
};

const PROFILE_URL = `${SITE_URL}/about`;

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
  name: "노무사 x Claude Code 소개",
  about: personJsonLd,
  mainEntity: {
    "@type": "Person",
    "@id": personJsonLd["@id"],
  },
  isPartOf: {
    "@type": "WebSite",
    name: "노무사 x Claude Code",
    url: SITE_URL,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(profilePageJsonLd) }} />

      <p className="eyebrow text-violet-300">노무사 x Claude Code</p>
      <h1 className="mt-4 text-3xl md:text-4xl font-bold leading-tight text-slate-100">
        박실로 노무사 소개와 교육 방향
      </h1>
      <p className="mt-4 text-slate-300 leading-relaxed">
        노무사 x Claude Code는 비개발자도 현장 업무에 즉시 적용 가능한 AI 기반 실무 교육입니다.
        박실로 공인노무사가 노무 실무에 직접 적용하며 배운 내용을 실행과 검증이 가능한 형태로 정리했습니다.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">교육 목적</h2>
        <p className="text-slate-300 leading-relaxed">
          반복 업무의 오류를 줄이고, 결과를 검증 가능한 규칙으로 바꾼 뒤 점진적으로 개선하는 실전 습관을 만드는 것입니다.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">사이트 역할 분리</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-indigo-200">AI업무학교(입문)</h3>
            <p className="mt-2 text-slate-300 text-sm leading-relaxed">
              AI 활용의 기본 프레임을 잡고 입문 단계를 빠르게 완성합니다.
            </p>
            <a
              href="https://ai-school.silronomu.com"
              className="mt-4 inline-block text-sm text-brand-300 hover:text-brand-200"
            >
              AI업무학교 바로가기
            </a>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-indigo-200">edu(실무 심화)</h3>
            <p className="mt-2 text-slate-300 text-sm leading-relaxed">
              실무 워크플로우·코드 작성·운영 체크를 이어서 다루는 심화 경로입니다.
            </p>
            <Link href="/curriculum" className="mt-4 inline-block text-sm text-brand-300 hover:text-brand-200">
              edu 커리큘럼 보기
            </Link>
          </article>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">수준진단으로 시작</h2>
        <p className="mt-2 text-slate-300 leading-relaxed">
          학습 목표·실무 성향·안전 습관을 기준으로 다음 강의군을 추천받고 바로 실습을 시작하세요.
        </p>
        <Link
          href="/level-test"
          className="mt-4 inline-flex items-center justify-center h-11 min-h-[44px] px-5 rounded-md bg-gradient-to-r from-brand-500 to-violet-600 text-sm font-semibold text-white"
        >
          수준진단 시작
        </Link>
      </section>
    </div>
  );
}
