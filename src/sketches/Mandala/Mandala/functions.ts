import p5 from 'p5'
import type { ColorDirection } from '../classes/Config'
import { PHI, ROOT2, ROOT3 } from '../constants'

/**
 * Return a random color from a color palette
 * @param {string[]} colors - The array containing the color palette
 * @returns {string}
 */
export const pickRandomColor = (colors: string[]): string => {
  const randomInt = Math.floor(Math.random() * colors.length)
  return colors[randomInt]
}

/**
 * Pick a color from the color palette using the layer number
 * @param {string[]} colors - The array containing the color palette
 * @param {number} layer - The layer number to use for selecting the color
 * @returns {string}
 */
export const pickOrderedColor = (colors: string[], layer: number): string => {
  let color: string = '#000' // Black by default
  try {
    // Need to also consider negative numbers now
    color = colors[reduceNum(layer, colors.length)]
  } catch (error) {
    color = colors[0]
  }
  return color
}

/**
 * Reduce a number to its smallest version within a range
 * @param {number} currentNumber - The current version of a number
 * @param {number} limit - The maximum number in the range
 * @returns {number}
 */
const reduceNum = (currentNumber: number, limit: number): number => {
  if (currentNumber >= limit) {
    return reduceNum(currentNumber - limit, limit)
  } else if (currentNumber < 0) {
    return reduceNum(currentNumber + limit, limit)
  } else {
    return currentNumber
  }
}

/**
 * Calculate the inner radius of the Star shape
 * @param {number} radius - The outer radius of the shape
 * @param {number} sides - The number of sides
 * @returns {number}
 */
export const calculateInnerStarRadius = (
  radius: number,
  sides: number
): number => {
  switch (sides) {
    case 3:
      return radius / 4.0
    case 4:
      return radius / 2.0
    case 5:
      return radius / (PHI + 1)
    case 6:
      return radius / ROOT3
    default:
      return radius / 2.0
  }
}

/**
 * Calculate the fractal radius to apply to a shape
 * @param {number} radius - The original radius of the shape
 * @param {number} sides - The number of sides
 * @returns {number}
 */
export const calculateInnerFractalRadius = (
  radius: number,
  sides: number
): number => {
  switch (sides) {
    case 3:
      return radius / 2.0
    case 4:
      return radius / ROOT2
    case 5:
      return (radius * PHI) / 2.0
    case 6:
      return radius / (2 / ROOT3)
    default:
      return radius / 2.0
  }
}

/**
 * Calculate the fractal rotation to apply to a shape
 * @param {p5} p - The p5.js object
 * @param {number} sides - The number of sides
 * @returns {number}
 */
export const calculateFlippedFractalRotation = (p: p5, sides: number) => {
  switch (sides) {
    case 3:
      return p.PI
    case 4:
      return p.PI / 4
    case 5:
      return p.PI
    case 6:
      return p.PI / 2
    default:
      return p.PI / 2
  }
}

/**
 * Determine the color based on the color parametars
 * @param colorScheme
 * @param isRandom
 * @param layer
 */
export const generateColor = (
  colorScheme: string[],
  isRandom: boolean,
  direction: ColorDirection,
  layer: number
) => {
  if (isRandom) {
    return pickRandomColor(colorScheme)
  } else {
    return pickOrderedColor(
      direction !== 'contracting' ? colorScheme : colorScheme.reverse(),
      layer
    )
  }
}

export type Coordinate = { x: number; y: number }

/**
 * Method to generate x/y coordinates for rendering a geometry
 * @param {p5} p - The p5.js object
 * @param {number} sides - The number of sides of the shape pattern
 * @param {number} radius - The radius of the shape
 * @param {number} overflow - The extra angle to add to the shape
 * @param {Coordinate} displacement - The extra X and Y values to add to the shape
 * @returns {Coordinate[]}
 */
export const createCoordinates = (
  p: p5,
  sides: number,
  radius: number,
  overflow?: number,
  displacement?: Coordinate
): Coordinate[] => {
  let angle = p.TWO_PI / sides // Angle at centre point of shape
  let initial = overflow ? overflow : 0
  let dx = displacement ? displacement.x : 0
  let dy = displacement ? displacement.y : 0
  const coordinates: Coordinate[] = []
  for (let a = initial; a < p.TWO_PI + initial; a += angle) {
    let sx = p.cos(a) * radius + dx
    let sy = p.sin(a) * radius + dy
    coordinates.push({ x: sx, y: sy })
  }
  return coordinates
}

/**
 * Method to add the background color between each color in the color scheme
 * @param {string[]} colors - The color scheme
 * @param {string} bg - The background color
 * @returns {string[]}
 */
export function addSpaceToColors(colors: string[], bg: string): string[] {
  const spacedColors: string[] = []
  colors.forEach((color) => {
    spacedColors.push(color)
    spacedColors.push(bg)
  })
  return spacedColors
}
