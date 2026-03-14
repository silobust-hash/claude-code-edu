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
    ],
  },
  {
    phase: "Phase 2",
    title: "Claude Code 설치와 첫걸음",
    subtitle: "코딩 경험 제로에서 시작",
    emoji: "🚀",
    duration: "약 3시간",
    color: "border-indigo-400",
    bgColor: "bg-indigo-50",
    lessons: [
      {
        title: "터미널 여는 법부터",
        desc: "맥은 Terminal, 윈도우는 PowerShell. 검은 화면이 무섭지 않게, 차근차근 안내합니다.",
        tags: ["실습", "기초"],
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
    phase: "Phase 5",
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
    phase: "Phase 6",
    title: "고급 활용과 자동화",
    subtitle: "AI 노무사 워크플로우 완성",
    emoji: "🎯",
    duration: "약 4시간",
    color: "border-violet-400",
    bgColor: "bg-violet-50",
    lessons: [
      {
        title: "커스텀 슬래시 명령어",
        desc: "자주 쓰는 작업을 /임금계산, /취업규칙검토 같은 명령어로 만들어 한방에 실행합니다.",
        tags: ["실습", "자동화"],
      },
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
    ],
  },
];

export default function CurriculumPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">전체 커리큘럼</h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          총 6단계, 약 24시간 분량의 교육 과정입니다.
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
          <a
            href="/lessons"
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            강의 시작하기
          </a>
        </div>
      </div>
    </div>
  );
}
