const allLessons = [
  {
    phase: 1,
    phaseTitle: "AI 시대 이해하기",
    lessons: [
      { id: "1-1", title: "AI가 노무사 업무를 바꾸는 방식", status: "available" },
      { id: "1-2", title: "1M 컨텍스트의 의미 — 법령 전문을 통째로 읽는 AI", status: "available" },
      { id: "1-3", title: "ChatGPT vs Claude — 노무사에게 맞는 AI는?", status: "available" },
      { id: "1-4", title: "Claude Code란? 터미널에서 만나는 AI 파트너", status: "available" },
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
    phaseTitle: "MCP 서버로 업무 연동",
    lessons: [
      { id: "7-1", title: "MCP 서버란? 왜 노무사에게 필요한가", status: "available" },
      { id: "7-2", title: "Gmail 연동 — 의뢰인 이메일 자동 분류", status: "available" },
      { id: "7-3", title: "Google Calendar — 사건 기일 관리", status: "available" },
      { id: "7-4", title: "Notion 연동 — 사건 데이터베이스 구축", status: "available" },
    ],
  },
  {
    phase: 8,
    phaseTitle: "나만의 도구 만들기",
    lessons: [
      { id: "8-1", title: "HTML/CSS/JS 기초 — Claude가 알려주니까 쉬워요", status: "available" },
      { id: "8-2", title: "Next.js로 웹사이트 뚝딱 만들기", status: "available" },
      { id: "8-3", title: "Vercel 배포 — 내가 만든 서비스를 세상에", status: "available" },
      { id: "8-4", title: "실전: 노무 상담 접수 폼 만들어 배포하기", status: "available" },
    ],
  },
  {
    phase: 9,
    phaseTitle: "Worktree — 병렬 AI 코딩",
    lessons: [
      { id: "9-1", title: "Worktree란? — 여러 사건을 동시에 펼쳐놓기", status: "available" },
      { id: "9-2", title: "Worktree 실전 — claude --worktree로 시작하기", status: "available" },
      { id: "9-3", title: "자주 쓰는 명령어와 문제 해결", status: "available" },
      { id: "9-4", title: "노무사를 위한 Worktree 활용 시나리오", status: "available" },
    ],
  },
  {
    phase: 10,
    phaseTitle: "고급 활용과 자동화",
    lessons: [
      { id: "10-1", title: "리모트 컨트롤 — 폰에서도 Claude Code", status: "available" },
      { id: "10-2", title: "Claude Code on Web — 클라우드에서 자동화", status: "available" },
      { id: "10-3", title: "팀 워크플로우 — 사무실 전체가 AI와 협업", status: "available" },
      { id: "10-4", title: "전체 파이프라인 완성 — 스킬+코워크+MCP 통합", status: "available" },
    ],
  },
];

export default function LessonsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">강의 목록</h1>
        <p className="text-slate-500 text-lg">
          순서대로 따라가세요. 각 강의는 독립적이지만, 앞 단계를 먼저 보시면 더 잘 이해됩니다.
        </p>
      </div>

      <div className="space-y-10">
        {allLessons.map((group) => (
          <div key={group.phase}>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full">
                Phase {group.phase}
              </span>
              {group.phaseTitle}
            </h2>
            <div className="space-y-2">
              {group.lessons.map((lesson) => (
                <a
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-indigo-100 text-indigo-600">
                    {lesson.id}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-slate-700">{lesson.title}</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    수강 가능
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 text-center">
        <h3 className="text-lg font-bold mb-2">전체 10단계, 42개 강의</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Phase 1부터 순서대로 따라가시면 됩니다.
          <br />
          코딩 경험이 전혀 없어도 괜찮습니다. 함께 가봅시다!
        </p>
      </div>
    </div>
  );
}
