"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  EMPTY_LESSON_PROGRESS,
  LESSON_PROGRESS_STORAGE_KEY,
  parseLessonProgress,
  type LessonProgressLastVisited,
  type LessonProgressState,
} from "@/lib/lesson-progress";

interface LessonProgressPanelProps {
  totalLessons: number;
  catalog: ReadonlyArray<{
    id: string;
    title: string;
  }>;
}

function getStoredProgress(allowedLessonIds: readonly string[]): LessonProgressState {
  if (typeof window === "undefined") {
    return { ...EMPTY_LESSON_PROGRESS };
  }

  try {
    const raw = localStorage.getItem(LESSON_PROGRESS_STORAGE_KEY);
    return parseLessonProgress(raw, allowedLessonIds);
  } catch {
    return { ...EMPTY_LESSON_PROGRESS };
  }
}

function formatVisitedAt(at: number) {
  try {
    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(at));
  } catch {
    return "";
  }
}

export default function LessonProgressPanel({ totalLessons, catalog }: LessonProgressPanelProps) {
  const allowedLessonIds = useMemo(() => catalog.map((lesson) => lesson.id), [catalog]);
  const lessonTitleById = useMemo(() => {
    const map = new Map<string, string>();
    for (const lesson of catalog) {
      map.set(lesson.id, lesson.title);
    }
    return map;
  }, [catalog]);

  const [state, setState] = useState<LessonProgressState>({ ...EMPTY_LESSON_PROGRESS });

  useEffect(() => {
    setState(getStoredProgress(allowedLessonIds));
  }, [allowedLessonIds]);

  const completedCount = state.completedLessonIds.length;
  const hasLastVisited = Boolean(state.lastVisited);
  const lastVisited: LessonProgressLastVisited | null = hasLastVisited
    ? {
        ...state.lastVisited!,
        title: lessonTitleById.get(state.lastVisited?.id ?? "") || state.lastVisited?.title || "",
      }
    : null;

  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5">
      <p className="text-sm text-ink-500">완료 {completedCount}/{totalLessons}</p>
      {lastVisited ? (
        <div className="mt-2 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-700">
            마지막 본 강의: {lastVisited.title} ({lastVisited.id})
          </p>
          <Link href={`/lessons/${lastVisited.id}`} className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            이어보기
          </Link>
          <span className="text-xs text-ink-500">{formatVisitedAt(lastVisited.at)}</span>
        </div>
      ) : null}
    </section>
  );
}
