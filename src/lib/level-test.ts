export type LevelTestArea = "concept" | "tool" | "practice" | "safety";

export type LevelTestProfileType =
  | "입문형"
  | "실무준비형"
  | "자동화실행형"
  | "설계·운영형";

export interface LevelTestQuestionOption {
  value: number;
  label: string;
}

export interface LevelTestQuestion {
  id: string;
  text: string;
  area: LevelTestArea;
  options: LevelTestQuestionOption[];
  safetyGate?: boolean;
  section: string;
}

export interface LevelTestScoreArea {
  score: number;
  maxScore: number;
  percentage: number;
  weightedScore: number;
}

export interface LevelTestResult {
  totalScore: number;
  maxTotalScore: number;
  totalPercentage: number;
  areas: {
    concept: LevelTestScoreArea;
    tool: LevelTestScoreArea;
    practice: LevelTestScoreArea;
    safety: LevelTestScoreArea;
  };
  type: LevelTestProfileType;
  safetyFundamentalsRequired: boolean;
  recommendations: {
    links: Array<{ label: string; href: string; site: "ai-school" | "edu" | "edu-internal" }>;
  };
  practice: {
    focusArea: LevelTestArea;
    focusLabel: string;
    links: Array<{ label: string; href: string; site: "ai-school" | "edu" | "edu-internal" }>;
  };
}

export interface LevelTestAnswers {
  [id: string]: number;
}

export const AREA_WEIGHTS: Record<LevelTestArea, number> = {
  concept: 25,
  tool: 25,
  practice: 30,
  safety: 20,
};

export const TOTAL_QUESTIONS = 20;

