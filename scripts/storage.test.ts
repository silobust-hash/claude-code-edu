import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

function fixture() {
  const calls = { get: [] as unknown[][], list: [] as unknown[][], put: [] as unknown[][], del: [] as unknown[][], head: [] as unknown[][] };
  const cacheOptions: Array<{ revalidate: number; tags: string[] }> = [];
  const invalidations: Array<{ tag: string; profile: unknown }> = [];
  const entries = new Map<string, { value: unknown; tags: string[] }>();
  let content: Record<string, unknown> | null = null;
  let failure: Error | null = null;
  const sdk = {
    async get(...args: unknown[]) {
      calls.get.push(args);
      if (failure) throw failure;
      return content ? { statusCode: 200, stream: new Response(JSON.stringify(content)).body } : null;
    },
    async list(...args: unknown[]) {
      calls.list.push(args);
      if (failure) throw failure;
      return { blobs: content ? [{ pathname: "lessons/1-1.json", url: "https://fixture.invalid/lesson" }] : [] };
    },
    async put(...args: unknown[]) {
      calls.put.push(args);
      if (failure) throw failure;
      content = JSON.parse(args[1] as string);
      return { url: "https://fixture.invalid/lesson" };
    },
    async del(...args: unknown[]) {
      calls.del.push(args);
      if (failure) throw failure;
      content = null;
    },
    async head(...args: unknown[]) {
      calls.head.push(args);
      if (failure) throw failure;
      return { uploadedAt: new Date("2026-09-06T00:00:00Z"), size: 42 };
    },
  };
  const nextCache = {
    unstable_cache(fn: (...args: unknown[]) => Promise<unknown>, keys: string[], options: { revalidate: number; tags: string[] }) {
      cacheOptions.push(options);
      return async (...args: unknown[]) => {
        const key = JSON.stringify([keys, args]);
        const cached = entries.get(key);
        if (cached) return cached.value;
        const value = await fn(...args);
        entries.set(key, { value, tags: options.tags });
        return value;
      };
    },
    revalidateTag(tag: string, profile: unknown) {
      invalidations.push({ tag, profile });
      for (const [key, entry] of entries) {
        if (entry.tags.includes(tag)) entries.delete(key);
      }
    },
  };
  const module = { exports: {} as typeof import("../src/lib/storage") };
  const source = fs.readFileSync(path.resolve("src/lib/storage.ts"), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  vm.runInNewContext(compiled.outputText, {
    exports: module.exports, module, Response,
    process: { env: { BLOB_READ_WRITE_TOKEN: "fixture-token-not-a-credential" } },
    require(name: string) {
      if (name === "@vercel/blob") return sdk;
      if (name === "next/cache") return nextCache;
      if (name === "react") return { cache: (fn: unknown) => fn };
      throw new Error(`Unexpected dependency: ${name}`);
    },
    fetch: async () => { throw new Error("Unexpected direct fetch"); },
  });
  return { storage: module.exports, calls, cacheOptions, invalidations, setContent(value: Record<string, unknown> | null) { content = value; }, setFailure(value: Error | null) { failure = value; } };
}

test("Blob reads use exact private paths and persist missing results without list", async () => {
  const f = fixture();
  assert.equal(await f.storage.getLessonFromBlob("1-1"), null);
  assert.equal(await f.storage.getLessonFromBlob("1-1"), null);
  assert.equal(f.calls.list.length, 0);
  assert.equal(f.calls.get.length, 1);
  assert.equal(f.calls.get[0][0], "lessons/1-1.json");
  assert.equal((f.calls.get[0][1] as { access: string }).access, "private");
  assert.equal((f.calls.get[0][1] as { useCache: boolean }).useCache, false);
  assert(f.cacheOptions.some((option) => option.revalidate === 86_400));
});

test("Blob caches content, isolates lessons, and refreshes reads and list after successful writes/deletes", async () => {
  const f = fixture();
  await f.storage.getLessonFromBlob("1-1");
  await f.storage.listBlobOverrides();
  await f.storage.saveLessonToBlob("1-1", { title: "Updated" });
  const options = f.calls.put[0][2] as { access: string; allowOverwrite: boolean; addRandomSuffix: boolean };
  assert.equal(f.calls.put[0][0], "lessons/1-1.json");
  assert.equal(options.access, "private");
  assert.equal(options.allowOverwrite, true);
  assert.equal(options.addRandomSuffix, false);
  assert.equal((await f.storage.getLessonFromBlob("1-1"))?.title, "Updated");
  assert.equal((await f.storage.getLessonFromBlob("1-1"))?.title, "Updated");
  assert.equal(f.calls.get.length, 2);
  await f.storage.getLessonFromBlob("1-2");
  assert.equal(f.calls.get.length, 3);
  assert.equal((await f.storage.listBlobOverrides())[0], "1-1");
  await f.storage.deleteLessonFromBlob("1-1");
  assert.equal(f.calls.del[0][0], "lessons/1-1.json");
  assert.equal(await f.storage.getLessonFromBlob("1-1"), null);
  assert.equal((await f.storage.listBlobOverrides()).length, 0);
  assert.equal(f.calls.list.length, 3, "only explicit admin list calls should list blobs");
  assert(f.invalidations.length >= 4);
  assert(f.invalidations.every(({ profile }) => (profile as { expire: number }).expire === 0));
});

test("Transient/suspended read errors fall back without poisoning the 24h cache; failed writes do not invalidate", async () => {
  const f = fixture();
  f.setFailure(new Error("store suspended"));
  assert.equal(await f.storage.getLessonFromBlob("1-1"), null);
  assert.equal((await f.storage.listBlobOverrides()).length, 0);
  await assert.rejects(f.storage.saveLessonToBlob("1-1", { title: "Failed" }));
  await assert.rejects(f.storage.deleteLessonFromBlob("1-1"));
  assert.equal(f.invalidations.length, 0);
  f.setFailure(null);
  f.setContent({ title: "Recovered" });
  assert.equal((await f.storage.getLessonFromBlob("1-1"))?.title, "Recovered");
  assert.equal((await f.storage.listBlobOverrides())[0], "1-1");
});

test("Blob metadata uses exact pathname head without list", async () => {
  const f = fixture();
  const metadata = await f.storage.getBlobMetadata("1-1");
  assert.equal(metadata?.size, 42);
  assert.equal(f.calls.head[0][0], "lessons/1-1.json");
  assert.equal(f.calls.list.length, 0);
});

test("Unknown well-formed lesson IDs return missing metadata and 404 before Blob or authentication", async () => {
  let blobReads = 0;
  let authReads = 0;
  const module = { exports: {} as typeof import("../src/app/lessons/[id]/page") };
  const source = fs.readFileSync(path.resolve("src/app/lessons/[id]/page.tsx"), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } });
  vm.runInNewContext(compiled.outputText, {
    exports: module.exports, module, process: { env: {} },
    require(name: string) {
      if (name === "@/data/lessons") return { lessons: { "1-1": { title: "Known", summary: "Public" } } };
      if (name === "@/lib/lesson-catalog") return { getOrderedLessons: () => [], isValidLessonId: (id: string) => /^\d{1,2}-\d{1,2}$/.test(id) };
      if (name === "@/lib/storage") return { getLessonFromBlob: async () => { blobReads++; return null; } };
      if (name === "next/navigation") return { notFound() { throw new Error("NEXT_HTTP_ERROR_FALLBACK;404"); } };
      if (name === "@/lib/auth") return { isAuthenticated: async () => { authReads++; return false; } };
      if (name === "@/lib/lesson-access") return { getLessonAccessStatus: async () => { authReads++; return false; } };
      if (name === "@/lib/serialize-jsonld") return { serializeJsonLd: JSON.stringify };
      if (name === "react/jsx-runtime" || name === "next/link" || name.startsWith("@/components/") || name === "./LessonReactions") return {};
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  const input = { params: Promise.resolve({ id: "99-99" }) };
  assert.equal((await module.exports.generateMetadata(input)).title, "강의를 찾을 수 없습니다");
  await assert.rejects(module.exports.default(input), /404/);
  assert.equal(blobReads, 0);
  assert.equal(authReads, 0);
});
