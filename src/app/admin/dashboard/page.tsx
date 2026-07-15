import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { listBlobOverrides } from "@/lib/storage";
import { getOrderedLessons } from "@/lib/lesson-catalog";
import {
  formatSeoulDateTime,
  getNextSeoulMidnight,
  getTodayLessonCode,
  seoulDateString,
} from "@/lib/lesson-access";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

const PHASE_TITLES: Record<number, string> = {
  1: "AI 시대 이해하기",
  2: "Claude Code 설치와 첫걸음",
  3: "노무사 실무에 바로 쓰기",
  4: "업무 도구 속의 Claude",
  5: "스킬 — Claude의 핵심 기능",
  6: "코워크 & 플러그인",
  7: "마켓플레이스 — 만능 공구 사러 가기",
  8: "MCP 서버로 업무 연동",
  9: "나만의 도구 만들기",
  10: "Worktree — 병렬 AI 코딩",
  11: "고급 활용과 자동화",
  12: "최신 기능 마스터하기",
  13: "영역 확장",
  14: "2026 최전선",
  15: "AI 엔지니어링 5단 진화",
  16: "AI 시대를 읽는 눈",
};

export default async function DashboardPage() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/admin");

  let overrides: string[] = [];
  try {
    overrides = await listBlobOverrides();
  } catch {
    // Blob storage might not be configured yet
  }

  const overrideSet = new Set(overrides);

  const groupedLessons = Object.entries(
    getOrderedLessons().reduce((acc, lesson) => {
      const phaseNumber = Number(lesson.id.split("-")[0]);
      const group = acc[phaseNumber] || [];
      group.push({
        id: lesson.id,
        title: lesson.title,
        hasOverride: overrideSet.has(lesson.id),
      });
      acc[phaseNumber] = group;
      return acc;
    }, {} as Record<number, { id: string; title: string; hasOverride: boolean }[]>)
  )
    .map(([phaseId, lessons]) => ({
      phase: Number(phaseId),
      phaseTitle: PHASE_TITLES[Number(phaseId)] || `Phase ${phaseId}`,
      lessons,
    }))
    .filter((group) => group.lessons.length > 0);

  const normalizedGroupedLessons = groupedLessons
    .map((group) => {
      const groupLessons = group.lessons.sort((a, b) => {
        const [, aIdx] = a.id.split("-").map((token) => Number(token));
        const [, bIdx] = b.id.split("-").map((token) => Number(token));
        return aIdx - bIdx;
      });
      return {
        ...group,
        lessons: groupLessons,
      };
    })
    .sort((a, b) => a.phase - b.phase);

  const totalLessons = Object.keys(
    getOrderedLessons().reduce((acc, lesson) => {
      acc[lesson.id] = true;
      return acc;
    }, {} as Record<string, boolean>)
  ).length;

  const groupedLessonsWithOverrides = normalizedGroupedLessons.map((group) => ({
    ...group,
    lessons: group.lessons,
  }));

  const totalOverrides = overrides.length;
  const lessonAccessSecret = process.env.LESSON_ACCESS_SECRET || "";
  const todayLessonCode = lessonAccessSecret ? getTodayLessonCode() : "";
  const now = new Date();
  const nowInKst = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const nowDateText = seoulDateString(now);
  const expiryText = lessonAccessSecret
    ? formatSeoulDateTime(getNextSeoulMidnight(now))
    : "";

  return (
    <DashboardClient
      groupedLessons={groupedLessonsWithOverrides}
      totalLessons={totalLessons}
      totalOverrides={totalOverrides}
      todayLessonCode={todayLessonCode}
      lessonAccessSecretSet={Boolean(lessonAccessSecret)}
      lessonAccessExpiresAt={expiryText}
      lessonAccessDate={nowDateText}
      lessonAccessNowText={nowInKst}
    />
  );
}
