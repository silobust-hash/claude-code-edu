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
      { id: "2-1", title: "맥/윈도우에 터미널 여는 법부터", status: "coming" },
      { id: "2-2", title: "Node.js 설치 — 복사 붙여넣기면 충분합니다", status: "coming" },
      { id: "2-3", title: "Claude Code 설치 & 로그인", status: "coming" },
      { id: "2-4", title: "첫 대화 — '안녕 클로드, 나는 노무사야'", status: "coming" },
    ],
  },
  {
    phase: 3,
    phaseTitle: "노무사 실무에 바로 쓰기",
    lessons: [
      { id: "3-1", title: "퇴직금·평균임금 자동 계산기 만들기", status: "coming" },
      { id: "3-2", title: "취업규칙 검토 자동화", status: "coming" },
      { id: "3-3", title: "진정서·구제신청서 초안 작성", status: "coming" },
      { id: "3-4", title: "판례 검색과 법리 분석 자동화", status: "coming" },
      { id: "3-5", title: "CLAUDE.md로 나만의 AI 비서 세팅하기", status: "coming" },
    ],
  },
  {
    phase: 4,
    phaseTitle: "MCP 서버로 업무 연동",
    lessons: [
      { id: "4-1", title: "MCP 서버란? 왜 노무사에게 필요한가", status: "coming" },
      { id: "4-2", title: "Gmail 연동 — 의뢰인 이메일 자동 분류", status: "coming" },
      { id: "4-3", title: "Google Calendar — 사건 기일 관리", status: "coming" },
      { id: "4-4", title: "Notion 연동 — 사건 데이터베이스 구축", status: "coming" },
    ],
  },
  {
    phase: 5,
    phaseTitle: "나만의 도구 만들기",
    lessons: [
      { id: "5-1", title: "HTML/CSS/JS 기초 — Claude가 알려주니까 쉬워요", status: "coming" },
      { id: "5-2", title: "Next.js로 웹사이트 뚝딱 만들기", status: "coming" },
      { id: "5-3", title: "Vercel 배포 — 내가 만든 서비스를 세상에", status: "coming" },
      { id: "5-4", title: "실전: 노무 상담 접수 폼 만들어 배포하기", status: "coming" },
    ],
  },
  {
    phase: 6,
    phaseTitle: "고급 활용과 자동화",
    lessons: [
      { id: "6-1", title: "커스텀 슬래시 명령어 만들기", status: "coming" },
      { id: "6-2", title: "리모트 컨트롤 — 폰에서도 Claude Code", status: "coming" },
      { id: "6-3", title: "Claude Code on Web — 클라우드에서 자동화", status: "coming" },
      { id: "6-4", title: "팀 워크플로우 — 사무실 전체가 AI와 협업", status: "coming" },
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
                <div
                  key={lesson.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    lesson.status === "available"
                      ? "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm cursor-pointer"
                      : "bg-slate-50 border-slate-100 opacity-60"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      lesson.status === "available"
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {lesson.id}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-slate-700">{lesson.title}</span>
                  </div>
                  {lesson.status === "available" ? (
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      수강 가능
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      준비 중
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 text-center">
        <p className="text-2xl mb-2">🚧</p>
        <h3 className="text-lg font-bold mb-2">콘텐츠를 열심히 만들고 있습니다</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Phase 1 강의부터 순차적으로 공개됩니다.
          <br />
          새 강의가 올라오면 이 페이지에서 확인하실 수 있습니다.
        </p>
      </div>
    </div>
  );
}
