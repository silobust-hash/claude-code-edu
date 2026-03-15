import { lessonsPhase1to3 } from "./lessons-phase1-3";
import { lessonsPhase4to6 } from "./lessons-phase4-6";
import { lessonsPhase7to8 } from "./lessons-phase7-8";
import { lessonsPhase9 } from "./lessons-phase9";

export const lessons: Record<string, any> = {
  ...lessonsPhase1to3,
  ...lessonsPhase4to6,
  ...lessonsPhase7to8,
  ...lessonsPhase9,
};
