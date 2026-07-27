import type { MetadataRoute } from "next";
import { lessons } from "@/data/lessons";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";
// Shared layout, entity links, and AI labor-practice guidance changed on this date.
const LAST_SITE_UPDATE = new Date("2026-07-27");

export default function sitemap(): MetadataRoute.Sitemap {
  const lessonEntries = Object.values(lessons).map((lesson) => {
    const phase = Number(String(lesson.id).split("-")[0]);
    const lessonUpdate = lesson.updatedAt ? new Date(lesson.updatedAt) : LAST_SITE_UPDATE;
    return {
      url: `${SITE_URL}/lessons/${lesson.id}`,
      lastModified: lessonUpdate > LAST_SITE_UPDATE ? lessonUpdate : LAST_SITE_UPDATE,
      changeFrequency: "monthly" as const,
      priority: phase >= 1 && phase <= 3 ? 0.8 : 0.6,
    };
  });

  return [
    {
      url: SITE_URL,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/curriculum`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/lessons`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...lessonEntries,
  ];
}
