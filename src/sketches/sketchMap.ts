import { particleSystemSketch, polygonsSketch } from ".";

export const sketchMap = {
  ParticleSystem: particleSystemSketch,
  Polygon: polygonsSketch,
} as const;

export type SketchKey = keyof typeof sketchMap;
