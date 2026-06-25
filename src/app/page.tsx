import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";
const PERSON_ID = "https://silronomu.com/#person";

export const metadata: Metadata = {
  title: "클로드 코드 강의 | 19년차 노무사가 가르치는 Claude Code 실무 교육",
  description: "코딩 경험 없는 비개발자를 위한 클로드 코드(Claude Code) 실전 강의. 19년차 공인노무사 박실로가 터미널 여는 법부터 웹앱 배포까지, 15단계 69개 강의로 AI 업무 자동화를 가르칩니다.",
  alternates: { canonical: "/" },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/#course`,
  name: "클로드 코드(Claude Code) 실전 강의",
  description: "19년차 노무사가 가르치는 비개발자를 위한 클로드 코드 실무 교육. 터미널 여는 법부터 웹앱 배포까지 15단계 69개 강의.",
  provider: { "@id": `${SITE_URL}/#org` },
  instructor: {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "박실로",
    jobTitle: "공인노무사",
    description: "19년차 공인노무사이자 클로드 코드 교육자",
  },
  educationalLevel: "Beginner",
  inLanguage: "ko",
  isAccessibleForFree: true,
  about: ["Claude Code", "AI 업무 자동화", "노무 자동화"],
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT59H",
  },
  teaches: [
    "Claude Code 설치 및 기본 사용법",
    "AI를 활용한 임금계산 및 문서작성 자동화",
    "MCP 서버 연동 (Gmail, 캘린더, 노션)",
    "커스텀 스킬 및 플러그인 개발",
    "Next.js 웹앱 개발 및 Vercel 배포",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "클로드 코드 강의는 비개발자도 들을 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 이 강의는 코딩 경험이 전혀 없는 비개발자를 위해 설계되었습니다. 터미널 여는 법부터 시작하며, 19년차 노무사가 비개발자 관점에서 쉽게 설명합니다. 엑셀 함수 정도 쓸 줄 안다면 충분합니다.",
      },
    },
    {
      "@type": "Question",
      name: "클로드 코드와 ChatGPT의 차이점은 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT는 웹 채팅 기반이지만, 클로드 코드(Claude Code)는 터미널에서 동작하며 파일을 직접 읽고, 코드를 작성하고, 명령을 실행할 수 있는 AI 파트너입니다. 1M 컨텍스트로 근로기준법 전문(약 8만자)을 통째로 읽고 분석할 수 있어, 법률 업무에 특히 강력합니다.",
      },
    },
    {
      "@type": "Question",
      name: "강의를 완료하면 무엇을 할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "15단계 과정을 완료하면 퇴직금·임금 자동 계산, 취업규칙 검토 자동화, 진정서·의견서 초안 작성, MCP로 Gmail·캘린더·노션 연동, 커스텀 스킬과 플러그인 개발, 그리고 나만의 웹앱을 만들어 배포하는 것까지 가능합니다.",
      },
    },
    {
      "@type": "Question",
      name: "클로드 코드 강의는 얼마나 걸리나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "총 15단계, 69개 강의로 약 66시간 분량입니다. 자기 페이스에 맞춰 진행할 수 있으며, Phase 1~3(기초)만 마쳐도 실무에 바로 적용할 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "노무사가 아니어도 이 강의가 도움이 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 노무사 실무 예시를 사용하지만 클로드 코드 활용법 자체는 모든 비개발자 전문직(변호사, 회계사, 세무사 등)에게 적용됩니다. AI를 업무에 연결하는 방법을 배우는 것이 핵심입니다.",
      },
    },
  ],
};

const faqs = faqJsonLd.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

