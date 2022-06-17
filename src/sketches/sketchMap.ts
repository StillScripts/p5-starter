import type p5 from "p5";

import rotatingShapesSketch from "./RotatingShapes";
import particleSystemSketch from "./ParticleSystem";

export const sketchMap: Record<string, (p: p5) => void> = {
  RotatingShapes: rotatingShapesSketch,
  ParticleSystem: particleSystemSketch,
} as const;

export type SketchKey = keyof typeof sketchMap;
