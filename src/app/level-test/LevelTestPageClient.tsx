"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AREA_WEIGHTS,
  LEVEL_TEST_QUESTIONS,
  TOTAL_QUESTIONS,
  buildEmptyAnswers,
  calculateLevelTestResult,
  getRecommendationDisplayLabel,
  validateStoredAnswers,
  type LevelTestArea,
  type LevelTestAnswers,
  type LevelTestResult,
  type LevelTestLessonCatalogItem,
} from "@/lib/level-test";
import GrowthPath from "@/components/GrowthPath";

const STORAGE_VERSION = "V2";
const STORAGE_ANSWERS_KEY = `levelTestAnswers${STORAGE_VERSION}`;
const STORAGE_INDEX_KEY = `levelTestCurrentIndex${STORAGE_VERSION}`;
const STORAGE_RESULT_KEY = `levelTestResult${STORAGE_VERSION}`;

function loadStoredValue<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function saveState(answers: LevelTestAnswers, currentIndex: number, result: LevelTestResult | null) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(answers));
  localStorage.setItem(STORAGE_INDEX_KEY, String(currentIndex));
  if (result) {
    localStorage.setItem(STORAGE_RESULT_KEY, JSON.stringify(result));
  } else {
    localStorage.removeItem(STORAGE_RESULT_KEY);
  }
}

const isExternalLink = (href: string) => /^https?:\/\/.*/.test(href);
const isInternalLessonLink = (href: string) => /^\/lessons\/\d{1,2}-\d{1,2}$/.test(href);

function isAllowedExternalHref(href: string) {
  try {
    const parsed = new URL(href);
    return ["http:", "https:"].includes(parsed.protocol) && parsed.hostname === "ai-school.silronomu.com";
  } catch {
    return false;
  }
}

const AREA_LABELS: Record<LevelTestArea, string> = {
  concept: "개념이해",
  tool: "도구숙련",
  practice: "업무적용",
  safety: "검증·보안습관",
};

interface LevelTestPageClientProps {
  lessonCatalog: LevelTestLessonCatalogItem[];
}

