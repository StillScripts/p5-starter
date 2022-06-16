import type p5 from "p5";
import { particleSystemSketch, polygonsSketch } from ".";

export const sketchMap: Record<string, (p: p5) => void> = {
  Shapes: polygonsSketch,
  ParticleSystem: particleSystemSketch,
} as const;

export type SketchKey = keyof typeof sketchMap;
