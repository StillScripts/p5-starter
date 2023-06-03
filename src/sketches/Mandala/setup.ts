import p5 from 'p5'
import type { PatternConfig } from './classes/Config'
import { createMandala } from './Mandala/mandalaFunctions'

export const setup = (p: p5, patternConfig: PatternConfig) => {
  p.setup = () => {
    p.frameRate(1)
    p.createCanvas(patternConfig.canvas[0], patternConfig.canvas[1])
    p.background(
      p.color(patternConfig.outerPattern.colorConfig.backgroundColor)
    )
  }

  return createMandala(p, patternConfig)
}
