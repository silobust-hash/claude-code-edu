export type LessonProgressLastVisited = {
  id: string;
  title: string;
  at: number;
};

export interface LessonProgressState {
  version: number;
  completedLessonIds: string[];
  lastVisited: LessonProgressLastVisited | null;
}

export const LESSON_PROGRESS_STORAGE_KEY = "edu.lesson.progress.v1";
export const LESSON_PROGRESS_VERSION = 1;

export const EMPTY_LESSON_PROGRESS: LessonProgressState = {
  version: LESSON_PROGRESS_VERSION,
  completedLessonIds: [],
  lastVisited: null,
};

export function normalizeLessonProgress(
  input: unknown,
  allowedLessonIds: readonly string[],
): LessonProgressState {
  const allowed = new Set(allowedLessonIds);
  if (!input || typeof input !== "object") {
    return { ...EMPTY_LESSON_PROGRESS };
  }

  const raw = input as Partial<LessonProgressState>;
  const version = typeof raw.version === "number" && Number.isInteger(raw.version) ? raw.version : LESSON_PROGRESS_VERSION;
  if (version !== LESSON_PROGRESS_VERSION) {
    return { ...EMPTY_LESSON_PROGRESS };
  }
  const completedLessonIds = Array.isArray(raw.completedLessonIds)
    ? raw.completedLessonIds.filter((id) => typeof id === "string" && allowed.has(id))
    : [];
  const dedupedCompleted = Array.from(new Set(completedLessonIds));

  let lastVisited: LessonProgressLastVisited | null = null;
  if (
    raw.lastVisited &&
    typeof raw.lastVisited === "object" &&
    "id" in raw.lastVisited &&
    "title" in raw.lastVisited &&
    "at" in raw.lastVisited
  ) {
    const candidate = raw.lastVisited as Partial<LessonProgressLastVisited>;
    if (
      typeof candidate.id === "string" &&
      typeof candidate.title === "string" &&
      typeof candidate.at === "number" &&
      Number.isFinite(candidate.at) &&
      candidate.at > 0 &&
      allowed.has(candidate.id)
    ) {
      lastVisited = {
        id: candidate.id,
        title: candidate.title,
        at: candidate.at,
      };
    }
  }

  return {
    version,
    completedLessonIds: dedupedCompleted,
    lastVisited,
  };
}

export function parseLessonProgress(raw: string | null, allowedLessonIds: readonly string[]): LessonProgressState {
  if (!raw) {
    return { ...EMPTY_LESSON_PROGRESS };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    const normalized = normalizeLessonProgress(parsed, allowedLessonIds);
    return normalized;
  } catch {
    return { ...EMPTY_LESSON_PROGRESS };
  }
}

export function updateLastVisited(
  state: LessonProgressState,
  lesson: Pick<LessonProgressLastVisited, "id" | "title">,
  now: number,
  allowedLessonIds: readonly string[],
): LessonProgressState {
  if (!allowedLessonIds.includes(lesson.id)) {
    return state;
  }
  return {
    ...state,
    lastVisited: {
      id: lesson.id,
      title: lesson.title,
      at: now,
    },
  };
}

export function toggleLessonCompleted(
  state: LessonProgressState,
  lessonId: string,
  allowedLessonIds: readonly string[],
): LessonProgressState {
  if (!allowedLessonIds.includes(lessonId)) {
    return state;
  }

  const exists = state.completedLessonIds.includes(lessonId);
  return {
    ...state,
    completedLessonIds: exists
      ? state.completedLessonIds.filter((id) => id !== lessonId)
      : [...state.completedLessonIds, lessonId],
  };
}

export function persistLessonProgress(state: LessonProgressState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LESSON_PROGRESS_STORAGE_KEY, JSON.stringify(state));
}
