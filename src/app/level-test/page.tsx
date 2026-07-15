import LevelTestPageClient from "./LevelTestPageClient";
import { getOrderedLessons } from "@/lib/lesson-catalog";

export const metadata = {
  title: "수준진단",
  description: "Claude Code 실무 역량 20문항 진단으로 다음 강의 시작점을 추천합니다.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LevelTestPage() {
  const lessonCatalog = getOrderedLessons().map(({ id, title }) => ({ id, title }));

  return <LevelTestPageClient lessonCatalog={lessonCatalog} />;
}
