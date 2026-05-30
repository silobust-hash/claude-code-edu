import { lessonsPhase1to3 } from "./lessons-phase1-3";
import { lessonTerminal } from "./lessons-terminal";
import { lessonsPhase4to6 } from "./lessons-phase4-6";
import { lessonsMarketplace } from "./lessons-marketplace";
import { lessonsPhase7to8 } from "./lessons-phase7-8";
import { lessonsWorktree } from "./lessons-worktree";
import { lessonsPhase9 as lessonsPhase11 } from "./lessons-phase9";
import { lessonsPhase12 } from "./lessons-phase12";
import { lessonsPhase13 } from "./lessons-phase13";
import { lessonGlossary } from "./lessons-glossary";
import { lessonsVisualization } from "./lessons-visualization";

export const lessons: Record<string, any> = {
  ...lessonsPhase1to3,
  ...lessonGlossary,
  ...lessonTerminal,
  ...lessonsPhase4to6,
  ...lessonsVisualization,
  ...lessonsMarketplace,
  ...lessonsPhase7to8,
  ...lessonsWorktree,
  ...lessonsPhase11,
  ...lessonsPhase12,
  ...lessonsPhase13,
};
