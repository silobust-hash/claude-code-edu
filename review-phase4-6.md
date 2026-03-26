# Phase 4-6 + Marketplace Review Report

**Reviewer:** Claude Opus 4.6 (Automated Content Review)
**Date:** 2026-03-26
**Files Reviewed:**
- `src/data/lessons-phase4-6.ts` (1585 lines)
- `src/data/lessons-marketplace.ts` (167 lines)

---

## Issues Found (Critical)

### 1. [lessons-phase4-6.ts:415-435] Skills 구조 설명이 구식 (commands만 설명, skills 누락)

**문제:** Lesson 5-1에서 `.claude/commands/` 폴더에 마크다운 파일을 만들면 슬래시 커맨드가 된다고 설명하고 있습니다. 이것은 틀리지는 않지만, 2025년 후반~2026년 기준 Claude Code의 현재 권장 방식인 **Skills 시스템** (`.claude/skills/*/SKILL.md`)을 전혀 다루지 않고 있습니다.

**현재 내용:**
```
프로젝트폴더/
├── .claude/
│   └── commands/
│       ├── 취업규칙검토.md      → /취업규칙검토
```

**수정 제안:**
Claude Code v2.1.3 이후 commands와 skills가 통합되었습니다. `.claude/commands/취업규칙검토.md`와 `.claude/skills/취업규칙검토/SKILL.md` 둘 다 `/취업규칙검토`로 동작합니다. 기존 commands 방식이 여전히 작동하지만, 새로운 skills 방식이 권장됩니다. Skills는 YAML frontmatter를 통해 자동 호출 여부, 허용 도구, 서브에이전트 구성 등 추가 기능을 제공합니다.

**제안:** 5-1 또는 5-3에서 두 가지 방식을 모두 소개하되, `.claude/commands/`가 여전히 작동한다는 점과 함께 `.claude/skills/` 방식도 설명해야 합니다. 특히 SKILL.md의 YAML frontmatter 부분을 추가해야 합니다.

---

### 2. [lessons-marketplace.ts:19-21] /plugin 명령어 문법이 부정확할 수 있음

**문제:** 공식 마켓플레이스 접근 방법으로 `/plugin`과 `Discover 탭`을 설명하고 있으나, 실제 Claude Code의 플러그인 관리 인터페이스가 이와 정확히 일치하는지 확인 필요합니다.

**현재 내용:**
```
/plugin
/plugin search "github"
/plugin install github-integration
```

**수정 제안:** 실제 Claude Code에서의 플러그인 설치 명령은 `/plugin install {plugin-name}@{marketplace}` 형태이며, 마켓플레이스 탐색은 `/plugin marketplace add` 후 `/plugin menu`로 진행됩니다. `Discover 탭`이라는 표현은 CLI 기반 도구에 정확히 맞지 않을 수 있습니다. 공식 문서 기반으로 정확한 명령 구문을 확인하여 수정해야 합니다.

---

### 3. [lessons-marketplace.ts:109] MCP 서버 설정 파일명이 부정확

**문제:** MCP 서버 설정 파일로 `claude_desktop_config.json`을 언급하고 있으나, 이는 **Claude Desktop** 앱의 설정 파일입니다. **Claude Code**에서는 `claude mcp add` 명령어로 설정하거나, `.mcp.json`(프로젝트 스코프) 또는 `~/.claude.json`(유저/로컬 스코프)에 저장됩니다.

**현재 내용:**
```json
// MCP 서버 설정 예시 (claude_desktop_config.json)
{
  "mcpServers": {
    "gmail": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-gmail"]
    }
  }
}
```

**수정 제안:**
```
// Claude Code에서 MCP 서버 추가하기
claude mcp add gmail --scope user -- npx -y @anthropic/mcp-gmail

// 또는 프로젝트 공유용 (.mcp.json)
// 프로젝트 루트에 .mcp.json 파일 생성
```

**참고:** `claude_desktop_config.json`은 Claude Desktop 전용이고, Claude Code는 별도의 설정 체계를 사용합니다. 이 교육이 Claude Code를 대상으로 하므로, Claude Code의 MCP 설정 방식으로 수정해야 합니다.

---

### 4. [lessons-marketplace.ts:109] MCP 서버 패키지명 정확성

**문제:** `@anthropic/mcp-gmail`, `@anthropic/mcp-google-calendar`, `@anthropic/mcp-notion`, `@anthropic/mcp-filesystem` 패키지명이 실제 존재하는 패키지인지 확인 필요합니다. Anthropic이 공식적으로 이런 이름의 MCP 서버를 배포하는지 검증되지 않았습니다.

