import type p5 from "p5";

import clockSketch from "./Clock";
import particleSystemSketch from "./ParticleSystem";
import rotatingShapesSketch from "./RotatingShapes";

export const sketchMap: Record<string, (p: p5) => void> = {
  RotatingShapes: rotatingShapesSketch,
  Clock: clockSketch,
  ParticleSystem: particleSystemSketch,
} as const;

export type SketchKey = keyof typeof sketchMap;
