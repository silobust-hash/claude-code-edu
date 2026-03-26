# Phase 9(11) + Phase 12 Review Report

**Reviewer**: Claude Opus 4.6 (AI Review Agent)
**Date**: 2026-03-26
**Files Reviewed**:
- `src/data/lessons-phase9.ts` (Phase 11 content, lessons 11-1 to 11-4)
- `src/data/lessons-phase12.ts` (Phase 12 content, lessons 12-1 to 12-4)
- `src/data/lessons.ts` (import/routing)

---

## Issues Found (Critical)

### 1. [lessons-phase12.ts:167-179] Computer Use 작동 원리 — `--chrome` 플래그 미언급 (Critical)

**문제**: Computer Use 레슨(12-3)에서 Claude Code의 Chrome 연동 방법을 설명하면서 `--chrome` 플래그를 전혀 언급하지 않음. 대신 "MCP를 통해 브라우저 제어를 연결하여 사용" 및 "Claude in Chrome 확장 프로그램이나 Playwright MCP" 등으로 모호하게 설명.

**실제 사용법**: Claude Code에서 Computer Use(브라우저 조작)를 사용하려면 `claude --chrome` 플래그로 실행하거나, `/chrome` 명령으로 기본 활성화 설정을 해야 함. Chrome 확장 프로그램 "Claude in Chrome"이 설치되어 있어야 하며, Google Chrome 또는 Microsoft Edge에서만 지원(Brave, Arc 미지원).

**수정 제안**:
```typescript
// 기존 (line 179)
"현재 Claude Code에서는 MCP(Model Context Protocol)를 통해 브라우저 제어를 연결하여 사용할 수 있습니다. Claude in Chrome 확장 프로그램이나 Playwright MCP 등을 활용합니다."

// 수정 제안
"Claude Code에서 브라우저를 조작하려면 --chrome 플래그를 사용합니다. claude --chrome으로 실행하면 Chrome 브라우저와 연결되어, 웹페이지 탐색, 버튼 클릭, 폼 입력, 콘솔 로그 읽기, 네트워크 요청 모니터링 등이 가능합니다. 사전에 Chrome 웹 스토어에서 'Claude in Chrome' 확장 프로그램을 설치해야 합니다. 매번 --chrome을 입력하기 싫다면 /chrome 명령으로 기본 활성화를 설정할 수 있습니다."
```

코드 블록도 수정 필요:
```typescript
// 기존 코드 블록 (line 180-199)에 추가
`# Computer Use 시작하기
claude --chrome

# 또는 기본 활성화 설정 (한 번만 하면 됨)
# Claude Code 실행 후 /chrome → "Enabled by default" 선택

