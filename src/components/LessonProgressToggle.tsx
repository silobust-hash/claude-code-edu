"use client";

import { useEffect, useMemo, useState } from "react";
import {
  EMPTY_LESSON_PROGRESS,
  LESSON_PROGRESS_STORAGE_KEY,
  parseLessonProgress,
  toggleLessonCompleted,
  updateLastVisited,
  persistLessonProgress,
  type LessonProgressState,
} from "@/lib/lesson-progress";

interface LessonProgressToggleProps {
  lessonId: string;
  lessonTitle: string;
  catalog: ReadonlyArray<{
    id: string;
    title: string;
  }>;
}

function loadState(allowedLessonIds: readonly string[]): LessonProgressState {
  if (typeof window === "undefined") return { ...EMPTY_LESSON_PROGRESS };

  try {
    const raw = localStorage.getItem(LESSON_PROGRESS_STORAGE_KEY);
    return parseLessonProgress(raw, allowedLessonIds);
  } catch {
    return { ...EMPTY_LESSON_PROGRESS };
  }
}

export default function LessonProgressToggle({ lessonId, lessonTitle, catalog }: LessonProgressToggleProps) {
  const allowedLessonIds = useMemo(() => catalog.map((lesson) => lesson.id), [catalog]);

  const [state, setState] = useState<LessonProgressState>({ ...EMPTY_LESSON_PROGRESS });

  useEffect(() => {
    const loaded = loadState(allowedLessonIds);
    const now = Date.now();
    const hydrated = updateLastVisited(loaded, { id: lessonId, title: lessonTitle }, now, allowedLessonIds);
    setState(hydrated);
    persistLessonProgress(hydrated);
  }, [allowedLessonIds, lessonId, lessonTitle]);

  const isCompleted = state.completedLessonIds.includes(lessonId);

  function onToggle() {
    setState((prev) => {
      const next = toggleLessonCompleted(prev, lessonId, allowedLessonIds);
      persistLessonProgress(next);
      return next;
    });
  }

  return (
    <label
      htmlFor={`lesson-complete-${lessonId}`}
      className="mt-4 inline-flex min-h-11 min-w-[11rem] items-center gap-3 rounded-2xl border border-ink-200 bg-white/90 px-4 py-3 text-sm"
    >
      <input
        id={`lesson-complete-${lessonId}`}
        type="checkbox"
        checked={isCompleted}
        onChange={onToggle}
        className="h-5 w-5 rounded accent-brand-600"
      />
      <span className="font-medium text-ink-700">이 강의 학습 완료</span>
      <span className="text-xs text-ink-500">{isCompleted ? "완료됨" : "미완료"}</span>
    </label>
  );
}
