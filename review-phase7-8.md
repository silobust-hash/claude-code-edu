## Phase 7-8 + Worktree + Visualization Review Report

**Reviewer**: Claude Opus 4.6 (Automated Content Review)
**Date**: 2026-03-26
**Files Reviewed**:
- `src/data/lessons-phase7-8.ts` (Phase 8: MCP + Phase 9: Web Dev)
- `src/data/lessons-worktree.ts` (Phase 10: Worktree)
- `src/data/lessons-visualization.ts` (Phase 4-5: Visualization)

---

### Issues Found (Critical)

1. **[lessons-phase7-8.ts:23-26] MCP 서버 설정 방법이 Claude Desktop 기준으로만 설명됨 — Claude Code CLI 설정 누락**
   - 현재: `claude_desktop_config.json`에 MCP 서버 정보를 추가한다고만 설명
   - 문제: Claude Code(CLI)에서는 `claude mcp add` 명령어로 MCP 서버를 추가함. `claude_desktop_config.json`은 Claude Desktop 앱 전용 설정 파일임
   - 수정안: Claude Code CLI 설정 방법도 병기해야 함
   ```
   // Claude Code(CLI)에서 MCP 서버 추가
   claude mcp add gmail --transport stdio -- npx -y @anthropic/mcp-gmail
   claude mcp add notion --transport stdio -- npx -y @anthropic/mcp-notion

   // 또는 Claude Desktop 앱 설정 파일
   // ~/Library/Application Support/Claude/claude_desktop_config.json (Mac)
   ```
   - 참고: https://code.claude.com/docs/en/mcp

2. **[lessons-phase7-8.ts:25] MCP 서버 패키지 이름이 가상의 패키지명을 사용**
   - 현재: `@anthropic/mcp-gmail`, `@anthropic/mcp-google-calendar`, `@anthropic/mcp-notion`
   - 문제: 이 패키지명들은 실제로 존재하지 않는 가상의 패키지임. 실제 Gmail/Calendar MCP 서버는 별도의 커뮤니티 패키지이거나 Anthropic의 공식 MCP 서버 목록에서 확인해야 함
   - 수정안: 실제 사용 가능한 MCP 서버 패키지명으로 교체하거나, "예시 구조"임을 더 명확히 밝히고 실제 패키지를 찾는 방법(MCP 서버 레지스트리 등)을 안내해야 함

3. **[lessons-worktree.ts:99-115] `claude --worktree` 플래그 설명에서 `-w` 약어가 정확하지 않을 수 있음**
   - 현재: `claude -w bugfix-payment`로 약어 사용 가능하다고 설명
   - 확인 결과: 공식 문서에서는 `--worktree` 플래그를 사용하며, `-w` 약어는 일부 버전에서 지원. 이 부분은 큰 문제는 아니나, 버전별 차이가 있을 수 있으므로 주의 필요
   - 참고: https://code.claude.com/docs/en/common-workflows

4. **[lessons-phase7-8.ts 전체] 파일명이 `lessons-phase7-8.ts`이지만 실제 Phase 7 내용이 없음**
   - 현재: Phase 8 (8-1~8-4)과 Phase 9 (9-1~9-4)만 포함
   - 문제: Phase 7은 `lessons-marketplace.ts`에 있으므로, 파일명이 혼란을 줄 수 있음
   - 수정안: 파일명을 `lessons-phase8-9.ts`로 변경하거나, 파일 상단에 주석으로 명시

---

### Issues Found (Minor)

5. **[lessons-worktree.ts:113-115] Worktree 생성 시 출력 메시지가 부정확할 수 있음**
   - 현재:
     ```
     # ✓ Created worktree at .claude/worktrees/feature-login
     # ✓ Switched to branch 'feature-login'
     # ✓ Starting Claude Code...
     ```
   - 실제 Claude Code는 worktree를 생성할 때 다소 다른 형식의 메시지를 출력할 수 있음. 실제 출력에 맞게 조정하거나, "대략 이런 안내가 표시됩니다"와 같이 근사치임을 명시하는 것이 좋음