**수정 제안:** 실제 MCP Registry(registry.modelcontextprotocol.io)나 npm에서 검증된 패키지명을 사용하세요. 파일시스템 MCP 서버는 `@anthropic-ai/mcp-server-filesystem`이 아닌 `@modelcontextprotocol/server-filesystem`일 수 있습니다. 정확한 패키지명은 공식 레지스트리에서 확인 후 업데이트가 필요합니다.

---

### 5. [lessons-marketplace.ts:62, 74] 커뮤니티 마켓플레이스 등록 명령어 문법

**문제:** `/plugin marketplace add davepoon/buildwithclaude` 형식의 명령어가 실제 Claude Code에서 정확히 이 문법으로 작동하는지 확인 필요합니다.

**현재 내용:**
```
/plugin marketplace add davepoon/buildwithclaude
/plugin marketplace search "document review"
/plugin marketplace install davepoon/buildwithclaude/doc-reviewer
```

**수정 제안:** 실제 Build with Claude 마켓플레이스 등록 명령은 GitHub 저장소 기반으로 작동합니다. 정확한 명령어 형식을 공식 문서에서 확인하여 업데이트하세요. 마켓플레이스 추가 후 설치 플로우가 정확한지도 검증이 필요합니다.

---

## Issues Found (Minor)

### 6. [lessons-phase4-6.ts:913-921] CLAUDE.md 글로벌 설정 경로

**문제:** 글로벌 설정 경로를 `~/.claude/CLAUDE.md`로 설명하고 있습니다. 이는 맞으나, 코드 예시에서는 `~/.claude/`로 표기합니다. 일관된 설명이 필요합니다.

**현재 내용:**
```
1. 글로벌 설정 (~/.claude/CLAUDE.md):
모든 프로젝트에 공통으로 적용되는 설정
```

**판정:** 경로 자체는 정확합니다. Claude Code 공식 문서에서도 Tier 1으로 `~/.claude/CLAUDE.md`를 명시합니다. 다만 1041번 라인의 폴더 구조 예시에서 `.claude/` 아래에 `CLAUDE.md`를 두는 것은 글로벌이 아닌 프로젝트 설정으로 혼동될 수 있습니다.

---

### 7. [lessons-phase4-6.ts:58-66] 4대보험 요율 정확성

**문제:** 2026년 기준 4대보험 요율을 예시로 제시하고 있습니다:
- 국민연금 4.5%, 건강보험 3.545%, 장기요양 12.95%, 고용보험 0.9%

이 요율은 매년 변경되며, 2026년 실제 요율과 맞는지 검증이 필요합니다. 특히 건강보험료율(2025년 기준 3.545%)과 장기요양보험료율(2025년 기준 12.95%)은 매년 조정됩니다. 교육 자료에 구체적 요율을 하드코딩하면 오래된 정보가 될 수 있습니다.

**수정 제안:** "예시 요율이며, 실제 적용 시 해당 연도 확정 요율을 반드시 확인하세요"라는 주의문구를 강화하거나, 요율 대신 "Claude에게 최신 요율을 확인하도록 요청하세요"로 안내하는 것이 좋습니다.

---

### 8. [lessons-phase4-6.ts:40] 2026년 최저임금 정확성

**문제:** 2026년 최저임금을 시급 10,030원으로 명시하고 있습니다. 이는 실제 2026년 최저임금과 일치하는지 확인 필요합니다. (2025년 최저임금은 10,030원으로, 2026년이 동일한 금액인지는 별도 확인이 필요합니다.)

**수정 제안:** 최저임금위원회 공식 발표를 확인하여 정확한 금액으로 업데이트하세요. 만약 예시 목적이라면 "예시 금액"임을 명시하세요.

---

### 9. [lessons-phase4-6.ts:249] 노란봉투법 시행일

**문제:** "2026년 3월 10일 시행된 노란봉투법(노동조합법 개정안)"으로 명시하고 있습니다. 이 시행일이 정확한지 확인이 필요합니다.

**수정 제안:** 노란봉투법의 정확한 시행일을 확인하여 업데이트하세요. 시행일이 확정되지 않았거나 변경될 수 있으므로, 최신 정보를 반영하세요.

---

### 10. [lessons-phase4-6.ts:453-460] /commit, /review-pr 설명

**문제:** `/commit`과 `/review-pr`을 "내장 스킬"로 소개하고 있습니다. 실제로 이들은 Claude Code의 **빌트인 슬래시 커맨드**이며, 사용자가 만드는 커스텀 스킬과는 다른 카테고리입니다. 빌트인 커맨드는 하드코딩된 고정 로직이고, 커스텀 스킬은 프롬프트 기반입니다.