export const LEVEL_TEST_QUESTIONS: LevelTestQuestion[] = [
  {
    id: "c-01",
    section: "개념 이해",
    area: "concept",
    text: "[가상 교육안] ‘다음 주 신입 교육 안내’를 만들려 합니다. 목적·독자·자료 범위가 아직 정해지지 않았습니다. AI에 가장 먼저 줄 질문으로 적절한 것은?",
    options: [
      { value: 0, label: "교육 안내문을 멋지게 써줘." },
      { value: 1, label: "신입 교육 안내문을 써줘. 길이는 알아서 정해줘." },
      { value: 2, label: "신입 교육 안내문을 1쪽으로 작성해줘. 대상은 신입으로 하고, 마감일처럼 없는 정보는 빈칸으로 표시해줘." },
      { value: 3, label: "교육 목적·독자·확인된 자료·마감일을 먼저 묻고, 1쪽 안내문 초안을 작성해줘. 불명확한 정보는 추정하지 말아줘." },
    ],
  },
  {
    id: "c-02",
    section: "개념 이해",
    area: "concept",
    text: "[가상 업무 메모] ‘금요일까지 초안 제출’만 확인됐고 참석 인원과 최종 배포일은 비어 있습니다. AI가 일정표 초안을 냈습니다. 다음 행동으로 가장 적절한 것은?",
    options: [
      { value: 0, label: "AI가 채운 날짜를 사실로 보고 바로 공유한다." },
      { value: 1, label: "일단 일정표를 공유하고 나중에 틀리면 고친다." },
      { value: 2, label: "확인된 금요일 마감만 표시하고, 빈 정보는 추정값이라고 적는다." },
      { value: 3, label: "확인된 사실과 미확인 정보를 구분한 뒤, 참석 인원과 최종 배포일을 담당자에게 후속 질문한다." },
    ],
  },
  {
    id: "c-03",
    section: "개념 이해",
    area: "concept",
    text: "[가상 안내문] ‘교육은 금요일까지 초안을 제출한다. 참석 인원은 다음 회의에서 확정한다.’라는 원문을 읽었습니다. 아래 문장 중 원문 사실과 아직 알 수 없는 내용을 가장 분명하게 구분한 것은?",
    options: [
      { value: 0, label: "참석 인원은 20명이다." },
      { value: 1, label: "참석 인원은 곧 확정될 것이다." },
      { value: 2, label: "참석 인원은 아직 미확정이므로 다음 회의에서 정해질 수 있다." },
      { value: 3, label: "[확인된 사실] 초안 마감은 금요일이다. [확인된 사실] 참석 인원은 다음 회의에서 확정한다. [추정 금지] 인원수와 확정일은 원문만으로 알 수 없다." },
    ],
  },
  {
    id: "c-04",
    section: "개념 이해",
    area: "concept",
    text: "[가상 요약] 원문에는 ‘초안은 금요일까지 제출’과 ‘참석 인원은 다음 회의에서 확정’이 있습니다. ‘교육은 금요일에 확정된 20명에게 배포된다’는 요약을 검토할 때 가장 큰 문제는?",
    options: [
      { value: 0, label: "문장이 짧아서 읽기 어렵다." },
      { value: 1, label: "금요일이라는 기한이 들어 있으므로 그대로 써도 된다." },
      { value: 2, label: "초안 제출과 최종 배포를 구분하지 않았을 수 있다." },
      { value: 3, label: "원문에 없는 ‘20명’과 ‘금요일 배포’를 사실처럼 넣어, 미확정 정보와 예외를 누락했다." },
    ],
  },
  {
    id: "c-05",
    section: "개념 이해",
    area: "concept",
    text: "[가상 비교 결과] 새 모델은 일정표 초안이 더 매끄럽지만, 원문에 없던 배포일을 두 번 단정했습니다. 기존 모델은 문장은 투박하지만 미확정 정보를 질문으로 남겼습니다. 다음 판단으로 가장 적절한 것은?",
    options: [
      { value: 0, label: "새 모델이 더 최신이므로 그대로 전면 도입한다." },
      { value: 1, label: "두 결과 모두 쓸 수 없으니 비교를 중단한다." },
      { value: 2, label: "기존 모델만 계속 쓰고 새 모델은 다시 보지 않는다." },
      { value: 3, label: "새 모델의 문장 장점은 기록하되, 근거 누락 원인을 더 시험한 뒤 이 과제에서는 기존 모델을 유지하거나 새 모델 사용을 보류한다." },
    ],
  },
  {
    id: "t-01",
    section: "도구 숙련",
    area: "tool",
    text: "개인 장비에서 가장 먼저 점검할 것은?",
    options: [
      { value: 0, label: "브라우저 즐겨찾기 정리" },
      { value: 1, label: "작업 폴더와 백업 원칙" },
      { value: 2, label: "명령어별 실행 로그 보관 규칙" },
      { value: 3, label: "버전관리, 권한, 비밀값 분리 전략" },
    ],
  },
  {
    id: "t-02",
    section: "도구 숙련",
    area: "tool",
    text: "슬래시 명령어를 사용할 때 가장 좋은 습관은?",
    options: [
      { value: 0, label: "결과만 빠르게 확인하고 기록하지 않기" },
      { value: 1, label: "출력물을 바로 클라이언트에 복붙" },
      { value: 2, label: "작업 의도·입력·결과를 메모" },
      { value: 3, label: "명령어, 파라미터, 검증 항목까지 함께 기록" },
    ],
  },
  {
    id: "t-03",
    section: "도구 숙련",
    area: "tool",
    text: "문서에서 반복 작업을 줄이는 방법으로 올바른 것은?",
    options: [
      { value: 0, label: "매번 새로운 방식으로 수동 처리" },
      { value: 1, label: "작업 일지를 최소화" },
      { value: 2, label: "스크립트를 흩어져서 관리" },
      { value: 3, label: "템플릿·체크리스트·검증 스크립트 결합" },
    ],
  },
  {
    id: "t-04",
    section: "도구 숙련",
    area: "tool",
    text: "MCP 연동에서 가장 먼저 확인할 값은?",
    options: [
      { value: 0, label: "아이콘 색상" },
      { value: 1, label: "UI 반응 속도" },
      { value: 2, label: "권한 범위와 호출 주기" },
      { value: 3, label: "라이브러리 버전과 에러 코드 처리 정책" },
    ],
  },
  {
    id: "t-05",
    section: "도구 숙련",
    area: "tool",
    text: "버전 변경 후 회귀 위험을 줄이는 기본은?",
    options: [
      { value: 0, label: "바로 운영 반영" },
      { value: 1, label: "동일 명령만 반복 실행" },
      { value: 2, label: "변경사항 기록 및 롤백 기준 마련" },
      { value: 3, label: "테스트 시나리오와 기대값 고정" },
    ],
  },
  {
    id: "p-01",
    section: "업무 적용",
    area: "practice",
    text: "실무 사건 접수 흐름을 AI로 먼저 개선할 순서는?",
    options: [
      { value: 0, label: "문서 작성만 자동화" },
      { value: 1, label: "접수 항목을 표준화해 기본 누락을 줄인다." },
      { value: 2, label: "접수-분류-작업리스트를 연결해 처리 흐름을 정렬한다." },
      { value: 3, label: "근로기준·내부절차를 함께 매핑" },
    ],
  },
  {
    id: "p-02",
    section: "업무 적용",
    area: "practice",
    text: "퇴직금 사건에서 가장 먼저 구축해야 하는 자동화 산출물은?",
    options: [
      { value: 0, label: "최종 의견서 자동 발송" },
      { value: 1, label: "필요한 입력값 목록만 먼저 정리한다." },
      { value: 2, label: "입력값 점검표와 계산 로그를 남긴다." },
      { value: 3, label: "입력값 점검표·계산 로그에 예외 반려 사유와 검수 증적까지 연결한다." },
    ],
  },
  {
    id: "p-03",
    section: "업무 적용",
    area: "practice",
    text: "[가상 업무보고] AI가 작성한 교육 운영안을 팀장에게 설명해야 합니다. 판단을 실제로 소유하고 있는지 확인하는 준비로 가장 적절한 것은?",
    options: [
      { value: 0, label: "AI가 만든 원고를 그대로 외워서 읽는다." },
      { value: 1, label: "결론만 한 문장으로 외우고 질문은 받지 않는다." },
      { value: 2, label: "결론과 핵심 근거는 말할 수 있지만, 반론이나 조건 변화는 준비하지 않는다." },
      { value: 3, label: "결론 1문장·핵심 근거·반론 또는 한계·판단을 바꿀 조건을 자기 언어로 30초 설명해 본다." },
    ],
  },
  {
    id: "p-04",
    section: "업무 적용",
    area: "practice",
    text: "업무 리스크 대응을 위한 최우선 설계는?",
    options: [
      { value: 0, label: "자동 발송 강화를 최우선" },
      { value: 1, label: "검토자의 중간 승인 단계 추가" },
      { value: 2, label: "실패 시 정지/재실행 플랜 설계" },
      { value: 3, label: "권한·감사 추적·백업 동반 설계" },
    ],
  },
  {
    id: "p-05",
    section: "업무 적용",
    area: "practice",
    text: "새 모델 도입을 검토합니다. 이름이나 광고 문구 대신, 비식별 가상 과제로 우선 확인할 기준으로 가장 적절한 것은?",
    options: [
      { value: 0, label: "모델 이름이 새로우면 기존 절차 없이 전체 업무에 적용한다." },
      { value: 1, label: "답변이 더 길고 자연스러운지만 비교한다." },
      { value: 2, label: "같은 질문을 한 번씩 던져 보고 마음에 드는 쪽을 고른다." },
      { value: 3, label: "같은 비식별 과제에서 근거 표시·누락·수정 횟수·시간·계정별 접근 조건을 기록해 비교한다." },
    ],
  },
  {
    id: "s-01",
    section: "검증·보안습관",
    area: "safety",
    text: "의뢰인 민감정보를 처리할 때 최소한의 방법은?",
    options: [
      { value: 0, label: "요약만 남기고 원문 삭제" },
      { value: 1, label: "암호화 없이 임시 노트에 저장" },
      { value: 2, label: "필요 항목만 마스킹·접근 제한" },
      { value: 3, label: "보관/열람권한·마스킹·삭제주기 운영" },
    ],
    safetyGate: true,
  },
  {
    id: "s-02",
    section: "검증·보안습관",
    area: "safety",
    text: "법률 근거를 AI로 생성할 때 바른 방식은?",
    options: [
      { value: 0, label: "추정 근거로 즉시 발송" },
      { value: 1, label: "출처 누락 가능 시 유의" },
      { value: 2, label: "관련 조문 후보를 함께 기록" },
      { value: 3, label: "조문/판례/행정해석 검증 후 공유" },
    ],
    safetyGate: true,
  },
  {
    id: "s-03",
    section: "검증·보안습관",
    area: "safety",
    text: "외부로 문서를 발송하기 전 반드시 해야 할 것은?",
    options: [
      { value: 0, label: "AI 초안과 같으면 즉시 발송" },
      { value: 1, label: "발송 채널만 바꿔 기록 없이 전송" },
      { value: 2, label: "수임인의 최종 검토와 승인 처리" },
      { value: 3, label: "검토자 점검, 버전관리, 승인 로그 남기기" },
    ],
    safetyGate: true,
  },
  {
    id: "s-04",
    section: "검증·보안습관",
    area: "safety",
    text: "사전 동의가 필요한 외부 수집 시 가장 적절한 조치는?",
    options: [
      { value: 0, label: "필요 없으면 무조건 수집" },
      { value: 1, label: "사후 통지만 하고 계속 진행" },
      { value: 2, label: "동의 내역과 목적 저장" },
      { value: 3, label: "수집 범위 축소, 동의근거·보관기한 명시" },
    ],
  },
  {
    id: "s-05",
    section: "검증·보안습관",
    area: "safety",
    text: "보안 사고 시 가장 먼저 해야 할 대응은?",
    options: [
      { value: 0, label: "일단 외부 공유를 늘려 조치 추적" },
      { value: 1, label: "증적을 남기지 않고 서비스부터 복구한다." },
      { value: 2, label: "접근 제한과 복구는 시작하지만 증적 보존과 원인 분석은 빠뜨린다." },
      { value: 3, label: "접근 제한·증적 보존 → 원인 분석 → 복구와 재발 방지 절차 순서로 대응한다." },
    ],
  },
];

