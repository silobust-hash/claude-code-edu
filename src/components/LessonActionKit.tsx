type LessonActionSource = {
  id?: string;
  phase?: string;
  title?: string;
  summary?: string;
  keyTakeaways?: string[];
};

function firstTakeaway(lesson: LessonActionSource) {
  return lesson.keyTakeaways?.[0] ?? lesson.summary ?? "이번 강의를 내 업무 루틴에 적용한다.";
}

export default function LessonActionKit({ lesson }: { lesson: LessonActionSource }) {
  const title = lesson.title ?? "이번 강의";
  const prompt = `나는 코딩 경험이 많지 않은 실무자입니다. "${title}" 강의를 따라 하고 있습니다.

현재 상태:
- 사용하는 컴퓨터:
- 방금 실행한 명령:
- 화면에 나온 결과 또는 오류:
- 내가 만들고 싶은 업무 결과물:

요청:
1. 지금 상황을 초보자 기준으로 진단해줘.
2. 다음에 실행할 명령을 한 줄씩 제시해줘.
3. 각 명령이 무엇을 하는지 쉬운 말로 설명해줘.
4. 성공 여부를 확인할 체크 포인트를 정리해줘.
5. 실패하면 다시 붙여넣을 오류 보고 양식을 만들어줘.`;

  const cards = [
    ["준비", "강의 전 현재 폴더, 계정, 설치 상태를 확인합니다."],
    ["실행", firstTakeaway(lesson)],
    ["검증", "명령 결과, 파일 변화, 브라우저 화면 중 하나로 성공 여부를 확인합니다."],
    ["기록", "잘 된 명령과 막힌 지점을 다음 실습을 위한 로그로 남깁니다."],
  ];

  return (
    <section className="mt-10 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
            Execution Kit
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-900">
            실습 중 막히지 않기 위한 진행표
          </h2>
        </div>
        <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
          {lesson.phase ?? "실습"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {cards.map(([heading, body]) => (
          <article key={heading} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 className="text-sm font-bold text-slate-800">{heading}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-950 p-5">
        <p className="mb-3 text-sm font-bold text-indigo-200">막혔을 때 Claude Code에 붙여넣을 양식</p>
        <pre className="overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed text-slate-100">
          <code>{prompt}</code>
        </pre>
      </div>
    </section>
  );
}