6. **[lessons-worktree.ts:305-306] `--remote` 기능 언급이 맥락 없이 등장**
   - 현재: "Claude Code의 --remote 기능(이전 레슨 참조)과 결합하면 5개 이상도 가능합니다"
   - 문제: 이전 레슨에서 `--remote` 기능을 다룬 적이 없음. 이 기능에 대한 설명이 커리큘럼 어디에도 없다면 독자가 혼란을 느낄 수 있음
   - 수정안: `--remote` 기능을 별도 레슨에서 다루거나, 이 문장을 삭제/수정

7. **[lessons-visualization.ts:12] 인라인 시각화 기능 날짜 확인 필요**
   - 현재: "2026년 3월, Claude에 인라인 시각화(Custom Visuals) 기능이 추가되었습니다"
   - 문제: 이 기능은 실제로 2025년 하반기~2026년 초에 걸쳐 점진적으로 출시됨. 정확한 날짜를 확인하여 기재하는 것이 좋음

8. **[lessons-visualization.ts:271] 모바일 앱 시각화 미지원 정보 확인 필요**
   - 현재: "모바일(iOS/Android)에서는 시각화가 표시되지 않음"
   - 문제: 2026년 3월 기준으로 모바일 앱에서의 시각화 지원 여부가 변경되었을 수 있음. 최신 상태 확인 필요

9. **[lessons-phase7-8.ts:247] 9-4 레슨의 next 링크가 자기 Phase 시작(9-1)으로 순환됨**
   - 현재: `next: "9-1"` (9-4 → 9-1로 순환)
   - 수정안: 다음 Phase인 10-1 (Worktree)로 연결해야 함 → `next: "10-1"`

10. **[lessons-worktree.ts:327] 10-4의 next가 "11-1"로 되어 있으나 해당 레슨 존재 여부 미확인**
    - 현재: `next: "11-1"`
    - 확인 필요: 11-1 레슨이 실제로 존재하는지 확인. 없다면 마지막 레슨임을 표시하거나 올바른 다음 레슨으로 연결

---

### Content Improvements

11. **[lessons-phase7-8.ts 8-1] Claude Code의 hooks 기능 언급 추가 권장**
    - 현재: MCP 서버 개념만 설명
    - 개선안: Claude Code의 hooks(PreToolUse, PostToolUse, Notification, Stop) 기능이 MCP와 함께 자동화를 구현하는 중요한 메커니즘임을 간략히 언급하면 좋음. hooks는 settings.json에서 설정하며, 도구 실행 전후에 자동으로 셸 명령을 실행할 수 있음
    - 참고: https://code.claude.com/docs/en/hooks

12. **[lessons-phase7-8.ts 8-1] Claude Code의 MCP 설정 scope 개념 추가 권장**
    - Claude Code에서 MCP 서버 설정 시 `--scope` 옵션으로 local(현재 프로젝트), project(.mcp.json으로 팀 공유), user(모든 프로젝트)를 선택할 수 있음. 이 개념은 팀 단위 노무사 사무실에서 MCP 설정을 공유할 때 중요
    - 참고: https://code.claude.com/docs/en/mcp

13. **[lessons-worktree.ts 10-1] Worktree + Sub-agent 병렬 실행 개념 추가 권장**
    - 현재: 터미널 창을 여러 개 열어서 수동으로 병렬 작업하는 방식만 설명
    - 개선안: Claude Code가 sub-agent를 spawn할 때 각 sub-agent에 자동으로 별도 worktree를 배정하는 기능도 있음. 이는 좀 더 고급 기능이지만, "이런 것도 가능하다" 정도로 언급하면 좋음
    - 참고: https://www.dandoescode.com/blog/parallel-vibe-coding-with-git-worktrees

14. **[lessons-worktree.ts 10-2] `--tmux` 플래그 언급 추가 권장**
    - Claude Code는 `--worktree`와 함께 `--tmux` 플래그를 사용하여 각 worktree 세션을 tmux 세션으로 자동 분리할 수 있음. iTerm2 분할 외에 tmux 방식도 소개하면 좋음

