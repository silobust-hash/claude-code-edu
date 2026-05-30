import Link from "next/link";
import type { Metadata } from "next";
import { lessons } from "@/data/lessons";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";

export const metadata: Metadata = {
  title: "전체 커리큘럼",
  description: "클로드 코드 13단계 62강 전체 커리큘럼 — 터미널 기초부터 MCP·스킬·플러그인·웹앱 배포까지 비개발자용 단계별 학습 경로.",
  alternates: { canonical: "/curriculum" },
  openGraph: {
    title: "전체 커리큘럼 | 노무사 x Claude Code",
    description: "클로드 코드 13단계 62강 전체 커리큘럼 — 터미널 기초부터 MCP·스킬·플러그인·웹앱 배포까지 비개발자용 단계별 학습 경로.",
    url: `${SITE_URL}/curriculum`,
  },
};

const sortedLessons = Object.values(lessons).sort((a, b) => {
  const [ap, al] = String(a.id).split("-").map(Number);
  const [bp, bl] = String(b.id).split("-").map(Number);
  return ap - bp || al - bl;
});

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "클로드 코드 강의 커리큘럼",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: sortedLessons.length,
  itemListElement: sortedLessons.map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/lessons/${l.id}`,
    name: l.title,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "전체 커리큘럼", item: `${SITE_URL}/curriculum` },
  ],
};

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
      {
        title: "Claude 시각화 기능",
        desc: "대화만으로 차트, 다이어그램, 타임라인을 만듭니다. 임금 구조 분석 차트, 사건 경과 타임라인, 징계 절차 플로우차트 등 보고서에 바로 쓸 수 있는 시각 자료를 생성합니다.",
        tags: ["실습", "시각화", "NEW"],
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
  {
    phase: "Phase 12",
    title: "최신 기능 마스터하기",
    subtitle: "Auto Mode, Dispatch, Computer Use, Hooks",
    emoji: "🔮",
    duration: "약 4시간",
    color: "border-fuchsia-400",
    bgColor: "bg-fuchsia-50",
    lessons: [
      {
        title: "Auto Mode — AI에게 전권을 위임하기",
        desc: "확인 없이 AI가 알아서 코드를 작성하고 실행하는 자율 모드. 신뢰할 수 있는 작업에서 생산성을 극대화합니다.",
        tags: ["실습", "자동화", "NEW"],
      },
      {
        title: "Dispatch — AI 비서 여러 명 동시 투입",
        desc: "하나의 작업을 여러 Claude 에이전트가 나눠 처리하는 병렬 실행. 대규모 문서 분석이나 복합 프로젝트에 활용합니다.",
        tags: ["실습", "병렬처리", "NEW"],
      },
      {
        title: "Computer Use — AI가 화면을 직접 조작하기",
        desc: "웹 브라우저, 데스크톱 앱을 AI가 직접 클릭하고 입력합니다. 자동화가 어려웠던 GUI 작업도 AI에게 맡깁니다.",
        tags: ["실습", "GUI 자동화", "NEW"],
      },
      {
        title: "Hooks — 이벤트 기반 자동화",
        desc: "특정 이벤트(커밋, 파일 저장 등)가 발생하면 자동으로 스크립트를 실행합니다. CI/CD 파이프라인의 시작점.",
        tags: ["실습", "자동화", "NEW"],
      },
    ],
  },
  {
    phase: "Phase 13",
    title: "영역 확장",
    subtitle: "최신 모델·생태계·카드뉴스·마켓플레이스로 클로드코드 활용 영역 확장",
    emoji: "🚀",
    duration: "약 9시간",
    color: "border-cyan-400",
    bgColor: "bg-cyan-50",
    lessons: [
      {
        title: "클로드 디자인 × 힉스필드 — 카드뉴스·썸네일 자동 제작",
        desc: "클로드 디자인과 힉스필드를 연동하여 노무 콘텐츠용 카드뉴스와 썸네일을 자동으로 제작합니다.",
        tags: ["실습", "디자인", "NEW"],
      },
      {
        title: "클로드 디자인: 노무 문서·카드뉴스 비주얼 만들기",
        desc: "Claude Code로 노무 관련 문서와 카드뉴스에 쓸 비주얼 콘텐츠를 직접 디자인합니다.",
        tags: ["실습", "디자인"],
      },
      {
        title: "제2의 두뇌: 옵시디언 볼트 + Claude Code CLI 지식관리",
        desc: "옵시디언 볼트와 Claude Code CLI를 연동하여 노무사의 지식과 판례를 체계적으로 관리합니다.",
        tags: ["실습", "지식관리", "핵심"],
      },
      {
        title: "코덱스 모바일 vs Claude Code: 이동 중 AI 활용",
        desc: "스마트폰에서 코덱스 모바일과 Claude Code를 비교하며, 이동 중에도 AI 업무를 이어가는 방법을 배웁니다.",
        tags: ["실습", "모바일"],
      },
      {
        title: "오픈소스 오케스트레이션 생태계 — 한동노무법인 AI팀 만들기",
        desc: "오픈소스 도구로 여러 AI 에이전트를 조율하는 오케스트레이션 시스템을 구축합니다.",
        tags: ["실습", "오케스트레이션", "고급"],
      },
      {
        title: "마켓플레이스로 내 스킬·플러그인·에이전트 관리하기 (clone·pull·push)",
        desc: "마켓플레이스를 통해 스킬과 플러그인을 clone·pull·push하며 나만의 AI 도구함을 관리합니다.",
        tags: ["실습", "마켓플레이스"],
      },
      {
        title: "Opus 4.8, 노무사에게 무엇이 달라졌나",
        desc: "Claude Opus 4.8의 핵심 변화를 노무사 실무 관점에서 살펴봅니다. 코드 신뢰성·정직성 강화가 임금 계산·문서 작성에 미치는 영향을 확인합니다.",
        tags: ["개념 이해", "최신모델", "NEW"],
      },
      {
        title: "다이나믹 워크플로우로 사건처리 자동화",
        desc: "조건분기·반복·에러핸들링이 포함된 다이나믹 워크플로우로 복잡한 사건처리 파이프라인을 자동화합니다.",
        tags: ["실습", "자동화", "고급"],
      },
      {
        title: "울트라코드와 effort control: 깊게 vs 빠르게",
        desc: "Ultracode 모드와 effort control 설정으로 작업 깊이와 속도를 상황에 맞게 조절하는 방법을 배웁니다.",
        tags: ["실습", "고급", "핵심"],
      },
    ],
  },
];

// Static gradient literals (Tailwind v4 scans these at build time).
// Order matches the `curriculum` phases above.
const phaseRail = [
  "from-amber-400",
  "from-indigo-400",
  "from-emerald-400",
  "from-lime-400",
  "from-sky-400",
  "from-orange-400",
  "from-yellow-400",
  "from-blue-400",
  "from-rose-400",
  "from-teal-400",
  "from-violet-400",
  "from-fuchsia-400",
  "from-cyan-400",
];

export default function CurriculumPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Page header on ink band (sits under the dark nav) */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 mesh-aurora opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid-dark mask-radial opacity-55" aria-hidden="true" />
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
          <p className="eyebrow text-brand-300">CURRICULUM · 13 PHASES</p>
          <h1 className="display mt-4 text-4xl md:text-5xl">전체 커리큘럼</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65 balance">
            총 13단계, 약 59시간 분량의 교육 과정입니다.
            <br className="hidden sm:block" />
            순서대로 따라가면 코딩 경험 없이도 웹앱 배포까지 가능합니다.
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#fbfbfe]" aria-hidden="true" />
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-14">
          {curriculum.map((phase, i) => (
            <div key={i} className="relative pl-7">
              {/* gradient phase rail */}
              <div className={`absolute left-0 top-1.5 bottom-1 w-1 rounded-full bg-gradient-to-b ${phaseRail[i % phaseRail.length]} to-transparent`} />
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-2xl shadow-sm ring-1 ring-ink-200">
                  {phase.emoji}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-400">
                      {phase.phase}
                    </span>
                    <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-500">
                      {phase.duration}
                    </span>
                  </div>
                </div>
              </div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900">{phase.title}</h2>
              <p className="mt-1 text-ink-400">{phase.subtitle}</p>

              <div className="mt-6 space-y-3">
                {phase.lessons.map((lesson, j) => (
                  <div
                    key={j}
                    className="group rounded-2xl border border-ink-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-7 min-w-[2.6rem] place-items-center rounded-lg bg-brand-50 px-2 font-mono text-xs font-bold text-brand-600 ring-1 ring-brand-100">
                        {i + 1}.{j + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-bold text-ink-900">{lesson.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-500">{lesson.desc}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {lesson.tags.map((tag, k) => (
                            <span
                              key={k}
                              className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="border-gradient relative inline-block rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-lg font-bold text-ink-900">준비되셨나요?</p>
            <p className="mt-1.5 text-ink-500">Phase 1부터 차근차근 시작해봅시다.</p>
            <Link
              href="/lessons"
              className="btn-glow mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold text-white"
            >
              강의 시작하기
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