const DEFAULT_MAX_PER_QUESTION = 3;

const MAX_BY_AREA: Record<LevelTestArea, number> = {
  concept: 5 * DEFAULT_MAX_PER_QUESTION,
  tool: 5 * DEFAULT_MAX_PER_QUESTION,
  practice: 5 * DEFAULT_MAX_PER_QUESTION,
  safety: 5 * DEFAULT_MAX_PER_QUESTION,
};

const TYPE_THRESHOLDS: Array<{
  type: LevelTestProfileType;
  min: number;
}> = [
  { type: "입문형", min: 0 },
  { type: "실무준비형", min: 55 },
  { type: "자동화실행형", min: 72 },
  { type: "설계·운영형", min: 87 },
];

const RECOMMENDATIONS_BY_TYPE: Record<
  LevelTestProfileType,
  Array<{ label: string; href: string; site: "ai-school" | "edu" | "edu-internal" }>
> = {
  입문형: [
    { label: "AI업무학교 1-1", href: "https://ai-school.silronomu.com/lessons/1-1", site: "ai-school" },
    { label: "AI업무학교 1-3", href: "https://ai-school.silronomu.com/lessons/1-3", site: "ai-school" },
    { label: "AI업무학교 2-1", href: "https://ai-school.silronomu.com/lessons/2-1", site: "ai-school" },
  ],
  실무준비형: [
    { label: "AI업무학교 2-1", href: "https://ai-school.silronomu.com/lessons/2-1", site: "ai-school" },
    { label: "AI업무학교 3-2", href: "https://ai-school.silronomu.com/lessons/3-2", site: "ai-school" },
    { label: "edu 1-4", href: "/lessons/1-4", site: "edu-internal" },
    { label: "edu 2-1", href: "/lessons/2-1", site: "edu-internal" },
  ],
  자동화실행형: [
    { label: "edu 5-1", href: "/lessons/5-1", site: "edu-internal" },
    { label: "edu 6-1", href: "/lessons/6-1", site: "edu-internal" },
    { label: "edu 8-1", href: "/lessons/8-1", site: "edu-internal" },
    { label: "edu 12-1", href: "/lessons/12-1", site: "edu-internal" },
  ],
  설계·운영형: [
    { label: "edu 13-1", href: "/lessons/13-1", site: "edu-internal" },
    { label: "edu 14-1", href: "/lessons/14-1", site: "edu-internal" },
    { label: "edu 15-1", href: "/lessons/15-1", site: "edu-internal" },
    { label: "edu 15-6", href: "/lessons/15-6", site: "edu-internal" },
    { label: "edu 16-1", href: "/lessons/16-1", site: "edu-internal" },
  ],
};

