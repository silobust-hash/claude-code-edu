import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { lessons } from "@/data/lessons";
import { listBlobOverrides } from "@/lib/storage";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

// Phase grouping matching the lessons page structure
const phaseGroups = [
  { phase: 1, phaseTitle: "AI 시대 이해하기", prefix: "1-" },
  { phase: 2, phaseTitle: "Claude Code 설치와 첫걸음", prefix: "2-" },
  { phase: 3, phaseTitle: "노무사 실무에 바로 쓰기", prefix: "3-" },
  { phase: 4, phaseTitle: "업무 도구 속의 Claude", prefix: "4-" },
  { phase: 5, phaseTitle: "스킬 — Claude의 핵심 기능", prefix: "5-" },
  { phase: 6, phaseTitle: "코워크 & 플러그인", prefix: "6-" },
  { phase: 7, phaseTitle: "마켓플레이스 — 만능 공구 사러 가기", prefix: "7-" },
  { phase: 8, phaseTitle: "MCP 서버로 업무 연동", prefix: "8-" },
  { phase: 9, phaseTitle: "나만의 도구 만들기", prefix: "9-" },
  { phase: 10, phaseTitle: "Worktree — 병렬 AI 코딩", prefix: "10-" },
  { phase: 11, phaseTitle: "고급 활용과 자동화", prefix: "11-" },
  { phase: 12, phaseTitle: "최신 기능 마스터하기", prefix: "12-" },
];

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

  const groupedLessons = phaseGroups.map((group) => {
    const groupLessons = Object.entries(lessons)
      .filter(([id]) => id.startsWith(group.prefix))
      .sort(([a], [b]) => {
        const numA = parseInt(a.split("-")[1]);
        const numB = parseInt(b.split("-")[1]);
        return numA - numB;
      })
      .map(([id, lesson]) => ({
        id,
        title: (lesson as { title: string }).title,
        hasOverride: overrideSet.has(id),
      }));

    return {
      ...group,
      lessons: groupLessons,
    };
  }).filter((group) => group.lessons.length > 0);

  const totalLessons = Object.keys(lessons).length;
  const totalOverrides = overrides.length;

  return (
    <DashboardClient
      groupedLessons={groupedLessons}
      totalLessons={totalLessons}
      totalOverrides={totalOverrides}
    />
  );
}
