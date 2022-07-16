import bouncyBubbleSketch from "./BouncyBubbles/sketch";
import bubbleSortSketch from "./BubbleSort/sketch";
import clockSketch from "./Clock/sketch";
import particleSystemSketch from "./ParticleSystem/sketch";
import shapesSketch from "./Shapes/sketch";

export const sketchMap = {
  Shapes: shapesSketch,
  Clock: clockSketch,
  BubbleSort: bubbleSortSketch,
  ParticleSystem: particleSystemSketch,
  BouncyBubbles: bouncyBubbleSketch,
} as const;

export type SketchKey = keyof typeof sketchMap;