const SAFETY_FOUNDATION_LINKS: Array<{ label: string; href: string; site: "ai-school" | "edu" | "edu-internal" }> = [
  { label: "AI업무학교 1-3", href: "https://ai-school.silronomu.com/lessons/1-3", site: "ai-school" },
  { label: "edu 1-1", href: "/lessons/1-1", site: "edu-internal" },
  { label: "edu 3-4", href: "/lessons/3-4", site: "edu-internal" },
];
const SAFETY_QUESTION_IDS = LEVEL_TEST_QUESTIONS.filter((question) => question.safetyGate).map(
  (question) => question.id,
);
const SAFETY_GATE_ZERO_THRESHOLD = 0;

const MAX_RECOMMENDATION_LINKS = 5;

const AREA_PRACTICE_LINKS: Record<
  LevelTestArea,
  Array<{ label: string; href: string; site: "ai-school" | "edu" | "edu-internal" }>
> = {
  concept: [
    { label: "edu 14-1", href: "/lessons/14-1", site: "edu-internal" },
    { label: "edu 16-4", href: "/lessons/16-4", site: "edu-internal" },
  ],
  tool: [
    { label: "AI업무학교 2-1", href: "https://ai-school.silronomu.com/lessons/2-1", site: "ai-school" },
    { label: "edu 2-1", href: "/lessons/2-1", site: "edu-internal" },
  ],
  practice: [
    { label: "edu 9-1", href: "/lessons/9-1", site: "edu-internal" },
    { label: "edu 15-1", href: "/lessons/15-1", site: "edu-internal" },
  ],
  safety: [
    { label: "AI업무학교 1-3", href: "https://ai-school.silronomu.com/lessons/1-3", site: "ai-school" },
    { label: "edu 3-4", href: "/lessons/3-4", site: "edu-internal" },
  ],
};