**수정 제안:** "내장 스킬"이라는 표현 대신 "내장 명령어(빌트인 커맨드)"로 수정하고, 사용자가 만드는 "커스텀 스킬"과의 차이를 명확히 하세요.

---

### 11. [lessons-marketplace.ts:17-20] github.com/anthropics/claude-plugins-official 저장소

**문제:** `github.com/anthropics/claude-plugins-official`을 공식 플러그인 저장소로 언급합니다. 이 저장소가 실제로 존재하며 현재도 유지되고 있는지 확인이 필요합니다.

**수정 제안:** 검색 결과에 따르면 이 저장소는 실제로 존재합니다. 다만, URL 링크의 정확성과 현재 상태를 직접 확인하세요.

---

### 12. [lessons-phase4-6.ts:1404] CLAUDE.md 버전 관리 방법

**문제:** `CLAUDE_v1.md, CLAUDE_v2.md`로 백업하라고 안내하고 있으나, Claude Code는 `CLAUDE.md`라는 특정 파일명만 인식합니다. 이름을 바꾸면 로드되지 않습니다.

**수정 제안:** 버전 관리는 Git을 사용하도록 안내하는 것이 더 적절합니다. Git이 없다면 백업용 파일을 별도 폴더에 보관하되, 실제 사용되는 파일은 항상 `CLAUDE.md`여야 한다고 명시하세요.

---

### 13. [lessons-phase4-6.ts:1040-1041] 글로벌 CLAUDE.md 위치 혼동

**문제:** 폴더 구조 예시에서 `업무/.claude/CLAUDE.md`를 "글로벌 기본 설정"으로 표시하고 있습니다. 하지만 이 위치는 글로벌이 아닌 `업무/` 프로젝트의 로컬 설정입니다. 글로벌은 `~/.claude/CLAUDE.md`입니다.

**수정 제안:**
```
업무/
├── .claude/
│   └── CLAUDE.md          ← 업무 프로젝트 기본 설정 (이 프로젝트의 기본 규칙)
...
~/.claude/
└── CLAUDE.md              ← 글로벌 기본 설정 (모든 프로젝트 공통)
```

---

## Content Improvements

### 14. [Lesson 5-1~5-3] Skills 시스템 현대화 업데이트 필요

**현재:** `.claude/commands/` 폴더에 `.md` 파일을 만드는 방식만 설명.

**개선안:** 2025년 후반부터 도입된 `.claude/skills/` 시스템을 함께 설명해야 합니다:
```
# 기존 방식 (여전히 작동)
.claude/commands/취업규칙검토.md

# 권장 방식 (더 많은 기능)
.claude/skills/취업규칙검토/SKILL.md
```

SKILL.md의 YAML frontmatter 예시:
```yaml
---
name: 취업규칙검토
description: 취업규칙의 법적 적합성을 종합 검토합니다
user-invocable: true
---
```

Skills는 자동 호출(Claude가 대화 맥락에서 관련 스킬을 자동으로 로드), 서브에이전트 활용, 컨텍스트 주입 등 추가 기능을 제공합니다.

---

### 15. [Lesson 7-3] MCP 서버 설정을 Claude Code 방식으로 업데이트

**현재:** `claude_desktop_config.json` 기반 설정 안내.

**개선안:** Claude Code 전용 MCP 설정 방법으로 변경:
```bash
# MCP 서버 추가 (사용자 스코프 - 모든 프로젝트)
claude mcp add gmail --scope user -- npx -y @modelcontextprotocol/server-gmail

# MCP 서버 추가 (프로젝트 스코프 - 팀 공유)
claude mcp add notion --scope project -- npx -y @modelcontextprotocol/server-notion

# 설치된 MCP 서버 확인
claude mcp list

# MCP 서버 테스트
claude mcp get gmail
```

그리고 `.mcp.json`(프로젝트 스코프)과 `~/.claude.json`(유저/로컬 스코프)에 대한 설명을 추가하세요.

---

### 16. [Lesson 7-3] MCP 서버 스코프(local/project/user) 개념 추가

**개선안:** MCP 서버의 세 가지 스코프를 노무사 비유로 설명하면 좋겠습니다:
- **local** (기본값): 이 사건 폴더에서만 사용하는 도구 (개인 사건 파일)
- **project** (.mcp.json): 사무실 팀 전체가 공유하는 도구 (팀 공용 서식함)
- **user**: 모든 사건에서 사용하는 개인 도구 (내 개인 공구함)

