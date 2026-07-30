import { lessons, TOTAL_PHASES, TOTAL_LESSONS } from "@/data/lessons";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";

function build(): string {
  const sorted = Object.values(lessons).sort((a, b) => {
    const [ap, al] = String(a.id).split("-").map(Number);
    const [bp, bl] = String(b.id).split("-").map(Number);
    return ap - bp || al - bl;
  });

  const lessonLines = sorted
    .map((l) => `- [${l.title}](${SITE_URL}/lessons/${l.id})`)
    .join("\n");

  return `# 클로드 코드 강의 (노무사 x Claude Code)

> 박실로 공인노무사가 노무 실무에 직접 적용하며 정리한 비개발자용 Claude Code 실전 교육. ${TOTAL_PHASES}단계 ${TOTAL_LESSONS}강.

코딩 경험이 전혀 없는 비개발자(노무사·변호사·회계사·세무사 등 전문직)를 위한 클로드 코드(Claude Code) 실무 교육입니다. 터미널 여는 법부터 임금 계산 자동화, MCP 서버 연동, 커스텀 스킬·플러그인 개발, Next.js 웹앱 배포까지 단계별로 다룹니다.

## 강의
${lessonLines}

## 커리큘럼
- [전체 커리큘럼](${SITE_URL}/curriculum)
- [강의 목록](${SITE_URL}/lessons)

## 소개
- [강의 홈](${SITE_URL})
- [소개](${SITE_URL}/about)
- [박실로 노무사 개인 홈페이지](https://silronomu.com/)
- [산재·산업안전 전문 블로그](https://sanjae.silronomu.com/)
- [한동노무법인 공식 홈페이지 · 구성원](https://xn--2q1bm94d.com/members)
- [AI노무사 박실로 기준](https://silronomu.com/hub/ai-nomusa.html)
- [AI업무학교](https://ai-school.silronomu.com/)
`;
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
