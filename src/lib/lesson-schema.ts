import { isValidLessonId } from "@/lib/lesson-catalog";

export interface LessonSectionPayload {
  heading: string;
  content: string;
  code?: string;
  tip?: string;
}

export interface LessonPayload {
  id: string;
  phase: string;
  title: string;
  summary: string;
  prev: string | null;
  next: string | null;
  sections: LessonSectionPayload[];
  keyTakeaways: string[];
}

const isString = (value: unknown): value is string => typeof value === "string";
const isNullOrString = (value: unknown): value is string | null =>
  value === null || typeof value === "string";

function isSection(value: unknown): value is LessonSectionPayload {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  if (!isString(candidate.heading) || !isString(candidate.content)) return false;

  if (candidate.code !== undefined && typeof candidate.code !== "string") return false;
  if (candidate.tip !== undefined && typeof candidate.tip !== "string") return false;

  return true;
}

export function isLessonPayload(value: unknown): value is LessonPayload {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;

  if (!isString(candidate.id) || !isValidLessonId(candidate.id)) return false;
  if (!isString(candidate.phase) || candidate.phase.length === 0) return false;
  if (!isString(candidate.title) || candidate.title.length < 2) return false;
  if (!isString(candidate.summary)) return false;
  if (!isNullOrString(candidate.prev) || !isNullOrString(candidate.next)) return false;
  if (!Array.isArray(candidate.sections) || !candidate.sections.every(isSection))
    return false;
  if (!Array.isArray(candidate.keyTakeaways) || !candidate.keyTakeaways.every(isString))
    return false;

  return true;
}
