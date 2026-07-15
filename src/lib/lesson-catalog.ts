import { lessons } from "@/data/lessons";

export interface CatalogLesson {
  id: string;
  phase: string;
  title: string;
}

const idParts = (id: string): [number, number] => {
  const [phasePart, indexPart] = id.split("-");
  return [Number(phasePart), Number(indexPart)];
};

export function getOrderedLessons(): CatalogLesson[] {
  return Object.entries(lessons)
    .map(([id, lesson]) => ({
      id,
      phase: lesson.phase as string,
      title: lesson.title as string,
    }))
    .sort((a, b) => {
      const [phaseA, indexA] = idParts(a.id);
      const [phaseB, indexB] = idParts(b.id);
      return phaseA - phaseB || indexA - indexB;
    });
}

export function getLessonsByPhase(phase: number): CatalogLesson[] {
  const prefix = `${phase}-`;
  return getOrderedLessons()
    .filter((lesson) => lesson.id.startsWith(prefix))
    .sort((a, b) => {
      const [, indexA] = idParts(a.id);
      const [, indexB] = idParts(b.id);
      return indexA - indexB;
    });
}

export function isValidLessonId(rawId: string): boolean {
  return /^\d{1,2}-\d{1,2}$/.test(rawId);
}

export function parseLessonPhase(rawId: string): number | null {
  const [phasePart] = rawId.split("-");
  const phase = Number(phasePart);
  if (!Number.isInteger(phase) || phase < 1 || phase > 16) return null;
  return phase;
}