---

### 17. [Lesson 6-1] CLAUDE.md /init 명령어 소개 추가

**개선안:** Claude Code에서 `/init` 명령어를 사용하면 프로젝트에 맞는 CLAUDE.md를 자동 생성해줍니다. 이 기능을 소개하면 초보자의 진입 장벽을 낮출 수 있습니다:
```
# Claude Code 터미널에서:
/init

# Claude가 프로젝트 구조를 분석하고
# 적합한 CLAUDE.md 초안을 자동 생성합니다
```

---

### 18. [전반] 비유의 일관성 - "플러그인" 용어 혼란

**문제:** Phase 6에서 "플러그인"은 CLAUDE.md 확장 모듈(전문가 모드)을 의미하고, Phase 7에서 "플러그인"은 Claude Code의 실제 Plugin 시스템을 의미합니다. 두 곳에서 같은 단어를 다른 의미로 사용하여 혼란을 줄 수 있습니다.

**수정 제안:** Phase 6에서는 "플러그인"이라는 용어 대신 "전문가 프로필", "전문 모드", 또는 "컨텍스트 프리셋" 같은 차별화된 용어를 사용하는 것이 좋겠습니다. 또는 Phase 6 서두에서 "여기서 말하는 플러그인은 Claude Code의 Plugin 시스템과는 다른 개념으로, CLAUDE.md를 활용한 전문가 모드 전환을 의미합니다"라고 명시하세요.

---

## Positive Aspects (잘 된 부분)

1. **노무사 비유가 매우 효과적:** 건설현장 공구/장비 비유, 사무실 업무 매뉴얼 비유 등이 비개발자 대상에게 매우 적절합니다.
2. **실전 시나리오가 구체적:** 병원 노무관리, 건설현장 안전, 중대재해 긴급대응 등 실제 노무사 업무에 밀착된 예시가 풍부합니다.
3. **Before/After 구조:** 기존 수작업 방식과 AI 활용 방식의 대비가 명확하여 학습 동기를 부여합니다.
4. **법적 근거 명시:** 관련 법조문(근로기준법 93조, 76조의2 등)을 정확하게 명시하고 있습니다.
5. **보안 주의사항:** 의뢰인 개인정보 보호, API 키 관리, 테스트 환경 사용 등 보안 관련 주의사항이 적절하게 포함되어 있습니다.
6. **단계적 학습 구조:** Phase 4(도구 활용) → Phase 5(스킬) → Phase 6(코워크 시스템)으로의 진행이 논리적입니다.

---

## Accuracy Score: 6.5/10

## Summary

Phase 4의 Excel/PPT/Chrome 활용법은 Claude AI 자체의 기능 설명으로서 정확하며, 노무사 업무에 대한 실전 예시가 풍부하고 적절합니다. Phase 6의 CLAUDE.md 개념과 구조도 기본적으로 정확합니다.

그러나 **기술적 정확성에서 중요한 문제들이 있습니다:**

1. **Skills 시스템 누락** (Critical): Phase 5에서 `.claude/commands/`만 설명하고 2025~2026년 현재 권장되는 `.claude/skills/` 시스템을 전혀 다루지 않습니다. Claude Code v2.1.3에서 두 시스템이 통합되었으므로 이를 반영해야 합니다.

2. **MCP 설정 방식 오류** (Critical): Phase 7에서 `claude_desktop_config.json`을 사용하는데, 이는 Claude Desktop 앱 전용입니다. Claude Code에서는 `claude mcp add` 명령어를 사용합니다.

3. **패키지명 미검증** (Critical): MCP 서버 예시의 `@anthropic/mcp-*` 패키지명이 실제 존재하는 패키지인지 검증되지 않았습니다.

4. **플러그인 용어 혼란** (Minor): Phase 6과 Phase 7에서 "플러그인"이 서로 다른 의미로 사용되어 혼란을 줄 수 있습니다.

**핵심 수정 우선순위:**
1. Phase 7-3의 MCP 서버 설정을 `claude mcp add` 방식으로 변경
2. Phase 5에 `.claude/skills/` 시스템 추가
3. MCP 서버 패키지명 검증 및 수정
4. 마켓플레이스 명령어 문법 검증

노무사 도메인 지식(법조문, 업무 프로세스, 실전 시나리오)의 품질은 높습니다. 기술적 부분만 현재 Claude Code 버전에 맞게 업데이트하면 매우 좋은 교육 자료가 될 것입니다.