const AREA_PRACTICE_LABELS: Record<LevelTestArea, string> = {
  concept: "질문·근거 읽기",
  tool: "도구 실행 기록",
  practice: "업무 적용 설계",
  safety: "검증·보안 판단",
};

function buildRecommendationLinks(
  type: LevelTestProfileType,
  safetyFundamentalsRequired: boolean
): Array<{ label: string; href: string; site: "ai-school" | "edu" | "edu-internal" }> {
  const links: Array<{ label: string; href: string; site: "ai-school" | "edu" | "edu-internal" }> = [];

  const addUnique = (nextLinks: Array<{ label: string; href: string; site: "ai-school" | "edu" | "edu-internal" }>) => {
    for (const link of nextLinks) {
      if (links.length >= MAX_RECOMMENDATION_LINKS) break;
      if (!links.some((existing) => existing.href === link.href)) {
        links.push(link);
      }
    }
  };

  if (safetyFundamentalsRequired) {
    addUnique(SAFETY_FOUNDATION_LINKS);
  }

  addUnique(RECOMMENDATIONS_BY_TYPE[type]);
  return links.slice(0, MAX_RECOMMENDATION_LINKS);
}

function buildPracticePlan(
  areas: LevelTestResult["areas"],
): LevelTestResult["practice"] {
  const focusArea = (Object.entries(areas) as Array<[LevelTestArea, LevelTestScoreArea]>)
    .sort(([, first], [, second]) => first.percentage - second.percentage)[0]?.[0] ?? "concept";

  return {
    focusArea,
    focusLabel: AREA_PRACTICE_LABELS[focusArea],
    links: AREA_PRACTICE_LINKS[focusArea],
  };
}

function assertAnswersInRange(
  answers: unknown,
  minimumScore: number,
): asserts answers is LevelTestAnswers {
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    throw new Error("Invalid answers");
  }

  const answerMap = answers as Record<string, unknown>;
  for (const question of LEVEL_TEST_QUESTIONS) {
    if (!(question.id in answerMap)) {
      throw new Error(`Missing answer for ${question.id}`);
    }
    const raw = answerMap[question.id];
    if (
      typeof raw !== "number" ||
      !Number.isInteger(raw) ||
      raw < minimumScore ||
      raw > 3
    ) {
      throw new Error(`Invalid score for ${question.id}`);
    }
  }
}

function assertAllAnswersPresent(answers: unknown): asserts answers is LevelTestAnswers {
  assertAnswersInRange(answers, 0);
}