# VS Code 확장에서는 Chrome 확장만 설치하면 자동 연결
# 별도 플래그 불필요`
```

---

### 2. [lessons-phase12.ts:22-28] Auto Mode — `--allowedTools` 및 Auto Mode 신규 권한 모드 미설명 (Critical)

**문제**: Auto Mode 레슨(12-1)에서 세 가지 방법(Accept All, /permissions 설정, --dangerously-skip-permissions)만 소개하고, 2026년 3월에 새로 출시된 **Auto Mode 권한 모드**를 전혀 다루지 않음.

**실제 현황**:
- Auto Mode는 2026년 3월 24일 공식 출시된 **별도의 권한 모드**임
- `Shift+Tab`으로 권한 모드를 순환: default → acceptEdits → plan → **auto**
- `claude --enable-auto-mode`로 활성화 가능
- Auto Mode는 안전 분류기(classifier)가 매 도구 호출 전에 위험성을 평가하여, 안전한 작업은 자동 승인하고 위험한 작업은 차단함
- `--dangerously-skip-permissions`와 달리 안전 장치가 내장되어 있음
- `--allowedTools` / `--disallowedTools` 플래그로 허용 도구 제한 가능

**수정 제안**: 12-1 레슨의 "Auto Mode 사용법 — 3가지 방법" 섹션을 "4가지 방법"으로 확장하고, 신규 Auto Mode 권한 모드를 가장 권장 옵션으로 추가:

```
넷째(새로운 권장 방법), Auto Mode 권한 모드입니다. 2026년 3월에 새로 추가된 기능으로,
Shift+Tab을 눌러 'auto' 모드를 선택하면 됩니다. AI 안전 분류기가 매 작업마다
위험도를 자동 평가하여, 안전한 작업은 승인하고 위험한 작업(파일 대량 삭제, 민감정보 유출 등)은
자동 차단합니다. --dangerously-skip-permissions보다 훨씬 안전하면서도
Accept All보다 편리한 중간 지점입니다.
```

---

### 3. [lessons-phase12.ts:92] Dispatch — Task 도구 미언급 (Critical)

**문제**: Dispatch 레슨(12-2)에서 "별도 명령어가 아니라, Claude Code에게 병렬 처리가 필요한 작업을 요청하면 자동으로 활성화됩니다"라고만 설명. 실제 기술적 메커니즘인 **Task 도구(Task tool)**를 전혀 언급하지 않음.

**실제 메커니즘**: Claude Code는 내부적으로 **Task 도구**를 사용하여 서브에이전트를 생성함. 최대 7개 서브에이전트를 동시 실행 가능. 각 서브에이전트는 독립된 컨텍스트 윈도우, 커스텀 시스템 프롬프트, 독립적 권한을 가짐.

**수정 제안**: 비개발자 대상이므로 기술 용어를 과도하게 쓸 필요는 없지만, "Task 도구"라는 이름 정도는 언급하는 것이 정확성을 위해 필요:
```
"Claude Code는 내부적으로 'Task 도구'라는 것을 사용하여 서브에이전트를 생성합니다.
최대 7개의 서브에이전트가 동시에 작업할 수 있으며, 각각 독립적으로 파일을 읽고
분석합니다."
```

---

### 4. [lessons-phase12.ts:121-123] Dispatch — `--worktree` 플래그 잘못된 사용법 (Critical)

**문제**: 코드 예시에서 `claude --worktree case-a "A사건 구제신청서 작성하면서, 판례 조사와 임금 계산을 동시에 진행해줘"` 형태로 작성. `--worktree`는 `-w`로 줄일 수 있으며, 워크트리 이름 뒤에 바로 프롬프트를 전달하는 문법이 정확한지 확인 필요.

**실제 사용법**: `claude --worktree <name>` 또는 `claude -w <name>`으로 실행하면 별도 워크트리에서 세션이 시작됨. 프롬프트는 `-p` 플래그로 전달해야 함.

**수정 제안**:
```
claude --worktree case-a -p "A사건 구제신청서 작성하면서, 판례 조사와 임금 계산을 동시에 진행해줘"
```

---

## Issues Found (Minor)

### 5. [lessons-phase12.ts:256-294] Hooks — 환경변수 이름 정확성 확인 필요 (Minor)

**문제**: Hooks 코드 예시에서 `$CLAUDE_FILE_PATH`, `$CLAUDE_COMMAND` 등의 환경변수를 사용. 실제 Claude Code Hooks는 stdin으로 JSON 데이터를 전달하며, 환경변수 이름이 정확한지 확인 필요.

**실제 메커니즘**: Hooks는 이벤트별 데이터를 **stdin으로 JSON 형태**로 전달함. 환경변수 방식이 아닌 stdin JSON 파싱이 필요할 수 있음. 다만 일부 환경변수(CLAUDE_FILE_PATH 등)도 지원될 수 있으므로 공식 문서 최종 확인 권장.

**수정 제안**: 코드 예시에 주석으로 "실제 구현 시 공식 문서의 JSON stdin 형식을 참고하세요"라는 안내 추가.

---

### 6. [lessons-phase12.ts:248-254] Hooks — 이벤트 유형 불완전 (Minor)

**문제**: Hooks 레슨에서 4가지 이벤트(PreToolUse, PostToolUse, Notification, Stop)만 소개. 실제로는 **UserPromptSubmit**(프롬프트 제출 시)과 **SessionStart**(세션 시작 시)도 중요한 이벤트.

**수정 제안**: 최소한 UserPromptSubmit과 SessionStart를 추가 언급:
```
추가 이벤트:
- UserPromptSubmit: 사용자가 프롬프트를 입력했을 때 실행됩니다. 프롬프트에 추가 컨텍스트를 자동 주입하는 데 유용합니다.
- SessionStart: 새 세션이 시작될 때 실행됩니다. 개발 환경 설정이나 최신 변경사항 로딩에 활용합니다.
```

---

### 7. [lessons-phase9.ts:82] --remote 플래그 정확성 (Minor)

**문제**: `claude --remote "..."` 형태로 사용하는데, 프롬프트 전달은 별도 `-p` 플래그가 필요할 수 있음. `--remote`는 클라우드 실행 모드이며, 인라인 프롬프트 전달 문법 확인 필요.

**수정 제안**: 공식 문서 기준으로 정확한 문법 확인 후 수정. 일반적으로 `claude --remote -p "프롬프트"` 형태가 될 수 있음.

---

### 8. [lessons-phase9.ts:270] Phase 번호 총정리에서 Phase 9, 10 누락 (Minor)

**문제**: "9단계 과정 총정리"에서 Phase 1~8까지 나열한 후 바로 Phase 11로 건너뜀. Phase 9(코워크 플러그인 - 실제로는 lessons-phase7-8.ts에 있음)과 Phase 10(Worktree)이 빠져 있음.

**수정 제안**: 총정리에 Phase 9와 Phase 10도 포함:
```
Phase 9 (코워크 플러그인): AI 전문가들이 팀으로 협업하는 시스템을 구축했습니다.
Phase 10 (Worktree): 여러 사건을 동시에 독립된 공간에서 작업하는 법을 배웠습니다.
Phase 11 (리모트·클라우드·팀·파이프라인): ...
```

---

## Phase Numbering Issues

### 심각한 명명 혼란

| 파일명 | export 이름 | import alias | 실제 Phase | 레슨 ID |
|---|---|---|---|---|
| lessons-phase7-8.ts | lessonsPhase7to8 | - | Phase 7, 8, **9** | 7-1~9-4 |
| lessons-worktree.ts | lessonsWorktree | - | Phase 10 | 10-1~10-4 |
| lessons-phase9.ts | lessonsPhase9 | **lessonsPhase11** | Phase 11 | 11-1~11-4 |
| lessons-phase12.ts | lessonsPhase12 | - | Phase 12 | 12-1~12-4 |

**구체적 문제점:**

1. **lessons-phase7-8.ts가 Phase 9까지 포함**: 파일명은 "phase7-8"이지만 실제로는 Phase 9 레슨(9-1~9-4)까지 포함하고 있음. 파일명과 내용이 불일치.

2. **lessons-phase9.ts가 실제로는 Phase 11**: 파일명은 "phase9"이지만 내부 레슨 ID는 모두 "11-x"이고, phase 값도 "Phase 11". `lessons.ts`에서 `lessonsPhase9 as lessonsPhase11`로 alias import하여 혼란 가중.

3. **Phase 9와 Phase 10이 다른 파일에 분산**: Phase 9는 lessons-phase7-8.ts에, Phase 10은 lessons-worktree.ts에 있어 찾기 어려움.

4. **Phase 11이라는 번호의 기원 불명**: Phase 1~8 → Phase 9(코워크) → Phase 10(Worktree) → Phase 11(리모트/클라우드/팀) → Phase 12(최신기능). 실질적으로 Phase 11은 "Phase 9"가 되어야 자연스러움. 또는 전체 번호 체계를 재정리할 필요 있음.

**권장 조치**: 파일명을 실제 Phase 번호와 일치시키거나, 또는 Phase 번호 체계 자체를 재정리하여 건너뛰는 번호 없이 연속되도록 수정.

---

## Content Improvements

### [12-1] Auto Mode — 최신 내용 반영

현재 내용은 2025년 말 기준으로 작성된 것으로 보이며, 2026년 3월 24일 출시된 Auto Mode 권한 모드를 반영하지 못함. 다음 내용을 추가 권장:

- Auto Mode 권한 모드 (Shift+Tab으로 전환)
- `--enable-auto-mode` 플래그
- 안전 분류기(classifier)의 역할
- `--allowedTools` / `--disallowedTools` 플래그
- Team/Enterprise 플랜 제한 사항

### [12-2] Dispatch — 기술 메커니즘 보충

- Task 도구(Task tool) 이름 명시
- 최대 동시 서브에이전트 수(약 7개) 언급
- 각 서브에이전트가 독립 컨텍스트를 가진다는 점 설명
- 비용 관련 주의사항 (각 서브에이전트 = 별도 API 호출)

### [12-3] Computer Use — `--chrome` 중심 재작성

- `--chrome` 플래그를 핵심 사용법으로 명시
- `/chrome` 명령으로 기본 활성화 설정 방법
- 지원 브라우저(Chrome, Edge만 지원) 명시
- VS Code 확장에서는 자동 연결된다는 점
- "Playwright MCP" 언급 삭제 또는 별도 고급 옵션으로 분리

### [12-4] Hooks — 최신 이벤트 추가

- UserPromptSubmit, SessionStart 이벤트 추가
- stdin JSON 데이터 전달 방식 설명
- exit code 의미 (0=성공, 2=차단, 기타=비차단 에러)
- `additionalContext` 주입 기능 언급

---

## Accuracy Score: 5/10

---

## Summary

Phase 9(11) 레슨은 리모트 컨트롤, 클라우드 실행(--remote), 팀 워크플로우, 파이프라인 총정리를 다루며, 개념 설명과 노무사 실무 연결은 우수함. 다만 Phase 번호 총정리에서 Phase 9, 10이 누락되어 있고, `--remote`의 정확한 CLI 문법 확인이 필요.

Phase 12 레슨은 **가장 긴급한 수정이 필요한 영역**:

1. **Auto Mode (12-1)**: 2026년 3월 신규 출시된 Auto Mode 권한 모드를 전혀 반영하지 못함. `--dangerously-skip-permissions` 중심으로만 설명하여, 실제 권장 사용법(Shift+Tab → auto 모드)이 빠져 있음.

2. **Dispatch (12-2)**: 핵심 메커니즘인 Task 도구를 미언급하고, `--worktree` 플래그 사용법이 부정확할 가능성이 있음.

3. **Computer Use (12-3)**: **가장 심각한 오류**. `--chrome` 플래그를 전혀 언급하지 않고 "MCP를 통해 연결"이라고 모호하게 설명. 실제로는 `claude --chrome`이 핵심 사용법이며, 이것이 빠지면 학습자가 Computer Use를 실제로 사용할 수 없음.

4. **Hooks (12-4)**: 기본 4개 이벤트는 정확하나, 최신 이벤트(UserPromptSubmit, SessionStart)와 stdin JSON 전달 방식이 누락됨.

전반적으로 **개념 설명과 노무사 실무 비유는 매우 우수**하지만, **기술적 정확성(플래그명, 사용법, 최신 기능 반영)이 부족**하여 학습자가 실제로 따라 할 때 혼란을 겪을 수 있음. Phase 12는 최신 기능을 다루는 만큼, 공식 문서 기준으로 CLI 플래그와 사용법을 정확히 반영하는 것이 필수적임.

---

## Sources
- [Claude Code Permission Modes Docs](https://code.claude.com/docs/en/permission-modes)
- [Auto Mode for Claude Code (Anthropic Blog)](https://www.anthropic.com/engineering/claude-code-auto-mode)
- [Auto Mode Official Blog](https://claude.com/blog/auto-mode)
- [Claude Code Chrome Integration Docs](https://code.claude.com/docs/en/chrome)
- [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [Claude Code Hooks Reference](https://code.claude.com/docs/en/hooks)
- [Claude Code Sub-Agents Docs](https://code.claude.com/docs/en/sub-agents)
