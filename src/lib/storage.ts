import { put, get, head, list, del } from "@vercel/blob";
import { unstable_cache, revalidateTag } from "next/cache";

const BLOB_PREFIX = "lessons/";
const CACHE_SECONDS = 60 * 60 * 24;
const OVERRIDES_TAG = "lesson-blob-overrides";

const lessonPath = (id: string) => `${BLOB_PREFIX}${id}.json`;
const lessonTag = (id: string) => `lesson-blob:${id}`;

function invalidateLesson(id: string) {
  // Route handlers need immediate expiry so an admin sees a successful edit.
  revalidateTag(lessonTag(id), { expire: 0 });
  revalidateTag(OVERRIDES_TAG, { expire: 0 });
}

export async function getLessonFromBlob(
  id: string
): Promise<Record<string, unknown> | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    return await unstable_cache(
      async () => {
        const result = await get(lessonPath(id), { access: "private", useCache: false });
        if (!result) return null;
        if (result.statusCode !== 200) throw new Error("Unexpected Blob response");
        return await new Response(result.stream).json() as Record<string, unknown>;
      },
      ["private-lesson-blob-v1", id],
      { revalidate: CACHE_SECONDS, tags: [lessonTag(id)] }
    )();
  } catch {
    // Only content and a confirmed 404 are cached. A suspended store or
    // transient error falls back to bundled lessons and can recover next time.
    return null;
  }
}

export async function saveLessonToBlob(
  id: string,
  data: Record<string, unknown>
): Promise<string> {
  const blob = await put(
    lessonPath(id),
    JSON.stringify(data, null, 2),
    {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    }
  );
  invalidateLesson(id);
  return blob.url;
}

export async function deleteLessonFromBlob(id: string): Promise<void> {
  await del(lessonPath(id));
  invalidateLesson(id);
}

const readBlobOverrides = unstable_cache(
  async (): Promise<string[]> => {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    return blobs
      .map((blob) => {
        const match = blob.pathname.match(/^lessons\/(.+)\.json$/);
        return match ? match[1] : null;
      })
      .filter((id): id is string => id !== null);
  },
  ["private-lesson-blob-overrides-v1"],
  { revalidate: CACHE_SECONDS, tags: [OVERRIDES_TAG] }
);

export async function listBlobOverrides(): Promise<string[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    return await readBlobOverrides();
  } catch {
    return [];
  }
}

export async function getBlobMetadata(
  id: string
): Promise<{ uploadedAt: Date; size: number } | null> {
  try {
    const blob = await head(lessonPath(id));
    return {
      uploadedAt: blob.uploadedAt,
      size: blob.size,
    };
  } catch {
    return null;
  }
}
