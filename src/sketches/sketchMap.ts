import type p5 from "p5";
import bouncyBubbleSketch from "./BouncyBubbles";
import bubbleSortSketch from "./BubbleSort";
import clockSketch from "./Clock";
import particleSystemSketch from "./ParticleSystem";
import shapesSketch from "./Shapes";

export const sketchMap: Record<string, (p: p5) => void> = {
  Shapes: shapesSketch,
  Clock: clockSketch,
  BubbleSort: bubbleSortSketch,
  ParticleSystem: particleSystemSketch,
  BouncyBubbles: bouncyBubbleSketch,
} as const;

export type SketchKey = keyof typeof sketchMap;
