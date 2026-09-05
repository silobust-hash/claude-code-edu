import LevelTestPageClient from "./LevelTestPageClient";
import { getOrderedLessons } from "@/lib/lesson-catalog";

export const metadata = {
  title: "수준진단",
  description: "질문·근거 읽기·판단의 학습 방향을 살피는 교육용 20문항 간이진단과 30초 구술방어 자가점검입니다.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LevelTestPage() {
  const lessonCatalog = getOrderedLessons().map(({ id, title }) => ({ id, title }));

  return <LevelTestPageClient lessonCatalog={lessonCatalog} />;
}