15. **[lessons-visualization.ts 4-5] Claude Code(CLI)에서의 시각화 한계 명시 필요**
    - 현재: claude.ai 웹과 데스크톱 앱에서의 시각화만 설명
    - 개선안: Claude Code(터미널/CLI)에서는 인라인 시각화나 아티팩트가 표시되지 않으므로, 시각화 작업은 claude.ai 웹이나 Claude Desktop 앱에서 해야 함을 명확히 구분해야 함. 교육 대상이 Claude Code를 배우는 노무사이므로 이 구분이 중요

16. **[lessons-phase7-8.ts 전체] Claude Code의 권한 모드(Permission Mode) 설명 부재**
    - Claude Code에는 Normal, Plan, Auto-accept, Bypass 4가지 권한 모드가 있으며, MCP 서버 사용 시 권한 설정이 중요. 특히 노무사가 민감한 의뢰인 정보를 다루는 MCP 연동에서 권한 모드 이해가 필수적
    - 참고: https://code.claude.com/docs/en/permissions

---

### Positive Findings (Well Done)

- **노무사 비유가 매우 효과적**: 캐비닛/책상 비유(Worktree), 사무장 비유(MCP) 등이 비개발자 대상에게 적절
- **Worktree 설명이 전반적으로 정확**: `claude --worktree` 명령어, `.claude/worktrees/` 경로, 자동 정리 기능 등이 실제 동작과 일치
- **단계별 실습 구성이 우수**: 특히 10-4 레슨의 따라하기 실습이 실용적
- **시각화 레슨이 포괄적**: 인라인, 아티팩트, 분석 도구의 구분이 명확하고 노무사 실무 예시가 풍부
- **보안/개인정보 주의사항이 적절히 포함됨**: MCP 권한 최소화, 개인정보 보호 등의 경고가 잘 들어가 있음
- **Git worktree의 3가지 원칙이 실용적**: 동시 운영 수 제한, 즉시 정리, 브랜치 중복 금지 원칙이 적절

---

### Accuracy Score: 7/10

### Summary

전체적으로 Worktree 설명이 가장 정확하고 잘 구성되어 있으며, 실제 Claude Code의 `--worktree` 기능과 일치합니다. 시각화 레슨도 Claude의 3가지 시각화 도구 구분이 명확합니다.

가장 큰 문제는 MCP 설정 부분입니다. Claude Code(CLI)에서의 MCP 설정 방법(`claude mcp add`)이 빠져 있고, `claude_desktop_config.json`만 언급하여 Claude Desktop 전용 설정으로 오해할 수 있습니다. 또한 MCP 서버 패키지명이 실제 존재하지 않는 가상 패키지명입니다.

부차적으로 Claude Code의 hooks 시스템(PreToolUse, PostToolUse, Notification, Stop)과 권한 모드(Permission Mode)에 대한 내용이 전혀 없어, 고급 과정으로서 보완이 필요합니다. 레슨 간 연결(9-4의 next가 9-1로 순환되는 문제)도 수정이 필요합니다.

**핵심 수정 우선순위:**
1. MCP 설정을 Claude Code CLI 방식(`claude mcp add`)으로 보완
2. 가상 패키지명을 실제 패키지로 교체하거나 명확히 예시임을 표시
3. 9-4 → 10-1 네비게이션 링크 수정
4. Claude Code hooks / Permission Mode 내용 추가 검토

---

**Sources:**
- [Claude Code Hooks Reference](https://code.claude.com/docs/en/hooks)
- [Claude Code MCP Configuration](https://code.claude.com/docs/en/mcp)
- [Claude Code Permissions](https://code.claude.com/docs/en/permissions)
- [Claude Code Worktree Workflows](https://code.claude.com/docs/en/common-workflows)
- [Parallel Vibe Coding with Git Worktrees](https://www.dandoescode.com/blog/parallel-vibe-coding-with-git-worktrees)
- [Claude Code Hooks Practical Guide](https://www.eesel.ai/blog/hooks-in-claude-code)
