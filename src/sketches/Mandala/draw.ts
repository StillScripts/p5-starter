import p5 from 'p5'
import { generateColor } from './Mandala/functions'
import {
  ColorConfig,
  _PatternConfig,
  _PhysicalFeatures
} from './classes/Config'
import { PhysicalShape } from './classes/PhysicalShape'

export type ShiftOption = 'expand' | 'contract'

/**
 * Method to handle how colors are rendered
 * @param {p5} p
 * @param {PhysicalShape} shape
 */
const handleColors = (
  p: p5,
  shape: PhysicalShape,
  colorConfig: ColorConfig
) => {
  const { incrementalLayer, layer } = shape
  const {
    bgColorScheme,
    strokeColorScheme,
    isRandom,
    direction = 'expanding',
    innerColorChange
  } = colorConfig
  const colorLayer = innerColorChange ? incrementalLayer : layer
  p.fill(
    p.color(generateColor(bgColorScheme, !!isRandom, direction, colorLayer))
  )
  p.stroke(
    p.color(generateColor(strokeColorScheme, !!isRandom, direction, colorLayer))
  )
}

/**
 * Method to render a regular shape or a star
 * @param {p5} p - The p5.js object
 * @param {Shape} shape - The shape object
 * @param {_PhysicalFeatures} pattern - The config used across the pattern
 * @returns {void}
 */
export const renderShape = (
  p: p5,
  shape: PhysicalShape,
  pattern: _PhysicalFeatures
): void => {
  const { isRound } = shape.shapeDesign
  let radius = shape.diameter / 2.0 // Radius of shape
  if (isRound && shape.diameter) {
    handleColors(p, shape, pattern.colorConfig)
    p.strokeWeight(1)
    p.circle(0, 0, radius * 2)
  } else {
    // Make the shape
    p.beginShape()
    shape.coordinates.forEach((point) => {
      p.vertex(point.x, point.y)
    })
    p.rotate(shape.rotation)
    handleColors(p, shape, pattern.colorConfig)
    p.strokeWeight(3)
    p.endShape(p.CLOSE)
  }
}

/**
 * Method to draw all shapes on the canvas
 * @param p
 * @param shapes
 */
export const draw = (
  p: p5,
  shapes: PhysicalShape[],
  patternConfig: _PatternConfig
) => {
  // Use this to prevent background issues
  // p.push();
  // p.background(0);
  // p.pop();

  if (patternConfig.animate) {
    patternConfig.innerPattern.colorConfig.shiftColors('contract', true, true)
    patternConfig.outerPattern.colorConfig.shiftColors('expand', true, true)
  }

  let inner = false

  shapes.forEach((shape) => {
    if (shape.isEdgeShape) inner = true // Change to the inner pattern when it crosses the edge shape

    p.push()
    p.translate(p.width * 0.5 + shape.x, p.height * 0.5 + shape.y)
    renderShape(
      p,
      shape,
      inner ? patternConfig.innerPattern : patternConfig.outerPattern
    )
    p.pop()
  })
}
