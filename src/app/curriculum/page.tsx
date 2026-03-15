import Link from "next/link";

const curriculum = [
  {
    phase: "Phase 1",
    title: "AI 시대 이해하기",
    subtitle: "1M 컨텍스트가 뭐길래?",
    emoji: "🌅",
    duration: "약 2시간",
    color: "border-amber-400",
    bgColor: "bg-amber-50",
    lessons: [
      {
        title: "AI가 노무사 업무를 바꾸는 방식",
        desc: "단순 질문-답변을 넘어, AI가 실제 업무 프로세스에 들어오는 모습을 살펴봅니다.",
        tags: ["개념 이해", "사례 분석"],
      },
      {
        title: "1M 컨텍스트의 의미",
        desc: "근로기준법 전문(약 8만자)을 통째로 읽고 분석하는 AI. 이것이 왜 노무사에게 게임체인저인지 알아봅니다.",
        tags: ["핵심 개념", "실무 변화"],
      },
      {
        title: "ChatGPT vs Claude — 노무사에게 맞는 AI는?",
        desc: "각 AI의 강점과 한계를 노무사 실무 관점에서 비교합니다.",
        tags: ["비교 분석"],
      },
      {
        title: "Claude Code란?",
        desc: "웹 채팅이 아닌 터미널에서 동작하는 Claude Code. 파일을 읽고, 코드를 짜고, 명령을 실행하는 AI 파트너입니다.",
        tags: ["도구 소개"],
      },
      {
        title: "IT 용어 사전 — 개발자 말, 노무사 말로 번역하기",
        desc: "커밋, 레포, 배포, API, MCP, 스킬 등 50개+ IT 용어를 노무사 업무에 비유하여 정리합니다. 북마크 필수!",
        tags: ["참고", "핵심"],
      },
    ],
  },
  {
    phase: "Phase 2",
    title: "Claude Code 설치와 첫걸음",
    subtitle: "코딩 경험 제로에서 시작",
    emoji: "🚀",
    duration: "약 4시간",
    color: "border-indigo-400",
    bgColor: "bg-indigo-50",
    lessons: [
      {
        title: "터미널 여는 법부터",
        desc: "맥은 Terminal, 윈도우는 PowerShell. 검은 화면이 무섭지 않게, 차근차근 안내합니다.",
        tags: ["실습", "기초"],
      },
      {
        title: "터미널 기초 명령어 — 서류함 열고 닫듯이",
        desc: "pwd, ls, cd, mkdir 등 필수 명령어를 노무사 사무실의 서류 관리에 비유하며 익힙니다. 사건 폴더 만들고, 이동하고, 파일 확인하는 법.",
        tags: ["실습", "기초", "핵심"],
      },
      {
        title: "Node.js 설치",
        desc: "Claude Code를 실행하려면 Node.js가 필요합니다. 복사-붙여넣기 한 번이면 끝.",
        tags: ["실습", "설치"],
      },
      {
        title: "Claude Code 설치 & 로그인",
        desc: "npm install -g @anthropic-ai/claude-code 한 줄이면 설치 끝. 로그인하고 바로 시작합니다.",
        tags: ["실습", "설치"],
      },
      {
        title: "첫 대화 나누기",
        desc: "'안녕 클로드, 나는 노무사야.' 첫 인사부터 간단한 업무 요청까지 실습합니다.",
        tags: ["실습", "대화"],
      },
    ],
  },
  {
    phase: "Phase 3",
    title: "노무사 실무에 바로 쓰기",
    subtitle: "임금계산부터 문서작성까지",
    emoji: "⚡",
    duration: "약 5시간",
    color: "border-emerald-400",
    bgColor: "bg-emerald-50",
    lessons: [
      {
        title: "퇴직금·평균임금 자동 계산기 만들기",
        desc: "엑셀 함수 대신 Python 코드로 정확한 임금 계산. Claude Code가 코드를 짜줍니다.",
        tags: ["실습", "계산", "핵심"],
      },
      {
        title: "취업규칙 검토 자동화",
        desc: "취업규칙 파일을 Claude Code에 던지고, 근로기준법 위반 사항을 자동으로 잡아냅니다.",
        tags: ["실습", "문서 검토"],
      },
      {
        title: "진정서·구제신청서 초안 작성",
        desc: "사실관계를 정리하면, Claude Code가 법리 구조에 맞는 초안을 작성합니다.",
        tags: ["실습", "문서 작성"],
      },
      {
        title: "판례 검색과 법리 분석",
        desc: "웹 검색 기능으로 최신 판례를 찾고, 1M 컨텍스트로 판결문 전체를 분석합니다.",
        tags: ["실습", "리서치"],
      },
      {
        title: "CLAUDE.md로 나만의 AI 비서 세팅",
        desc: "노무사 전용 지시문을 작성하여 Claude Code를 내 업무 스타일에 맞게 커스터마이징합니다.",
        tags: ["실습", "설정", "핵심"],
      },
    ],
  },
  {
    phase: "Phase 4",
    title: "업무 도구 속의 Claude",
    subtitle: "엑셀, PPT, 크롬에서 바로 쓰기",
    emoji: "💼",
    duration: "약 4시간",
    color: "border-lime-400",
    bgColor: "bg-lime-50",
    lessons: [
      {
        title: "Claude in Excel",
        desc: "엑셀 안에서 AI를 쓴다? 임금대장 분석, 4대보험 계산, 데이터 정리를 셀 안에서 바로 처리합니다. 복잡한 함수 대신 자연어로 요청하세요.",
        tags: ["실습", "엑셀", "핵심"],
      },
      {
        title: "Claude in PPT",
        desc: "노무관리 교육 슬라이드, 산업안전 보건교육 자료, 사업주 대상 프레젠테이션을 AI와 함께 만듭니다. 내용 구성부터 디자인까지.",
        tags: ["실습", "프레젠테이션"],
      },
      {
        title: "Claude for Chrome",
        desc: "크롬 브라우저에서 판례 검색 중 바로 요약, 법령 조문 해석, 웹페이지 번역까지. 별도 앱 없이 브라우저만으로 AI를 활용합니다.",
        tags: ["실습", "브라우저", "핵심"],
      },
      {
        title: "실전: 노무사 일상 업무에 통합하기",
        desc: "임금대장(Excel) 분석 → 교육자료(PPT) 생성 → 판례 검색(Chrome) 요약까지, 하루 업무를 AI와 함께 처리하는 실습.",
        tags: ["실습", "프로젝트"],
      },
    ],
  },
  {
    phase: "Phase 5",
    title: "스킬 — Claude의 핵심 기능",
    subtitle: "슬래시 한 번으로 전문가 모드 ON",
    emoji: "🎪",
    duration: "약 4시간",
    color: "border-sky-400",
    bgColor: "bg-sky-50",

    lessons: [
      {
        title: "스킬이란?",
        desc: "/명령어 하나로 복잡한 작업을 자동 실행하는 Claude Code의 핵심 기능. 채팅으로 일일이 설명하지 않아도, 미리 정의된 전문 프롬프트가 즉시 동작합니다.",
        tags: ["개념 이해", "핵심"],
      },
      {
        title: "빌트인 스킬 마스터하기",
        desc: "/commit으로 커밋, /review-pr로 코드 리뷰 — Claude Code에 기본 탑재된 스킬들을 하나씩 실습합니다.",
        tags: ["실습", "기초"],
      },
      {
        title: "커스텀 스킬 만들기",
        desc: "나만의 /임금계산, /취업규칙검토, /판례검색 스킬을 직접 만듭니다. 마크다운 파일 하나면 끝.",
        tags: ["실습", "자동화", "핵심"],
      },
      {
        title: "스킬 체이닝과 파이프라인",
        desc: "여러 스킬을 연결하여 '사건접수 → 분석 → 문서작성' 같은 자동화 파이프라인을 구축합니다.",
        tags: ["실습", "고급"],
      },
    ],
  },
  {
    phase: "Phase 6",
    title: "코워크 & 플러그인",
    subtitle: "AI 협업 시스템의 꽃",
    emoji: "🤝",
    duration: "약 5시간",
    color: "border-orange-400",
    bgColor: "bg-orange-50",
    lessons: [
      {
        title: "코워크란?",
        desc: "단순히 AI에게 '시키는' 것이 아니라, AI와 '함께 일하는' 방식. Claude Code를 팀원처럼 활용하는 협업 철학과 실전 방법론을 배웁니다.",
        tags: ["개념 이해", "핵심"],
      },
      {
        title: "플러그인의 개념과 구조",
        desc: "플러그인은 특정 전문 분야를 위한 AI 확장 모듈입니다. CLAUDE.md에 전문 지시를 담아, Claude를 노동법 전문가·산업안전 전문가로 변신시킵니다.",
        tags: ["개념 이해", "구조"],
      },
      {
        title: "노무사 실전 플러그인 활용",
        desc: "사건접수 라우팅, 노동법 분석 파이프라인, 산업안전 점검, 중대재해 긴급대응, 직장내 괴롭힘 처리 — 실제 노무사 업무별 플러그인을 체험합니다.",
        tags: ["실습", "실무", "핵심"],
      },
      {
        title: "나만의 플러그인 설계하기",
        desc: "우리 사무실 업무 흐름에 맞는 플러그인을 직접 설계합니다. 진단 → 전략 → 산출물 파이프라인을 커스텀으로 구축합니다.",
        tags: ["실습", "프로젝트"],
      },
      {
        title: "플러그인 조합과 코워크 워크플로우",
        desc: "여러 플러그인을 조합하여 4대 법률 통합 자문, 블로그 자동 발행, 법률문서 교차 검증 등 고급 워크플로우를 완성합니다.",
        tags: ["실습", "고급"],
      },
    ],
  },
  {
    phase: "Phase 7",
    title: "마켓플레이스 — 만능 공구 사러 가기",
    subtitle: "공식·커뮤니티·MCP 마켓 총정리",
    emoji: "🧰",
    duration: "약 4시간",
    color: "border-yellow-400",
    bgColor: "bg-yellow-50",
    lessons: [
      {
        title: "공식 마켓플레이스",
        desc: "Anthropic 직영 공구상. /plugin → Discover로 접근. GitHub, Notion, Vercel 등 검증된 플러그인을 설치합니다.",
        tags: ["실습", "핵심"],
      },
      {
        title: "커뮤니티 마켓플레이스",
        desc: "Build with Claude(489+), Awesome Skills 등 동네 철물점에서 보물 찾기. 500개 이상의 커뮤니티 스킬을 탐색합니다.",
        tags: ["실습", "탐색"],
      },
      {
        title: "MCP 서버 레지스트리",
        desc: "전문 장비 대여점. Gmail, Calendar, Notion 등 외부 서비스 연동을 위한 MCP 서버를 검색하고 설치합니다.",
        tags: ["실습", "연동"],
      },
      {
        title: "나만의 공구함 꾸리기",
        desc: "노무사 필수 공구 세트 큐레이션, 사무실 전용 마켓플레이스 만들기, 보안 체크리스트까지.",
        tags: ["실습", "프로젝트"],
      },
    ],
  },
  {
    phase: "Phase 8",
    title: "MCP 서버로 업무 연동",

    subtitle: "Gmail, 캘린더, 노션 한방에",
    emoji: "🔗",
    duration: "약 4시간",
    color: "border-blue-400",
    bgColor: "bg-blue-50",
    lessons: [
      {
        title: "MCP 서버란?",
        desc: "Model Context Protocol — AI가 외부 서비스를 직접 사용할 수 있게 하는 기술입니다.",
        tags: ["개념 이해"],
      },
      {
        title: "Gmail 연동",
        desc: "의뢰인 이메일을 자동으로 분류하고, 회신 초안을 작성하는 워크플로우를 만듭니다.",
        tags: ["실습", "연동"],
      },
      {
        title: "Google Calendar 연동",
        desc: "사건 기일, 상담 일정, 교육 스케줄을 AI가 관리합니다.",
        tags: ["실습", "연동"],
      },
      {
        title: "Notion 연동",
        desc: "사건 데이터베이스를 구축하고, Claude Code에서 바로 조회·업데이트합니다.",
        tags: ["실습", "연동"],
      },
    ],
  },
  {
    phase: "Phase 9",
    title: "나만의 도구 만들기",
    subtitle: "코딩 제로에서 웹앱 배포까지",
    emoji: "🛠️",
    duration: "약 6시간",
    color: "border-rose-400",
    bgColor: "bg-rose-50",
    lessons: [
      {
        title: "HTML/CSS/JS 기초",
        desc: "웹페이지의 뼈대(HTML), 옷(CSS), 동작(JS). Claude가 알려주니까 쉬워요.",
        tags: ["개념", "기초"],
      },
      {
        title: "Next.js로 웹사이트 만들기",
        desc: "리액트 기반 프레임워크로 전문적인 웹사이트를 Claude Code와 함께 만듭니다.",
        tags: ["실습", "개발"],
      },
      {
        title: "Vercel 배포",
        desc: "만든 웹사이트를 인터넷에 공개합니다. git push 한 번이면 자동 배포.",
        tags: ["실습", "배포"],
      },
      {
        title: "실전: 노무 상담 접수 폼",
        desc: "실제로 사용할 수 있는 온라인 상담 접수 폼을 처음부터 끝까지 만들어 배포합니다.",
        tags: ["실습", "프로젝트", "핵심"],
      },
    ],
  },
  {
    phase: "Phase 10",
    title: "Worktree — 병렬 AI 코딩",
    subtitle: "여러 사건을 동시에 처리하는 비법",
    emoji: "🌳",
    duration: "약 4시간",
    color: "border-teal-400",
    bgColor: "bg-teal-50",
    lessons: [
      {
        title: "Worktree란?",
        desc: "같은 프로젝트를 여러 책상에 동시에 펼쳐놓는 개념. 한 번에 하나씩만 작업하던 제약에서 벗어나 병렬로 여러 사건을 처리합니다.",
        tags: ["개념 이해", "핵심"],
      },
      {
        title: "Worktree 실전",
        desc: "claude --worktree 명령어로 병렬 작업 공간을 만들고, 부당해고+임금체불+취업규칙 3건을 동시에 처리하는 실습.",
        tags: ["실습", "핵심"],
      },
      {
        title: "명령어와 문제 해결",
        desc: "자주 쓰는 워크트리 명령어 모음, 터미널 출력 읽는 법, 흔한 오류 해결법을 정리합니다.",
        tags: ["실습", "참고"],
      },
      {
        title: "노무사 활용 시나리오",
        desc: "3건 사건 동시 처리, 웹사이트+블로그 동시 개발, 따라하기 실습까지 실전 활용법을 배웁니다.",
        tags: ["실습", "프로젝트"],
      },
    ],
  },
  {
    phase: "Phase 11",
    title: "고급 활용과 자동화",
    subtitle: "AI 노무사 워크플로우 완성",
    emoji: "🎯",
    duration: "약 4시간",
    color: "border-violet-400",
    bgColor: "bg-violet-50",
    lessons: [
      {
        title: "리모트 컨트롤",
        desc: "폰에서도 Claude Code! 이동 중에도 AI와 협업하는 방법을 배웁니다.",
        tags: ["실습", "모바일"],
      },
      {
        title: "Claude Code on Web",
        desc: "클라우드에서 자동으로 작업을 돌리고, 결과만 받아보는 방법.",
        tags: ["실습", "클라우드"],
      },
      {
        title: "팀 워크플로우",
        desc: "사무실 전체가 AI와 함께 일하는 시스템을 구축합니다.",
        tags: ["전략", "팀"],
      },
      {
        title: "전체 파이프라인 완성",
        desc: "스킬 + 코워크 플러그인 + MCP 서버를 통합하여, 노무사 사무실의 완전한 AI 워크플로우를 구축합니다.",
        tags: ["실습", "통합", "핵심"],
      },
    ],
  },
];