const courses = [
  {
    phase: "Phase 1",
    title: "AI 시대 이해하기",
    subtitle: "1M 컨텍스트가 뭐길래?",
    emoji: "🌅",
    color: "from-amber-400 to-orange-500",
    lessons: [
      "AI가 노무사 업무를 바꾸는 방식",
      "1M 컨텍스트의 의미 — 법령 전문을 통째로 읽는 AI",
      "ChatGPT vs Claude — 노무사에게 맞는 AI는?",
      "Claude Code란? 터미널에서 만나는 AI 파트너",
      "IT 용어 사전 — 개발자 말, 노무사 말로 번역하기",
    ],
  },
  {
    phase: "Phase 2",
    title: "Claude Code 설치와 첫걸음",
    subtitle: "코딩 경험 제로에서 시작",
    emoji: "🚀",
    color: "from-indigo-400 to-purple-500",
    lessons: [
      "맥/윈도우에 터미널 여는 법부터",
      "터미널 기초 명령어 — 서류함 열고 닫듯이",
      "Node.js 설치 — 복사 붙여넣기면 충분합니다",
      "Claude Code 설치 & 로그인",
      "첫 대화 — '안녕 클로드, 나는 노무사야'",
    ],
  },
  {
    phase: "Phase 3",
    title: "노무사 실무에 바로 쓰기",
    subtitle: "임금계산부터 문서작성까지",
    emoji: "⚡",
    color: "from-emerald-400 to-teal-500",
    lessons: [
      "퇴직금·평균임금 자동 계산기 만들기",
      "취업규칙 검토 자동화",
      "진정서·구제신청서 초안 작성",
      "판례 검색과 법리 분석 자동화",
      "CLAUDE.md로 나만의 AI 비서 세팅하기",
    ],
  },
  {
    phase: "Phase 4",
    title: "업무 도구 속의 Claude",
    subtitle: "엑셀, PPT, 크롬에서 바로 쓰기",
    emoji: "💼",
    color: "from-lime-400 to-green-500",
    lessons: [
      "Claude in Excel — 엑셀 안에서 AI로 데이터 분석",
      "Claude in PPT — 프레젠테이션을 AI가 함께 만든다",
      "Claude for Chrome — 브라우저에서 바로 쓰는 AI 비서",
      "실전: 임금대장 분석 + 강의 슬라이드 + 판례 요약 한번에",
      "Claude 시각화 — 차트와 다이어그램을 대화로 만들기",
    ],
  },
  {
    phase: "Phase 5",
    title: "스킬 — Claude의 핵심 기능",
    subtitle: "슬래시 한 번으로 전문가 모드 ON",
    emoji: "🎪",
    color: "from-sky-400 to-blue-500",
    lessons: [
      "스킬이란? — /명령어 하나로 복잡한 작업을 자동화",
      "빌트인 스킬 활용 — /commit, /review-pr 등",
      "커스텀 스킬 만들기 — 나만의 /임금계산, /취업규칙검토",
      "스킬 체이닝 — 여러 스킬을 연결해 파이프라인 구축",
    ],
  },
  {
    phase: "Phase 6",
    title: "코워크 & 플러그인",
    subtitle: "AI 협업 시스템의 꽃",
    emoji: "🤝",
    color: "from-orange-400 to-red-500",
    lessons: [
      "코워크란? — Claude와 진짜 '협업'하는 방식",
      "플러그인의 개념 — 전문 분야별 AI 확장 모듈",
      "노무사 플러그인 실전 — 사건접수부터 문서검증까지",
      "나만의 플러그인 설계 — 우리 사무실 맞춤 워크플로우",
    ],
  },
  {
    phase: "Phase 7",
    title: "마켓플레이스 — 만능 공구 사러 가기",
    subtitle: "공식·커뮤니티·MCP 마켓 총정리",
    emoji: "🧰",
    color: "from-yellow-400 to-amber-500",
    lessons: [
      "공식 마켓플레이스 — Anthropic 직영 공구상",
      "커뮤니티 마켓 — 동네 철물점에서 보물 찾기",
      "MCP 서버 레지스트리 — 전문 장비 대여점",
      "나만의 공구함 꾸리기 — 실전 활용",
    ],
  },
  {
    phase: "Phase 8",
    title: "MCP 서버로 업무 연동",
    subtitle: "Gmail, 캘린더, 노션 한방에",
    emoji: "🔗",
    color: "from-blue-400 to-cyan-500",
    lessons: [
      "MCP 서버란? 왜 노무사에게 필요한가",
      "Gmail 연동 — 의뢰인 이메일 자동 분류",
      "Google Calendar — 사건 기일 관리",
      "Notion 연동 — 사건 데이터베이스 구축",
    ],
  },
  {
    phase: "Phase 9",
    title: "나만의 도구 만들기",
    subtitle: "코딩 제로에서 웹앱 배포까지",
    emoji: "🛠️",
    color: "from-rose-400 to-pink-500",
    lessons: [
      "HTML/CSS/JS 기초 — Claude가 알려주니까 쉬워요",
      "Next.js로 웹사이트 뚝딱 만들기",
      "Vercel 배포 — 내가 만든 서비스를 세상에",
      "실전: 노무 상담 접수 폼 만들어 배포하기",
    ],
  },
  {
    phase: "Phase 10",
    title: "Worktree — 병렬 AI 코딩",
    subtitle: "여러 사건을 동시에 처리하는 비법",
    emoji: "🌳",
    color: "from-teal-400 to-emerald-500",
    lessons: [
      "Worktree란? — 여러 사건을 동시에 펼쳐놓기",
      "Worktree 실전 — claude --worktree로 시작하기",
      "자주 쓰는 명령어와 문제 해결",
      "노무사를 위한 Worktree 활용 시나리오",
    ],
  },
  {
    phase: "Phase 11",
    title: "고급 활용과 자동화",
    subtitle: "AI 노무사 워크플로우 완성",
    emoji: "🎯",
    color: "from-violet-400 to-purple-600",
    lessons: [
      "리모트 컨트롤 — 폰에서도 Claude Code",
      "Claude Code on Web — 클라우드에서 자동화",
      "팀 워크플로우 — 사무실 전체가 AI와 협업",
      "전체 파이프라인 완성 — 스킬+코워크+MCP 통합",
    ],
  },
  {
    phase: "Phase 12",
    title: "최신 기능 마스터하기",
    subtitle: "Auto Mode, Dispatch, Computer Use, Hooks",
    emoji: "🔮",
    color: "from-fuchsia-400 to-pink-600",
    lessons: [
      "Auto Mode — AI에게 전권을 위임하기",
      "Dispatch — AI 비서 여러 명 동시 투입",
      "Computer Use — AI가 화면을 직접 조작하기",
      "Hooks — 이벤트 기반 자동화",
    ],
  },
];