export function calculateLevelTestResult(answers: LevelTestAnswers): LevelTestResult {
  assertAllAnswersPresent(answers);

  const areaScores: Record<LevelTestArea, number> = {
    concept: 0,
    tool: 0,
    practice: 0,
    safety: 0,
  };

  for (const question of LEVEL_TEST_QUESTIONS) {
    const raw = answers[question.id];
    areaScores[question.area] += raw;
  }

  const areas = {
    concept: {
      score: areaScores.concept,
      maxScore: MAX_BY_AREA.concept,
      percentage: Number(((areaScores.concept / MAX_BY_AREA.concept) * 100).toFixed(1)),
      weightedScore: Number(
        ((areaScores.concept / MAX_BY_AREA.concept) * AREA_WEIGHTS.concept).toFixed(2)
      ),
    },
    tool: {
      score: areaScores.tool,
      maxScore: MAX_BY_AREA.tool,
      percentage: Number(((areaScores.tool / MAX_BY_AREA.tool) * 100).toFixed(1)),
      weightedScore: Number(((areaScores.tool / MAX_BY_AREA.tool) * AREA_WEIGHTS.tool).toFixed(2)),
    },
    practice: {
      score: areaScores.practice,
      maxScore: MAX_BY_AREA.practice,
      percentage: Number(((areaScores.practice / MAX_BY_AREA.practice) * 100).toFixed(1)),
      weightedScore: Number(((areaScores.practice / MAX_BY_AREA.practice) * AREA_WEIGHTS.practice).toFixed(2)),
    },
    safety: {
      score: areaScores.safety,
      maxScore: MAX_BY_AREA.safety,
      percentage: Number(((areaScores.safety / MAX_BY_AREA.safety) * 100).toFixed(1)),
      weightedScore: Number(((areaScores.safety / MAX_BY_AREA.safety) * AREA_WEIGHTS.safety).toFixed(2)),
    },
  };

  const weightedTotal = areas.concept.weightedScore + areas.tool.weightedScore + areas.practice.weightedScore + areas.safety.weightedScore;
  const totalPercentage = Number(weightedTotal.toFixed(1));
  const totalScore = totalPercentage;
  const maxTotalScore = 100;

  const safetyFundamentalsRequired = SAFETY_QUESTION_IDS.some(
    (questionId) => answers[questionId] === SAFETY_GATE_ZERO_THRESHOLD
  );

  const type = TYPE_THRESHOLDS
    .slice()
    .reverse()
    .find((entry) => totalPercentage >= entry.min)?.type ?? "입문형";

  const recommendationLinks = buildRecommendationLinks(type, safetyFundamentalsRequired);

  return {
    totalScore,
    maxTotalScore,
    totalPercentage,
    areas,
    type,
    safetyFundamentalsRequired,
    recommendations: {
      links: recommendationLinks,
    },
    practice: buildPracticePlan(areas),
  };
}

export function validateAnswers(answers: unknown): answers is LevelTestAnswers {
  try {
    assertAllAnswersPresent(answers);
    return true;
  } catch {
    return false;
  }
}

export function validateStoredAnswers(answers: unknown): answers is LevelTestAnswers {
  try {
    assertAnswersInRange(answers, -1);
    return true;
  } catch {
    return false;
  }
}

export function buildEmptyAnswers(): LevelTestAnswers {
  return LEVEL_TEST_QUESTIONS.reduce((acc, question) => {
    acc[question.id] = -1;
    return acc;
  }, {} as LevelTestAnswers);
}
export interface LevelTestLessonCatalogItem {
  id: string;
  title: string;
}

export type LevelTestRecommendationLink =
  LevelTestResult["recommendations"]["links"][number];

export function getRecommendationDisplayLabel(
  link: LevelTestRecommendationLink,
  lessonCatalog: readonly LevelTestLessonCatalogItem[],
): string {
  if (link.site !== "edu-internal") {
    return link.label;
  }

  const lessonId = /^\/lessons\/(\d{1,2}-\d{1,2})$/.exec(link.href)?.[1];
  const lesson = lessonCatalog.find(({ id }) => id === lessonId);

  return lesson ? `${lesson.id} · ${lesson.title}` : link.label;
}
