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
    text: "Claude Code의 장점 중 가장 정확한 것은?",
    options: [
      { value: 0, label: "클라우드 채팅처럼 빠른 응답이 전부" },
      { value: 1, label: "터미널 실행과 파일 편집까지 가능한 AI 보조" },
      { value: 2, label: "법률 텍스트 검색에만 특화된 비밀키 도구" },
      { value: 3, label: "코드 실행, 파일 조작, 검증 루프를 모두 설계 가능한 통합 작업 환경" },
    ],
  },
  {
    id: "c-02",
    section: "개념 이해",
    area: "concept",
    text: "학습 목표를 세울 때 우선순위가 가장 낮은 것은?",
    options: [
      { value: 0, label: "한 번에 기능을 끝내고 테스트를 생략" },
      { value: 1, label: "직무 흐름을 모아 점진적으로 자동화" },
      { value: 2, label: "입력-처리-출력을 구분해 문서화" },
      { value: 3, label: "반복 업무를 템플릿·검증 루프로 표준화" },
    ],
  },
  {
    id: "c-03",
    section: "개념 이해",
    area: "concept",
    text: "노무사 실무 문서 자동화에서 가장 먼저 정리할 개념은?",
    options: [
      { value: 0, label: "정확도보다 속도만 끌어올리기" },
      { value: 1, label: "입력 규칙과 산식 범위를 먼저 정의" },
      { value: 2, label: "툴 이름을 먼저 외우기" },
      { value: 3, label: "출력 형식/리스크 범위를 먼저 합의" },
    ],
  },
  {
    id: "c-04",
    section: "개념 이해",
    area: "concept",
    text: "다음 중 오류를 줄이기 위한 개념 설명으로 가장 적절한 것은?",
    options: [
      { value: 0, label: "한 번에 모든 데이터를 한 파일에 처리" },
      { value: 1, label: "사실관계와 산식 출처를 함께 기록" },
      { value: 2, label: "템플릿을 즉흥적으로 수정" },
      { value: 3, label: "검토 항목을 정의하고 단계별 확인" },
    ],
  },
  {
    id: "c-05",
    section: "개념 이해",
    area: "concept",
    text: "학습 계획을 짤 때 79개 강의를 볼 때 가장 현실적인 방식은?",
    options: [
      { value: 0, label: "인기 강의만 랜덤하게 보며 완성" },
      { value: 1, label: "완독 기록만으로 끝내기" },
      { value: 2, label: "필요 영역만 골라 즉흥적으로 이동" },
      { value: 3, label: "수준진단 기반으로 시작 구간을 정해 연속 진행" },
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
      { value: 1, label: "접수-분류-작업리스트를 함께 정렬" },
      { value: 2, label: "상담 기록을 생략하고 처리" },
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
      { value: 1, label: "입력값 점검표 + 계산 로그" },
      { value: 2, label: "최종 수임료 산정식만 저장" },
      { value: 3, label: "반려 사유 체크리스트·검수 증적" },
    ],
  },
  {
    id: "p-03",
    section: "업무 적용",
    area: "practice",
    text: "의뢰인 안내 자동화에서 중요한 원칙은?",
    options: [
      { value: 0, label: "모든 의사결정을 AI에 위임" },
      { value: 1, label: "상태가 바뀔 때마다 로그와 이력 안내" },
      { value: 2, label: "완성본 바로 발송 후 수정" },
      { value: 3, label: "변경 이유·근거·일정 재확인 절차" },
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
    text: "협업 시 가장 유의할 부분은?",
    options: [
      { value: 0, label: "결과물 공유 전 사내 승인 생략" },
      { value: 1, label: "중간 산출물의 기준 포맷 통일" },
      { value: 2, label: "메신저에서 임시로 전달" },
      { value: 3, label: "검토 기록·버전·승인 루트 명시" },
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
      { value: 1, label: "즉시 공개 보고 후 처리" },
      { value: 2, label: "접근 제한·증적 보존 후 원인분석" },
      { value: 3, label: "복구 후 동일 실수 재발 방지 절차" },
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