const features: {
  icon: string;
  title: string;
  desc: string;
  /** bento layout span + visual variant */
  span: string;
  variant?: "default" | "feature" | "dark";
}[] = [
  {
    icon: "📚",
    title: "법령 통째로 이해",
    desc: "1M 컨텍스트로 근로기준법, 산안법, 중처법 전문을 한번에 읽고 분석합니다.",
    span: "md:col-span-2 lg:col-span-2 lg:row-span-2",
    variant: "feature",
  },
  {
    icon: "🧮",
    title: "계산은 코드로 검증",
    desc: "퇴직금, 연차수당, 평균임금 — 엑셀 대신 코드로 정확하게.",
    span: "lg:col-span-2",
  },
  {
    icon: "🎪",
    title: "스킬로 원클릭 자동화",
    desc: "/임금계산 한 번이면 끝. 복잡한 작업을 슬래시 명령어 하나로 실행합니다.",
    span: "lg:col-span-2",
  },
  {
    icon: "🤝",
    title: "코워크 & 플러그인",
    desc: "사건접수→분석→문서작성→검증까지, 플러그인으로 전문 파이프라인을 구축합니다.",
    span: "md:col-span-2 lg:col-span-2",
    variant: "dark",
  },
  {
    icon: "💼",
    title: "엑셀·PPT·크롬에서도",
    desc: "터미널 없이도 OK. 익숙한 엑셀, PPT, 크롬 브라우저에서 바로 Claude를 씁니다.",
    span: "lg:col-span-2",
  },
  {
    icon: "📝",
    title: "문서 자동 생성",
    desc: "진정서, 의견서, 취업규칙 검토서를 AI와 함께 작성합니다.",
    span: "lg:col-span-3",
  },
  {
    icon: "🌐",
    title: "배포까지 한번에",
    desc: "코딩 경험 없이도 웹앱을 만들어 Vercel에 배포할 수 있습니다.",
    span: "lg:col-span-3",
  },
];

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <ScrollReveal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        {/* layered background: mesh aurora + grid + grain */}
        <div className="absolute inset-0 mesh-aurora opacity-70" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid-dark mask-radial opacity-60" aria-hidden="true" />
        <div
          className="absolute top-24 -left-20 h-72 w-72 rounded-full bg-violet-500/30 blur-[120px] animate-floaty"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-10 right-0 h-80 w-80 rounded-full bg-brand-500/30 blur-[120px] animate-drift"
          aria-hidden="true"
        />
        <div className="grain absolute inset-0" aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Copy column */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/85 backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-300" />
                </span>
                1M 컨텍스트 시대의 AI 활용
              </div>

              <h1 className="display mt-7 text-[2.7rem] leading-[1.05] sm:text-6xl md:text-[4.2rem]">
                코딩 몰라도 괜찮아요.
                <br />
                <span className="text-gradient">Claude Code</span>
                <span className="text-white">가 있으니까.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl balance">
                19년차 노무사가 직접 만든 실무 교육 과정.
                <br className="hidden sm:block" />
                터미널 여는 법부터 웹앱 배포까지, 노무사의 일하는 방식을 바꿔보세요.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/curriculum"
                  className="btn-glow inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white"
                >
                  커리큘럼 보기
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <Link
                  href="/lessons"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  바로 시작하기
                </Link>
              </div>

              {/* stat ribbon */}
              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
                {[
                  { k: "15단계", v: "체계적 커리큘럼" },
                  { k: "69개 강의", v: "단계별 실습" },
                  { k: "66시간", v: "현업 노무사 설계" },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="text-2xl font-extrabold tracking-tight text-white">{s.k}</dt>
                    <dd className="mt-0.5 text-sm text-white/45">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Visual column — terminal mock (decorative) */}
            <div className="relative" aria-hidden="true">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-500/20 to-violet-600/10 blur-2xl" />
              <div className="border-gradient relative rounded-2xl bg-ink-900/80 p-1.5 shadow-2xl backdrop-blur">
                <div className="rounded-xl bg-ink-950/90 ring-1 ring-white/5">
                  <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    <span className="ml-3 text-xs font-medium text-white/35">claude — 노무사 작업실</span>
                  </div>
                  <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed">
                    <p className="text-white/45">
                      <span className="text-brand-300">›</span> 퇴직금 계산기 만들어줘
                    </p>
                    <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3 text-white/70">
                      <p className="text-violet-300">● 평균임금 산정 코드를 작성합니다…</p>
                      <p className="mt-1.5 text-white/40">
                        ✓ 3개월 임금총액 / 총일수
                      </p>
                      <p className="text-white/40">✓ 통상임금 비교 검증</p>
                      <p className="text-white/40">✓ xlsx 산식표 출력</p>
                    </div>
                    <p className="text-white/45">
                      <span className="text-brand-300">›</span> 취업규칙 위반 잡아줘
                    </p>
                    <div className="flex items-center gap-2 text-emerald-300/90">
                      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      근로기준법 전문 분석 중…
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* seam fade into light page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#fbfbfe]" aria-hidden="true" />
      </section>

      {/* ───────────── Who is this for ───────────── */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow text-brand-600">FOR YOU</p>
          <h2 className="display-sm mt-3 text-3xl md:text-4xl text-ink-900">
            이런 노무사를 위해 만들었습니다
          </h2>
          <p className="mt-4 text-lg text-ink-500 balance">
            &ldquo;AI 써보고 싶은데, 어디서부터 시작해야 할지 모르겠어요&rdquo;
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              emoji: "🤔",
              title: "ChatGPT는 써봤는데...",
              desc: "채팅으로 물어보는 것 말고, 진짜 업무에 연결하는 방법을 모르는 분",
            },
            {
              emoji: "💻",
              title: "코딩은 해본 적 없지만",
              desc: "엑셀 함수 정도는 쓸 줄 아는, 새로운 도구에 열린 마음을 가진 분",
            },
            {
              emoji: "⏰",
              title: "시간이 부족한 현업 노무사",
              desc: "반복 업무를 줄이고, 핵심 업무에 집중하고 싶은 분",
            },
          ].map((item, i) => (
            <div
              key={i}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="border-gradient lift group rounded-2xl bg-white p-7 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl ring-1 ring-brand-100">
                  {item.emoji}
                </span>
                <span className="font-mono text-sm font-bold text-ink-300 transition-colors group-hover:text-brand-400">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Features (Bento) ───────────── */}
      <section className="relative overflow-hidden border-y border-ink-200/70 bg-ink-50">
        <div className="absolute inset-0 bg-grid opacity-50 mask-fade-b" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl" data-reveal>
            <p className="eyebrow text-brand-600">WHAT CHANGES</p>
            <h2 className="display-sm mt-3 text-3xl md:text-4xl text-ink-900">
              1M 컨텍스트로 달라지는 노무사 업무
            </h2>
          </div>

          <div className="mt-12 grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {features.map((f, i) => {
              if (f.variant === "feature") {
                return (
                  <article
                    key={i}
                    data-reveal
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink-950 p-8 text-white ${f.span}`}
                  >
                    <div className="absolute inset-0 mesh-aurora opacity-50" aria-hidden="true" />
                    <div className="absolute inset-0 bg-dots-dark opacity-50" aria-hidden="true" />
                    <div className="relative">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-3xl backdrop-blur ring-1 ring-white/15">
                        {f.icon}
                      </span>
                      <h3 className="mt-6 text-2xl font-extrabold tracking-tight">{f.title}</h3>
                      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/65">
                        {f.desc}
                      </p>
                    </div>
                    <div className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-brand-200 ring-1 ring-white/10">
                      8만자 법령도 한 번에
                    </div>
                  </article>
                );
              }
              if (f.variant === "dark") {
                return (
                  <article
                    key={i}
                    data-reveal
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 p-7 text-white shadow-glow ${f.span}`}
                  >
                    <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
                    <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-2xl backdrop-blur">
                      {f.icon}
                    </span>
                    <div className="relative mt-5">
                      <h3 className="text-lg font-bold">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">{f.desc}</p>
                    </div>
                  </article>
                );
              }
              return (
                <article
                  key={i}
                  data-reveal
                  className={`border-gradient lift group flex flex-col rounded-3xl bg-white p-7 shadow-sm ${f.span}`}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl ring-1 ring-brand-100 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {f.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{f.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── Curriculum Preview ───────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div className="max-w-xl">
            <p className="eyebrow text-brand-600">CURRICULUM</p>
            <h2 className="display-sm mt-3 text-3xl md:text-4xl text-ink-900">15단계 커리큘럼</h2>
            <p className="mt-4 text-lg text-ink-500 balance">
              터미널을 처음 여는 순간부터, 나만의 웹서비스를 세상에 공개하는 날까지
            </p>
          </div>
          <Link
            href="/curriculum"
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 md:inline-flex"
          >
            전체 보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, i) => (
            <div
              key={i}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 4) * 70}ms` }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              {/* gradient accent rail */}
              <div className={`h-1 w-full bg-gradient-to-r ${course.color}`} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-400">
                    {course.phase}
                  </span>
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${course.color} text-sm font-extrabold text-white shadow-sm`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-[17px] font-bold leading-snug text-ink-900">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-ink-400">{course.subtitle}</p>
                <ul className="mt-5 space-y-2 border-t border-dashed border-ink-200 pt-4">
                  {course.lessons.map((lesson, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-600">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center" data-reveal>
          <Link
            href="/curriculum"
            className="btn-glow inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-white"
          >
            전체 커리큘럼 자세히 보기
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section className="border-y border-ink-200/70 bg-ink-50">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center" data-reveal>
            <p className="eyebrow text-brand-600">FAQ</p>
            <h2 className="display-sm mt-3 text-3xl md:text-4xl text-ink-900">자주 묻는 질문</h2>
          </div>
          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}
                className="group rounded-2xl border border-ink-200/80 bg-white shadow-sm transition-colors open:border-brand-200 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-[17px] font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-sm font-bold text-brand-400">
                      Q{i + 1}
                    </span>
                    {faq.question}
                  </span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-lg text-brand-600 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pl-[3.4rem] leading-relaxed text-ink-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink-950 px-8 py-16 text-center text-white md:px-16 md:py-20" data-reveal>
          <div className="absolute inset-0 mesh-aurora opacity-60" aria-hidden="true" />
          <div className="absolute inset-0 bg-grid-dark opacity-40 mask-radial" aria-hidden="true" />
          <div className="grain absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="display-sm text-3xl md:text-5xl">지금 시작해보세요</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65 balance">
              코딩을 몰라도 됩니다. 터미널이 뭔지 몰라도 됩니다.
              <br className="hidden sm:block" />
              이 교육 과정이 처음부터 끝까지 함께합니다.
            </p>
            <Link
              href="/lessons"
              className="btn-glow mt-9 inline-flex items-center gap-2 rounded-full px-9 py-4 text-lg font-bold text-white"
            >
              첫 번째 강의 시작
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
