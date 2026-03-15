import Link from "next/link";

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
    phase: "Phase 8",
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
    phase: "Phase 9",
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
];

const features = [
  {
    icon: "📚",
    title: "법령 통째로 이해",
    desc: "1M 컨텍스트로 근로기준법, 산안법, 중처법 전문을 한번에 읽고 분석합니다.",
  },
  {
    icon: "🧮",
    title: "계산은 코드로 검증",
    desc: "퇴직금, 연차수당, 평균임금 — 엑셀 대신 코드로 정확하게.",
  },
  {
    icon: "🎪",
    title: "스킬로 원클릭 자동화",
    desc: "/임금계산 한 번이면 끝. 복잡한 작업을 슬래시 명령어 하나로 실행합니다.",
  },
  {
    icon: "🤝",
    title: "코워크 & 플러그인",
    desc: "사건접수→분석→문서작성→검증까지, 플러그인으로 전문 파이프라인을 구축합니다.",
  },
  {
    icon: "💼",
    title: "엑셀·PPT·크롬에서도",
    desc: "터미널 없이도 OK. 익숙한 엑셀, PPT, 크롬 브라우저에서 바로 Claude를 씁니다.",
  },
  {
    icon: "📝",
    title: "문서 자동 생성",
    desc: "진정서, 의견서, 취업규칙 검토서를 AI와 함께 작성합니다.",
  },
  {
    icon: "🌐",
    title: "배포까지 한번에",
    desc: "코딩 경험 없이도 웹앱을 만들어 Vercel에 배포할 수 있습니다.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur rounded-full text-sm font-medium mb-6">
            1M 컨텍스트 시대의 AI 활용
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            코딩 몰라도 괜찮아요.
            <br />
            <span className="text-amber-300">Claude Code</span>가 있으니까.
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mb-10 leading-relaxed">
            19년차 노무사가 직접 만든 실무 교육 과정.
            <br />
            터미널 여는 법부터 웹앱 배포까지, 노무사의 일하는 방식을 바꿔보세요.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/curriculum"
              className="px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
            >
              커리큘럼 보기
            </Link>
            <Link
              href="/lessons"
              className="px-8 py-3.5 bg-white/15 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/25 transition-colors border border-white/20"
            >
              바로 시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">이런 노무사를 위해 만들었습니다</h2>
          <p className="text-slate-500 text-lg">
            &ldquo;AI 써보고 싶은데, 어디서부터 시작해야 할지 모르겠어요&rdquo;
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
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
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            1M 컨텍스트로 달라지는 노무사 업무
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">9단계 커리큘럼</h2>
          <p className="text-slate-500 text-lg">
            터미널을 처음 여는 순간부터, 나만의 웹서비스를 세상에 공개하는 날까지
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${course.color}`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{course.emoji}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {course.phase}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">{course.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{course.subtitle}</p>
                <ul className="space-y-2">
                  {course.lessons.map((lesson, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-indigo-400 mt-0.5 shrink-0">▸</span>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/curriculum"
            className="inline-block px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            전체 커리큘럼 자세히 보기
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">지금 시작해보세요</h2>
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
            코딩을 몰라도 됩니다. 터미널이 뭔지 몰라도 됩니다.
            <br />
            이 교육 과정이 처음부터 끝까지 함께합니다.
          </p>
          <Link
            href="/lessons"
            className="inline-block px-10 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-lg"
          >
            첫 번째 강의 시작
          </Link>
        </div>
      </section>
    </div>
  );
}
