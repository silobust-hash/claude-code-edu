# Phase 1-3 + Terminal + Glossary Review Report

**Reviewer**: Claude Code Content Accuracy Checker
**Date**: 2026-03-26
**Files Reviewed**:
- `src/data/lessons-phase1-3.ts` (Lessons 1-1 ~ 3-5)
- `src/data/lessons-terminal.ts` (Lesson 2-2)
- `src/data/lessons-glossary.ts` (Lesson 1-5)

**Verification Sources**:
- [Claude Code Official Docs](https://code.claude.com/docs/en/overview)
- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Claude Code Advanced Setup](https://code.claude.com/docs/en/setup)
- [npm: @anthropic-ai/claude-code](https://www.npmjs.com/package/@anthropic-ai/claude-code)
- [Auto mode for Claude Code](https://claude.com/blog/auto-mode)
- [Dispatch and Computer Use](https://claude.com/blog/dispatch-and-computer-use)

---

## Issues Found (Critical)

### 1. [lessons-phase1-3.ts: Lesson 2-4, line ~284] 설치 방법이 npm만 안내 -- Native Installer 누락

**현재 내용**: `npm install -g @anthropic-ai/claude-code` 만 안내하고, Node.js를 필수 사전 설치로 안내.

**문제점**: 2026년 3월 현재, Anthropic은 **Native Installer**를 공식 권장 설치 방법으로 안내하고 있습니다:
- Mac/Linux: `curl -fsSL https://claude.ai/install.sh | bash`
- Windows: `irm https://claude.ai/install.ps1 | iex`

Native Installer는 **Node.js가 필요 없고**, 자동 업데이트를 지원합니다. npm 설치도 여전히 작동하지만 "legacy" 방식입니다.

**권장 수정**:
```
방법 1 (권장): Native Installer — Node.js 불필요
# Mac/Linux
curl -fsSL https://claude.ai/install.sh | bash

# Windows (PowerShell)
irm https://claude.ai/install.ps1 | iex

방법 2: npm 설치 — Node.js 18+ 필요
npm install -g @anthropic-ai/claude-code
```

**영향**: 이 이슈는 **Lesson 2-3 (Node.js 설치)** 강의 자체의 필요성에도 영향을 줍니다. Native Installer를 사용하면 Node.js 설치 없이 Claude Code를 바로 사용할 수 있으므로, 2-3강을 "선택 사항"으로 조정하거나 두 가지 경로를 안내해야 합니다.

### 2. [lessons-phase1-3.ts: Lesson 1-3, line ~113] ChatGPT 컨텍스트 윈도우 정보 부정확

**현재 내용**: "ChatGPT(GPT-4o)는 12만 8천 토큰입니다."

**문제점**: GPT-4o의 컨텍스트 윈도우는 128K 토큰이 맞지만, 2025년 말~2026년 초 기준으로 OpenAI는 **GPT-4.5**, **o1**, **o3** 등 더 새로운 모델을 출시했습니다. 또한 ChatGPT Pro/Plus에서는 더 큰 컨텍스트를 제공할 수 있습니다. "2026년 3월 기준"이라고 시점을 명시했으므로, 해당 시점의 최신 상태를 정확히 반영해야 합니다.

**권장 수정**: "ChatGPT의 대표 모델인 GPT-4o는 12만 8천 토큰이며, 최신 모델(o3 등)에서는 20만 토큰까지 지원합니다. 그러나 Claude의 100만 토큰에 비하면 여전히 상당한 차이가 있습니다." 정도로 수정하거나, 구체적 숫자 대신 "약 5~8배 차이"라는 범위로 표현하는 것이 안전합니다.

### 3. [lessons-glossary.ts: Lesson 1-5, line ~131~136] 오토 모드, 디스패치, 컴퓨터 유스 설명 부족/부정확

**현재 내용**:
- 오토 모드: "권한 요청을 자동 승인하여 중단 없이 작업"
- 디스패치: "여러 서브에이전트를 동시에 실행하여 병렬 작업 수행"
- 컴퓨터 유스: "AI가 화면을 보고 마우스/키보드를 조작"

**문제점**:
- **오토 모드(Auto Mode)**: 2026년 3월 24일 공식 발표된 기능. "권한을 자동 승인"이 아니라, **AI 안전 분류기(safety classifier)가 일상적 개발자 작업은 자동 승인하되, 위험한 작업은 차단하는 중간 단계**입니다. "전권 위임"이라는 노무사 비유는 부정확합니다. "--dangerously-skip-permissions"가 전권 위임에 해당하고, 오토 모드는 "일상 업무는 알아서 하되, 중요한 건 반드시 보고하라"에 더 가깝습니다.
- **디스패치(Dispatch)**: 서브에이전트 병렬 실행이 아니라, **모바일/데스크톱 앱에서 Claude에게 작업을 할당하고, Claude가 컴퓨터를 사용해 수행하는 기능**입니다. "비서 3명에게 각각 다른 사건을 맡겨서 동시에 처리시키는 것"보다는 "폰에서 비서에게 업무 지시를 보내면, 비서가 사무실에서 컴퓨터를 켜고 알아서 처리하는 것"이 더 정확합니다.

**권장 수정**:
```
오토 모드: AI가 일상적 작업(파일 읽기, 코드 실행 등)은 자동 승인하되,
         위험한 작업은 차단하는 안전 모드. "일상 업무는 알아서, 중요한 건 보고"
디스패치: 폰이나 데스크톱에서 Claude에게 작업을 할당하면,
         Claude가 컴퓨터를 사용해 자율적으로 수행하는 원격 작업 기능
```

---

## Issues Found (Minor)

### 4. [lessons-phase1-3.ts: Lesson 1-2, line ~69] 토큰 환산 수치

**현재 내용**: "한국어 기준으로 50만~75만 자 분량"

**의견**: Claude의 한국어 토큰 효율은 실제로 가변적이며, 1토큰 = 0.5~0.75자 범위가 대략 맞습니다. 다만 법률 용어나 한자어가 많은 노무사 문서는 토큰 효율이 더 낮을 수 있습니다. "대략적 추정치"임을 명시하면 더 정확합니다. 이것은 minor 이슈입니다.

### 5. [lessons-phase1-3.ts: Lesson 2-4, line ~286] sudo 사용 권장

**현재 내용**: "sudo npm install -g @anthropic-ai/claude-code 로 실행해 보세요"

**의견**: sudo로 npm global 설치하는 것은 보안 관점에서 권장되지 않는 방법입니다. npm 공식 문서에서도 `nvm` 사용이나 npm의 기본 디렉토리를 변경하는 방법을 권장합니다. 다만 비개발자 대상 교육 자료에서는 복잡한 우회 방법보다 sudo가 실용적일 수 있으므로, **Native Installer 사용을 먼저 안내**하고 npm 설치는 보조 옵션으로 제시하면 이 문제가 자연스럽게 해결됩니다.

### 6. [lessons-phase1-3.ts: Lesson 3-5, line ~557] CLAUDE.md 경로 설명

**현재 내용**: "글로벌 설정은 ~/.claude/CLAUDE.md에"

**의견**: 이 경로는 정확합니다. 추가로, Claude Code에서 `/init` 명령어로 CLAUDE.md를 대화형으로 생성할 수 있다는 점도 언급하면 비개발자에게 더 유용합니다.

### 7. [lessons-terminal.ts: Lesson 2-2, line ~154] rm 삭제 경고

**현재 내용**: "rm으로 삭제한 파일은 휴지통에 안 갑니다! 바로 영구 삭제됩니다."

**의견**: 정확한 설명이며, 비개발자 대상으로 특히 중요한 경고입니다. 다만 macOS에서 `trash` 명령어(brew install trash)나 `mv 파일 ~/.Trash/` 같은 안전한 대안도 tip으로 추가하면 좋겠습니다. 현재 제시된 "백업 폴더로 mv하는 습관" 팁은 좋은 대안입니다.

### 8. [lessons-phase1-3.ts: Lesson 1-4, line ~152] "터미널 기반" 설명

**현재 내용**: "터미널 기반 AI 도구입니다"

**의견**: 정확합니다. 다만 2026년 현재 Claude Code는 VS Code, JetBrains IDE 확장을 통해서도 사용 가능하며, Cowork 기능을 통해 비터미널 환경에서도 접근 가능합니다. Phase 1 수준에서는 터미널 중심 설명이 적절하지만, "터미널에서 주로 사용하며, VS Code 같은 편집기에서도 사용 가능합니다" 정도의 보충이 있으면 더 정확합니다.

### 9. [lessons-glossary.ts: Lesson 1-5, line ~116~117] 플러그인 용어

**현재 내용**: "플러그인(Plugin): Claude에 추가하는 확장 기능"

**의견**: Claude Code에서는 "플러그인"이라는 공식 용어를 사용하지 않습니다. Claude Code의 확장은 **MCP 서버**를 통해 이루어집니다. ChatGPT의 플러그인 개념과 혼동될 수 있습니다. "MCP 서버를 통한 확장 연동"으로 수정하거나, 용어 설명에서 "ChatGPT에서는 플러그인이라 부르고, Claude Code에서는 MCP 서버라 부른다"고 명확히 구분해주는 것이 좋습니다.

### 10. [lessons-glossary.ts: Lesson 1-5, line ~128~129] 마켓플레이스

**현재 내용**: "마켓플레이스(Marketplace): 플러그인/스킬을 다운받는 곳"

**의견**: 2026년 3월 기준으로 Claude Code에 공식 "마켓플레이스"가 존재하는지 확인이 필요합니다. MCP 서버는 GitHub 등에서 설치하는 방식이 주류이며, 통합 마켓플레이스가 아직 공식 출시되지 않았을 수 있습니다. 이 용어가 향후 과정에서 사용된다면 실제 기능과 매칭되는지 확인이 필요합니다.

### 11. [lessons-glossary.ts: Lesson 1-5, line ~113~114] 스킬(Skill) 설명

**현재 내용**: "스킬(Skill): /명령어로 실행하는 자동화 기능"

**의견**: Claude Code에서 `/` 명령어는 "slash commands"로 불리며, 일부는 내장(예: `/init`, `/clear`, `/help`), 일부는 사용자 정의 custom slash commands입니다. "스킬"이라는 용어 자체는 Claude Code에서 사용되지만, 설명이 좀 더 정확해야 합니다. "내장 명령어(/init, /clear 등)와 사용자가 만든 커스텀 명령어"로 보충하면 좋겠습니다.

### 12. [lessons-phase1-3.ts: Lesson 2-1, line ~205] Windows PowerShell 안내

**현재 내용**: "Windows 사용자는 'PowerShell' 또는 'Windows Terminal'을 사용합니다."

**의견**: 정확합니다. 다만 Claude Code는 **Windows에서 WSL(Windows Subsystem for Linux)을 필요로 합니다**. Windows 네이티브 PowerShell에서는 Claude Code가 직접 실행되지 않을 수 있습니다. 이 점을 명시해야 합니다. npm 설치 방식에서는 Node.js가 Windows 네이티브를 지원하므로 가능하지만, Native Installer는 WSL을 요구합니다.

**권장 수정**: "Windows에서 Claude Code를 사용하려면 WSL(Windows Subsystem for Linux)을 설치해야 할 수 있습니다. WSL 설치는 PowerShell에서 `wsl --install` 명령어로 가능합니다." 추가.

---

## Content Improvements

### Lesson 2-3 (Node.js 설치) 전체 재구성 제안

Native Installer가 Node.js를 요구하지 않으므로, 이 강의의 위치와 내용을 재고해야 합니다:

**Option A**: "Node.js 설치 (npm 방식 선택 시)" 로 제목 변경하고, 선택 사항임을 명시
**Option B**: "Claude Code 설치 준비" 로 통합하여 Native Installer / npm 두 가지 경로를 모두 안내

### Lesson 1-3 (ChatGPT vs Claude) 보완 제안

2026년 3월 현재 ChatGPT에도 "GPT Agent" 같은 코드 실행 기능이 강화되었을 수 있습니다. 비교표를 너무 세부적 숫자로 작성하면 빠르게 outdated 됩니다. "이 비교는 2026년 3월 기준이며, AI 도구는 빠르게 발전하므로 최신 상태를 확인하세요"라는 면책 문구 추가를 권장합니다.

### Lesson 1-5 (IT 용어 사전) 용어 업데이트 제안

**추가 권장 용어**:
- **Native Installer**: Node.js 없이 Claude Code를 설치하는 공식 권장 방법
- **WSL (Windows Subsystem for Linux)**: Windows에서 Linux 환경을 사용하기 위한 도구. Claude Code 실행에 필요할 수 있음
- **/init 명령어**: Claude Code 내에서 CLAUDE.md를 대화형으로 생성하는 명령어

---

## Positive Findings (잘된 부분)

1. **노무사 비유의 질이 높음**: 컨텍스트 윈도우 = 책상 크기, CLAUDE.md = 업무 매뉴얼, 커밋 = 검토완료 도장 등의 비유가 매우 적절합니다.
2. **할루시네이션 경고 반복**: 판례 검증의 중요성을 여러 강의에 걸쳐 반복 강조한 것은 비개발자 대상 교육에서 매우 중요합니다.
3. **실무 시나리오가 풍부**: 병원 노무, 건설현장 노무 등 구체적인 실무 사례가 다양하게 제시되어 있습니다.
4. **CLAUDE.md 설정 예시**: 노무사 전용 CLAUDE.md 예시가 실용적이며, 특히 "실수한 사항을 추가하라"는 팁이 좋습니다.
5. **터미널 명령어 설명**: pwd, ls, cd, mkdir의 설명이 정확하고, 노무사 서류함 비유가 효과적입니다.
6. **의뢰인 정보 보호 강조**: 가명 처리 원칙을 반복적으로 언급한 것이 적절합니다.
7. **Before vs After 구조**: 각 강의에서 기존 방식과 AI 방식을 대비하는 구조가 설득력 있습니다.
8. **Git 용어 번역 테이블**: 취업규칙 개정 이력에 비유한 Git 설명이 비개발자에게 직관적입니다.
9. **설치 트러블슈팅**: 흔한 에러와 해결 방법을 미리 안내한 것이 실용적입니다.
10. **계산기 코드 예시**: 변수명을 한글(기본급, 퇴직금 등)로 사용한 Python 코드 예시가 비개발자의 이해를 돕습니다.

---

## Accuracy Score: 7.5/10

## Summary

전체적으로 교육 콘텐츠의 품질이 높고, 노무사 실무와의 연결이 잘 되어 있습니다. 비개발자 대상 교육 자료로서 비유의 질과 실무 시나리오가 특히 우수합니다.

**가장 큰 이슈는 설치 방법**입니다. 2026년 현재 Anthropic은 Native Installer(`curl claude.ai/install.sh`)를 공식 권장하며, 이 방법은 Node.js가 불필요합니다. 현재 커리큘럼은 npm 설치만 안내하고 있어, Node.js 설치(2-3강)부터 Claude Code 설치(2-4강)까지의 흐름을 재구성해야 합니다.

**두 번째 이슈는 용어 사전의 정확성**입니다. 오토 모드, 디스패치 등 2026년 3월에 새로 발표된 기능들의 설명이 실제 기능과 다소 차이가 있습니다. 교육 과정 후반부(Phase 12)에서 다루는 내용이지만, 용어 사전에서 처음 소개할 때 정확해야 합니다.

**그 외에는 대부분 정확하거나 minor 수준의 보완이 필요한 사항들**입니다. ChatGPT 비교 정보, Windows WSL 요구사항, 플러그인/마켓플레이스 용어 등을 업데이트하면 더 완성도 높은 교육 자료가 될 것입니다.
