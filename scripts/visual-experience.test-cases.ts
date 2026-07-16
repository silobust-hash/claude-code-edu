import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { getOrderedLessons } from "@/lib/lesson-catalog";
import {
  getRecommendationDisplayLabel,
  type LevelTestRecommendationLink,
} from "@/lib/level-test";

const INTERNAL_RECOMMENDATION_IDS = [
  "1-1",
  "1-4",
  "2-1",
  "3-4",
  "5-1",
  "6-1",
  "8-1",
  "12-1",
  "13-1",
  "14-1",
  "15-1",
  "16-1",
] as const;

test("수준진단 내부 추천은 실제 강의 제목을 표시하고 링크를 유지한다", () => {
  const lessonCatalog = getOrderedLessons().map(({ id, title }) => ({ id, title }));

  for (const id of INTERNAL_RECOMMENDATION_IDS) {
    const link: LevelTestRecommendationLink = {
      label: `edu ${id}`,
      href: `/lessons/${id}`,
      site: "edu-internal",
    };
    const lesson = lessonCatalog.find((item) => item.id === id);

    assert.ok(lesson);
    assert.equal(
      getRecommendationDisplayLabel(link, lessonCatalog),
      `${lesson.id} · ${lesson.title}`,
    );
    assert.equal(link.href, `/lessons/${id}`);
  }
});

test("수준진단 교차사이트 추천 표시명과 링크는 그대로 유지한다", () => {
  const lessonCatalog = getOrderedLessons().map(({ id, title }) => ({ id, title }));
  const link: LevelTestRecommendationLink = {
    label: "AI업무학교 1-3",
    href: "https://ai-school.silronomu.com/lessons/1-3",
    site: "ai-school",
  };

  assert.equal(getRecommendationDisplayLabel(link, lessonCatalog), link.label);
  assert.equal(link.href, "https://ai-school.silronomu.com/lessons/1-3");
});

test("주요 navigation 링크는 44px 터치영역을 사용한다", async () => {
  const [siteNav, siteFooter] = await Promise.all([
    readFile("src/components/SiteNav.tsx", "utf8"),
    readFile("src/components/SiteFooter.tsx", "utf8"),
  ]);

  assert.match(siteNav, /group inline-flex min-h-11 items-center gap-2\.5/);
  assert.equal(siteFooter.match(/inline-flex min-h-11 items-center/g)?.length, 6);
});

test("최상단 채널 전환 띠는 두 교육 채널의 역할과 현재 위치를 명확히 표시한다", async () => {
  const [layout, channelBar, siteNav] = await Promise.all([
    readFile("src/app/layout.tsx", "utf8"),
    readFile("src/components/EducationChannelBar.tsx", "utf8"),
    readFile("src/components/SiteNav.tsx", "utf8"),
  ]);

  assert.match(layout, /<EducationChannelBar \/>[\s\S]*<SiteNav \/>/);
  assert.match(channelBar, /aria-label="교육 채널 전환"/);
  assert.match(channelBar, /https:\/\/ai-school\.silronomu\.com/);
  assert.match(channelBar, /이동 · 입문·공통 기초/);
  assert.match(channelBar, /현재 채널 · 실무 심화/);
  assert.match(channelBar, /aria-current="page"/);
  assert.match(channelBar, /min-h-\[60px\]/);
  assert.doesNotMatch(channelBar, /truncate/);
  assert.doesNotMatch(channelBar, /opacity-0|delay-/);
  assert.doesNotMatch(siteNav, /https:\/\/ai-school\.silronomu\.com|AI업무학교/);
});

test("수준진단은 서버의 최소 강의 카탈로그만 클라이언트에 전달한다", async () => {
  const [page, client] = await Promise.all([
    readFile("src/app/level-test/page.tsx", "utf8"),
    readFile("src/app/level-test/LevelTestPageClient.tsx", "utf8"),
  ]);

  assert.match(page, /map\(\(\{ id, title \}\) => \(\{ id, title \}\)\)/);
  assert.doesNotMatch(client, /@\/lib\/lesson-catalog/);
});

test("강의 접근 API의 모든 JSON 응답은 캐시를 금지한다", async () => {
  const route = await readFile("src/app/api/lesson-access/route.ts", "utf8");

  assert.match(route, /"Cache-Control": "no-store"/);
  assert.equal(route.match(/NextResponse\.json/g)?.length, 1);
  assert.match(route, /const response = jsonNoStore\(\{ success: true \}\)/);
});