export default function LevelTestPageClient({ lessonCatalog }: LevelTestPageClientProps) {
  const [answers, setAnswers] = useState<LevelTestAnswers>(buildEmptyAnswers());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<LevelTestResult | null>(null);

  useEffect(() => {
    const raw = loadStoredValue<LevelTestAnswers>(STORAGE_ANSWERS_KEY);
    const index = loadStoredValue<number>(STORAGE_INDEX_KEY);
    const storedResult = loadStoredValue<LevelTestResult>(STORAGE_RESULT_KEY);

    let nextAnswers = buildEmptyAnswers();
    if (raw && validateStoredAnswers(raw)) {
      nextAnswers = raw;
    }

    const nextIndex = index && Number.isInteger(index) && index >= 0 && index < TOTAL_QUESTIONS ? index : 0;
    setAnswers(nextAnswers);
    setCurrentIndex(nextIndex);
    setResult(storedResult ?? null);
  }, []);

  useEffect(() => {
    if (result) {
      saveState(answers, currentIndex, result);
      return;
    }
    saveState(answers, currentIndex, null);
  }, [answers, currentIndex, result]);

  const question = LEVEL_TEST_QUESTIONS[currentIndex];
  const answeredCount = Object.values(answers).filter((value) => value >= 0).length;
  const isCurrentAnswered = answers[question.id] >= 0;
  const progress = useMemo(
    () => Number(((currentIndex / LEVEL_TEST_QUESTIONS.length) * 100).toFixed(1)),
    [currentIndex],
  );

  function selectAnswer(value: number) {
    if (result) return;

    const nextAnswers = {
      ...answers,
      [question.id]: value,
    };
    setAnswers(nextAnswers);
    saveState(nextAnswers, currentIndex, null);
  }

  function goNext() {
    if (!isCurrentAnswered) return;
    if (currentIndex === LEVEL_TEST_QUESTIONS.length - 1) {
      setResult(calculateLevelTestResult(answers));
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  }

  function goPrev() {
    if (result) return;
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }

  function reset() {
    const empty = buildEmptyAnswers();
    setAnswers(empty);
    setCurrentIndex(0);
    setResult(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_ANSWERS_KEY);
      localStorage.removeItem(STORAGE_INDEX_KEY);
      localStorage.removeItem(STORAGE_RESULT_KEY);
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <section className="rounded-2xl border border-ink-200 bg-white p-6 md:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">수준진단 결과</h1>
          <p className="mt-2 text-sm text-ink-600">
            총점 {result.totalScore}/{result.maxTotalScore} (가중치 반영 {result.totalPercentage}%)
          </p>
          <p className="mt-1 text-lg font-semibold text-brand-700">유형: {result.type}</p>
          <p className="mt-3 text-sm text-ink-700">
            이 결과는 질문·근거 읽기·판단의 학습 방향을 위한 간이진단입니다. 실제 구술 설명 능력이나 말의 속도·유창함을 채점하지 않습니다.
          </p>
          <p className="mt-3 text-sm text-ink-700">
            {result.safetyFundamentalsRequired
              ? "주요 안전문항에서 위험 답변(0점)이 있어 안전기초 보강이 필요합니다."
              : "안전문항 기준 점검 통과로 기본 안전기초를 충족했습니다. 보완 안내 없이 다음 학습으로 이어도 됩니다."}
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {(Object.entries(result.areas) as Array<[keyof LevelTestResult["areas"], { score: number; maxScore: number; percentage: number; weightedScore: number }]>)
              .map(([areaKey, value]) => {
                return (
                  <div key={areaKey} className="rounded-xl border border-ink-200 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-ink-700">
                      {AREA_LABELS[areaKey as LevelTestArea]} ({AREA_WEIGHTS[areaKey]})
                    </p>
                    <p className="mt-1 text-xs text-ink-500">
                      원점수 {value.score}/{value.maxScore} ({value.percentage}%)
                    </p>
                    <p className="mt-2 text-xs text-ink-500">가중 기여 {value.weightedScore}%</p>
                    <div className="mt-2 h-2 rounded-full bg-ink-100" role="img" aria-label={`${AREA_LABELS[areaKey as LevelTestArea]} 점수막대`}>
                      <div
                        className="h-full rounded-full bg-brand-500"
                        style={{ width: `${Math.max(0, Math.min(100, value.percentage))}%` }}
                        aria-hidden
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          <section className="mt-8 rounded-xl border border-brand-200 bg-brand-50/40 p-5">
            <h2 className="text-lg font-bold text-ink-900">30초 구술방어 자가점검</h2>
            <p className="mt-2 text-sm leading-6 text-ink-700">
              이번에 연습할 영역은 <strong>{result.practice.focusLabel}</strong>입니다. 답을 입력하거나 녹음하지 말고, 비식별 가상 사례를 하나 골라 자기 말로 설명해 보세요.
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-700">
              먼저 누구에게 설명하는지, 그 사람이 알아야 할 한 가지, 설명 뒤에 내려야 할 다음 판단·행동을 정합니다.
            </p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-6 text-ink-700">
              <li>결론 한 문장</li>
              <li>핵심어 3개와 가장 중요한 근거 2개</li>
              <li>반론 또는 한계 1개</li>
              <li>판단을 유지·수정·유보하게 할 조건 1개</li>
            </ol>
            <p className="mt-3 text-sm text-ink-700">
              같은 내용을 30초·1분·3분으로 길이만 바꿔 설명해 보세요. 말솜씨가 아니라 결론·근거·한계·수정 조건을 구분하는지가 자가점검 기준입니다.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {result.practice.links.map((link) => {
                if (isInternalLessonLink(link.href)) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
                    >
                      {getRecommendationDisplayLabel(link, lessonCatalog)}
                    </Link>
                  );
                }

                if (isExternalLink(link.href) && isAllowedExternalHref(link.href)) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-900"
                    >
                      {getRecommendationDisplayLabel(link, lessonCatalog)}
                    </a>
                  );
                }

                return null;
              })}
            </div>
          </section>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-ink-900">추천 시작 강의</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.recommendations.links.map((link) => {
                if (isInternalLessonLink(link.href)) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex min-h-11 min-w-[9.5rem] items-center justify-center rounded-full border border-ink-200 px-4 py-2 text-sm text-ink-700 transition hover:bg-ink-50"
                              aria-label={`강의 ${getRecommendationDisplayLabel(link, lessonCatalog)}로 이동`}
                    >
                              {getRecommendationDisplayLabel(link, lessonCatalog)}
                    </Link>
                  );
                }

                if (isExternalLink(link.href) && isAllowedExternalHref(link.href)) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 min-w-[9.5rem] items-center justify-center rounded-xl border border-brand-300/40 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-900"
                    >
                              {getRecommendationDisplayLabel(link, lessonCatalog)}
                    </a>
                  );
                }

                return (
                  <span
                    key={`${link.label}-${link.href}`}
                    className="inline-flex min-h-11 min-w-[9.5rem] items-center justify-center rounded-full border border-ink-200 px-4 py-2 text-sm text-ink-400"
                  >
                    {link.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={reset}
              className="min-h-11 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
            >
              다시하기
            </button>
          </div>
          <GrowthPath compact />
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <section className="rounded-2xl border border-ink-200 bg-white p-6 md:p-8">
        <p className="text-sm text-ink-500" id="progress-label">
          20문항 레벨 진단
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">
          수준 진단 시작
        </h1>
        <p className="mt-2 text-sm text-ink-600">
          질문·근거 읽기·판단의 학습 방향을 찾는 교육용 간이진단입니다. 1개씩 진행하며, 각 문항은 반드시 1개 선택해야 다음으로 이동할 수 있습니다.
        </p>
        <p className="mt-2 text-sm text-ink-600">
          객관식 20문항은 실제 말하기나 구술 설명 능력을 직접 측정하지 않습니다. 결과 뒤 30초 자가점검으로 결론·근거·반론·수정 조건을 자기 언어로 설명해 보세요.
        </p>

        <div className="mt-6">
          <div className="mb-2 h-2 rounded-full bg-ink-100" role="img" aria-label="진행률 바">
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-ink-600">
            진행: {Math.min(answeredCount, TOTAL_QUESTIONS)} / {TOTAL_QUESTIONS}문항 (
            {Math.round((Math.min(answeredCount, TOTAL_QUESTIONS) / TOTAL_QUESTIONS) * 100)}%)
          </p>
        </div>

        <article className="mt-8">
          <p className="text-sm text-brand-700">
            {question.section} · {currentIndex + 1}/{LEVEL_TEST_QUESTIONS.length}
          </p>
          <h2 id="question-text" className="mt-2 text-lg leading-relaxed font-semibold text-ink-900 md:text-xl">
            {question.text}
          </h2>

          <div className="mt-5 space-y-3" role="radiogroup" aria-labelledby="question-text">
            {question.options.map((option) => {
              const isSelected = answers[question.id] === option.value;
              return (
                <button
                  key={`${question.id}-${option.value}`}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`${question.text} - ${option.label}`}
                  onClick={() => selectAnswer(option.value)}
                  className={`min-h-11 w-full rounded-xl border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-brand-500 bg-brand-50 text-brand-900"
                      : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {!isCurrentAnswered ? (
            <p className="mt-3 text-sm font-medium text-red-600" role="alert" aria-live="polite">
              현재 문항을 선택해야 다음으로 이동할 수 있습니다.
            </p>
          ) : null}
        </article>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="min-h-11 min-w-[7rem] rounded-full border border-ink-300 px-5 py-3 font-semibold text-ink-700 transition disabled:opacity-50"
          >
            이전
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!isCurrentAnswered}
            className="min-h-11 min-w-[7rem] rounded-full bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {currentIndex === LEVEL_TEST_QUESTIONS.length - 1 ? "결과 보기" : "다음"}
          </button>
        </div>
      </section>
    </div>
  );
}