export default function CurriculumPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">전체 커리큘럼</h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          총 11단계, 약 46시간 분량의 교육 과정입니다.
          <br />
          순서대로 따라가면 코딩 경험 없이도 웹앱 배포까지 가능합니다.
        </p>
      </div>

      <div className="space-y-12">
        {curriculum.map((phase, i) => (
          <div key={i} className={`border-l-4 ${phase.color} pl-6`}>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl">{phase.emoji}</span>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {phase.phase}
                </span>
                <span className="text-xs text-slate-400 ml-3">{phase.duration}</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-1">{phase.title}</h2>
            <p className="text-slate-400 mb-6">{phase.subtitle}</p>

            <div className="space-y-4">
              {phase.lessons.map((lesson, j) => (
                <div
                  key={j}
                  className={`${phase.bgColor} rounded-xl p-5 hover:shadow-sm transition-shadow`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold mb-1">
                        <span className="text-slate-400 mr-2 text-sm">
                          {i + 1}.{j + 1}
                        </span>
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{lesson.desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {lesson.tags.map((tag, k) => (
                      <span
                        key={k}
                        className="text-xs px-2.5 py-1 bg-white/80 rounded-full text-slate-500 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-block bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
          <p className="text-lg font-semibold mb-2">준비되셨나요?</p>
          <p className="text-slate-500 mb-6">Phase 1부터 차근차근 시작해봅시다.</p>
          <Link
            href="/lessons"
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            강의 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
}
