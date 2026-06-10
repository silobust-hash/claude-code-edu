import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";

export const metadata: Metadata = {
  title: "강의 목록",
  description: "클로드 코드 14단계 64강 전체 강의 목록 — Phase 1 AI 시대 이해하기부터 Phase 14 2026 최전선까지, 비개발자 노무사를 위한 단계별 강의를 한눈에 확인하세요.",
  alternates: { canonical: "/lessons" },
  openGraph: {
    title: "강의 목록 | 노무사 x Claude Code",
    description: "클로드 코드 14단계 64강 전체 강의 목록 — Phase 1 AI 시대 이해하기부터 Phase 14 2026 최전선까지, 비개발자 노무사를 위한 단계별 강의를 한눈에 확인하세요.",
    url: `${SITE_URL}/lessons`,
  },
};

const allLessons = [
  {
    phase: 1,
    phaseTitle: "AI 시대 이해하기",
    lessons: [
      { id: "1-1", title: "AI가 노무사 업무를 바꾸는 방식", status: "available" },
      { id: "1-2", title: "1M 컨텍스트의 의미 — 법령 전문을 통째로 읽는 AI", status: "available" },
      { id: "1-3", title: "ChatGPT vs Claude — 노무사에게 맞는 AI는?", status: "available" },
      { id: "1-4", title: "Claude Code란? 터미널에서 만나는 AI 파트너", status: "available" },
      { id: "1-5", title: "IT 용어 사전 — 개발자 말, 노무사 말로 번역하기", status: "available" },
    ],
  },
  {
    phase: 2,
    phaseTitle: "Claude Code 설치와 첫걸음",
    lessons: [
      { id: "2-1", title: "맥/윈도우에 터미널 여는 법부터", status: "available" },
      { id: "2-2", title: "터미널 기초 명령어 — 서류함 열고 닫듯이", status: "available" },
      { id: "2-3", title: "Node.js 설치 — 복사 붙여넣기면 충분합니다", status: "available" },
      { id: "2-4", title: "Claude Code 설치 & 로그인", status: "available" },
      { id: "2-5", title: "첫 대화 — '안녕 클로드, 나는 노무사야'", status: "available" },
    ],
  },
  {
    phase: 3,
    phaseTitle: "노무사 실무에 바로 쓰기",
    lessons: [
      { id: "3-1", title: "퇴직금·평균임금 자동 계산기 만들기", status: "available" },
      { id: "3-2", title: "취업규칙 검토 자동화", status: "available" },
      { id: "3-3", title: "진정서·구제신청서 초안 작성", status: "available" },
      { id: "3-4", title: "판례 검색과 법리 분석 자동화", status: "available" },
      { id: "3-5", title: "CLAUDE.md로 나만의 AI 비서 세팅하기", status: "available" },
    ],
  },
  {
    phase: 4,
    phaseTitle: "업무 도구 속의 Claude",
    lessons: [
      { id: "4-1", title: "Claude in Excel — 엑셀 안에서 AI로 데이터 분석", status: "available" },
      { id: "4-2", title: "Claude in PPT — 프레젠테이션을 AI가 함께 만든다", status: "available" },
      { id: "4-3", title: "Claude for Chrome — 브라우저에서 바로 쓰는 AI 비서", status: "available" },
      { id: "4-4", title: "실전: 임금대장 분석 + 강의 슬라이드 + 판례 요약 한번에", status: "available" },
      { id: "4-5", title: "Claude 시각화 — 차트와 다이어그램을 대화로 만들기", status: "available" },
    ],
  },
  {
    phase: 5,
    phaseTitle: "스킬 — Claude의 핵심 기능",
    lessons: [
      { id: "5-1", title: "스킬이란? — /명령어 하나로 복잡한 작업을 자동화", status: "available" },
      { id: "5-2", title: "빌트인 스킬 활용 — /commit, /review-pr 등", status: "available" },
      { id: "5-3", title: "커스텀 스킬 만들기 — 나만의 /임금계산, /취업규칙검토", status: "available" },
      { id: "5-4", title: "스킬 체이닝 — 여러 스킬을 연결해 파이프라인 구축", status: "available" },
    ],
  },
  {
    phase: 6,
    phaseTitle: "코워크 & 플러그인",
    lessons: [
      { id: "6-1", title: "코워크란? — Claude와 진짜 '협업'하는 방식", status: "available" },
      { id: "6-2", title: "플러그인의 개념 — 전문 분야별 AI 확장 모듈", status: "available" },
      { id: "6-3", title: "노무사 플러그인 실전 — 사건접수부터 문서검증까지", status: "available" },
      { id: "6-4", title: "나만의 플러그인 설계 — 우리 사무실 맞춤 워크플로우", status: "available" },
      { id: "6-5", title: "플러그인 조합 — 4대 법률 통합, 블로그 발행, 문서 검증", status: "available" },
    ],
  },
  {
    phase: 7,
    phaseTitle: "마켓플레이스 — 만능 공구 사러 가기",
    lessons: [
      { id: "7-1", title: "공식 마켓플레이스 — Anthropic 직영 공구상", status: "available" },
      { id: "7-2", title: "커뮤니티 마켓 — 동네 철물점에서 보물 찾기", status: "available" },
      { id: "7-3", title: "MCP 서버 레지스트리 — 전문 장비 대여점", status: "available" },
      { id: "7-4", title: "나만의 공구함 꾸리기 — 실전 활용", status: "available" },
    ],
  },
  {
    phase: 8,
    phaseTitle: "MCP 서버로 업무 연동",
    lessons: [
      { id: "8-1", title: "MCP 서버란? 왜 노무사에게 필요한가", status: "available" },
      { id: "8-2", title: "Gmail 연동 — 의뢰인 이메일 자동 분류", status: "available" },
      { id: "8-3", title: "Google Calendar — 사건 기일 관리", status: "available" },
      { id: "8-4", title: "Notion 연동 — 사건 데이터베이스 구축", status: "available" },
    ],
  },
  {
    phase: 9,
    phaseTitle: "나만의 도구 만들기",
    lessons: [
      { id: "9-1", title: "HTML/CSS/JS 기초 — Claude가 알려주니까 쉬워요", status: "available" },
      { id: "9-2", title: "Next.js로 웹사이트 뚝딱 만들기", status: "available" },
      { id: "9-3", title: "Vercel 배포 — 내가 만든 서비스를 세상에", status: "available" },
      { id: "9-4", title: "실전: 노무 상담 접수 폼 만들어 배포하기", status: "available" },
    ],
  },
  {
    phase: 10,
    phaseTitle: "Worktree — 병렬 AI 코딩",
    lessons: [
      { id: "10-1", title: "Worktree란? — 여러 사건을 동시에 펼쳐놓기", status: "available" },
      { id: "10-2", title: "Worktree 실전 — claude --worktree로 시작하기", status: "available" },
      { id: "10-3", title: "자주 쓰는 명령어와 문제 해결", status: "available" },
      { id: "10-4", title: "노무사를 위한 Worktree 활용 시나리오", status: "available" },
    ],
  },
  {
    phase: 11,
    phaseTitle: "고급 활용과 자동화",
    lessons: [
      { id: "11-1", title: "리모트 컨트롤 — 폰에서도 Claude Code", status: "available" },
      { id: "11-2", title: "Claude Code on Web — 클라우드에서 자동화", status: "available" },
      { id: "11-3", title: "팀 워크플로우 — 사무실 전체가 AI와 협업", status: "available" },
      { id: "11-4", title: "전체 파이프라인 완성 — 스킬+코워크+MCP 통합", status: "available" },
    ],
  },
  {
    phase: 12,
    phaseTitle: "최신 기능 마스터하기",
    lessons: [
      { id: "12-1", title: "Auto Mode — AI에게 전권을 위임하기", status: "available" },
      { id: "12-2", title: "Dispatch — AI 비서 여러 명 동시 투입", status: "available" },
      { id: "12-3", title: "Computer Use — AI가 화면을 직접 조작하기", status: "available" },
      { id: "12-4", title: "Hooks — 이벤트 기반 자동화", status: "available" },
    ],
  },
  {
    phase: 13,
    phaseTitle: "영역 확장",
    lessons: [
      { id: "13-1", title: "클로드 디자인 × 힉스필드 — 카드뉴스·썸네일 자동 제작", status: "available" },
      { id: "13-2", title: "클로드 디자인: 노무 문서·카드뉴스 비주얼 만들기", status: "available" },
      { id: "13-3", title: "제2의 두뇌: 옵시디언 볼트 + Claude Code CLI 지식관리", status: "available" },
      { id: "13-4", title: "코덱스 모바일 vs Claude Code: 이동 중 AI 활용", status: "available" },
      { id: "13-5", title: "오픈소스 오케스트레이션 생태계 — 한동노무법인 AI팀 만들기", status: "available" },
      { id: "13-6", title: "마켓플레이스로 내 스킬·플러그인·에이전트 관리하기 (clone·pull·push)", status: "available" },
      { id: "13-7", title: "Opus 4.8, 노무사에게 무엇이 달라졌나", status: "available" },
      { id: "13-8", title: "다이나믹 워크플로우로 사건처리 자동화", status: "available" },
      { id: "13-9", title: "울트라코드와 effort control: 깊게 vs 빠르게", status: "available" },
    ],
  },
  {
    phase: 14,
    phaseTitle: "2026 최전선",
    lessons: [
      { id: "14-1", title: "Claude Fable 5 — Mythos급 최신 모델, 노무사에게 무엇이 달라졌나", status: "available" },
      { id: "14-2", title: "루프엔지니어링 — 프롬프트 치는 사람에서 루프 설계하는 사람으로", status: "available" },
    ],
  },
];

export default function LessonsPage() {
  return (
    <div>
      {/* Page header on ink band */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 mesh-aurora opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid-dark mask-radial opacity-55" aria-hidden="true" />
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
          <p className="eyebrow text-brand-300">LESSONS · 64 강의</p>
          <h1 className="display mt-4 text-4xl md:text-5xl">강의 목록</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65 balance">
            순서대로 따라가세요. 각 강의는 독립적이지만, 앞 단계를 먼저 보시면 더 잘 이해됩니다.
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#fbfbfe]" aria-hidden="true" />
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-12">
          {allLessons.map((group) => (
            <div key={group.phase}>
              <h2 className="mb-4 flex items-center gap-2.5 text-lg font-bold text-ink-900">
                <span className="rounded-full bg-brand-600 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                  Phase {group.phase}
                </span>
                {group.phaseTitle}
              </h2>
              <div className="space-y-2">
                {group.lessons.map((lesson) => (
                  <a
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
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-gradient relative mt-16 rounded-2xl bg-white p-8 text-center shadow-sm">
          <h3 className="text-lg font-bold text-ink-900">전체 14단계, 64개 강의</h3>
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
