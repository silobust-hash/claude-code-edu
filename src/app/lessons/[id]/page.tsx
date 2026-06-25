import { lessons } from "@/data/lessons";
import { getLessonFromBlob } from "@/lib/storage";
import Link from "next/link";
import { notFound } from "next/navigation";
import LessonReactions from "./LessonReactions";
import LessonPresentation from "@/components/LessonPresentation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";
const PERSON_ID = "https://silronomu.com/#person";

export const revalidate = 60; // Revalidate every 60 seconds for ISR

export function generateStaticParams() {
  return Object.keys(lessons).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let lesson: Record<string, unknown> | null = null;
  try {
    lesson = await getLessonFromBlob(id);
  } catch {
    // Fall back to static
  }

  if (!lesson) {
    const staticLesson = lessons[id];
    if (!staticLesson) return { title: "강의를 찾을 수 없습니다" };
    return {
      title: `${staticLesson.title} | 클로드 코드 강의`,
      description: staticLesson.summary,
      alternates: { canonical: `/lessons/${id}` },
      openGraph: {
        title: `${staticLesson.title}`,
        description: staticLesson.summary,
        url: `${SITE_URL}/lessons/${id}`,
        type: "article",
      },
    };
  }

  return {
    title: `${lesson.title} | 클로드 코드 강의`,
    description: (lesson.summary as string) || undefined,
    alternates: { canonical: `/lessons/${id}` },
    openGraph: {
      title: `${lesson.title}`,
      description: (lesson.summary as string) || undefined,
      url: `${SITE_URL}/lessons/${id}`,
      type: "article",
    },
  };
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Try blob first, fall back to static data
  let lesson: Record<string, any> | null = null;
  try {
    lesson = await getLessonFromBlob(id);
  } catch {
    // Blob not available, use static
  }

  if (!lesson) {
    lesson = lessons[id];
  }

  if (!lesson) notFound();

  const prevId = lesson.prev ? lesson.prev : null;
  const nextId = lesson.next ? lesson.next : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Article", "LearningResource"],
    headline: lesson.title,
    description: lesson.summary,
    url: `${SITE_URL}/lessons/${id}`,
    author: { "@type": "Person", name: "박실로", jobTitle: "공인노무사", "@id": PERSON_ID },
    publisher: { "@type": "Organization", name: "한동노무법인" },
    isPartOf: {
      "@type": "Course",
      name: "클로드 코드(Claude Code) 실전 강의",
      "@id": `${SITE_URL}/#course`,
      url: SITE_URL,
    },
    learningResourceType: "lesson",
    educationalLevel: "Beginner",
    inLanguage: "ko",
    isAccessibleForFree: true,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "강의 목록", item: `${SITE_URL}/lessons` },
      { "@type": "ListItem", position: 3, name: lesson.title, item: `${SITE_URL}/lessons/${id}` },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mb-8">
        <Link href="/lessons" className="text-sm text-indigo-500 hover:text-indigo-700 transition-colors">
          ← 강의 목록으로
        </Link>
      </div>

      <div className="mb-6">
        <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
          {lesson.phase}
        </span>
        <span className="text-xs text-slate-400 ml-2">{lesson.id}</span>
      </div>

      <h1 className="text-3xl font-bold mb-4 leading-tight">{lesson.title}</h1>
      <p className="text-lg text-slate-500 mb-6 leading-relaxed">{lesson.summary}</p>
      <div className="mb-10">
        <LessonPresentation lesson={lesson} accent="#6366f1" />
      </div>

      <div className="prose prose-slate max-w-none">
        {lesson.sections.map((section: { heading: string; content: string; code?: string; tip?: string }, i: number) => (
          <div key={i} className="mb-10">
            <h2 className="text-xl font-bold mb-3 text-slate-800">{section.heading}</h2>
            <div className="text-slate-600 leading-relaxed whitespace-pre-line mb-4">{section.content}</div>
            {section.code && (
              <pre className="bg-slate-900 text-green-400 rounded-xl p-5 overflow-x-auto text-sm leading-relaxed mb-4">
                <code>{section.code}</code>
              </pre>
            )}
            {section.tip && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <span className="font-bold">TIP: </span>{section.tip}
              </div>
            )}
          </div>
        ))}
      </div>

      {lesson.keyTakeaways && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mt-10">
          <h3 className="font-bold text-indigo-800 mb-3">핵심 정리</h3>
          <ul className="space-y-2">
            {lesson.keyTakeaways.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-indigo-700">
                <span className="shrink-0 mt-0.5">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      <LessonReactions lessonId={id} />

      <div className="flex justify-between mt-12 pt-8 border-t border-slate-200">
        {prevId ? (
          <Link href={`/lessons/${prevId}`} className="text-sm text-indigo-500 hover:text-indigo-700">
            ← 이전 강의
          </Link>
        ) : <div />}
        {nextId ? (
          <Link href={`/lessons/${nextId}`} className="text-sm text-indigo-500 hover:text-indigo-700">
            다음 강의 →
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
