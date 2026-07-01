import type { MetadataRoute } from "next";
import { lessons } from "@/data/lessons";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";
const RELEASE_DATE = new Date("2026-07-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const lessonEntries = Object.values(lessons).map((lesson) => {
    const phase = Number(String(lesson.id).split("-")[0]);
    return {
      url: `${SITE_URL}/lessons/${lesson.id}`,
      lastModified: lesson.updatedAt ? new Date(lesson.updatedAt) : RELEASE_DATE,
      changeFrequency: "monthly" as const,
      priority: phase >= 1 && phase <= 3 ? 0.8 : 0.6,
    };
  });

  return [
    {
      url: SITE_URL,
      lastModified: RELEASE_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/curriculum`,
      lastModified: RELEASE_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/lessons`,
      lastModified: RELEASE_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...lessonEntries,
  ];
}
