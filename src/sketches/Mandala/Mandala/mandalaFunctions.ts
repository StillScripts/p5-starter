import p5 from 'p5'
import {
  calculateFlippedFractalRotation,
  calculateInnerFractalRadius,
  Coordinate,
  createCoordinates
} from './functions'
import { PatternConfig, _PhysicalFeatures } from '../classes/Config'
import { PhysicalShape } from '../classes/PhysicalShape'
import { PHI, ROOT2, ROOT3 } from '../constants'

export type MandalaType = 'square' | 'triangle' | 'triangle-flipped' | 'pent' // Available Mandala Patterns

export type CoreMandalaValues = {
  shapeDiameter: number // Diameter of outermost shapes
  patternDiameter: number // Diameter of pattern
  fractalRatio: number // Ratio applied between each layer of pattern
}

/**
 * Method to calculate the core values needed for the square
 * and triangle-1 pattern
 * @param {p5} p - The p5.js Object
 * @param {number} diameter - The initial diameter of the pattern
 * @param {number} sides - The number of sides in the pattern
 * @param {MandalaType} pattern - The type of pattern being applied to the mandala
 * @returns {CoreMandalaValues}
 */
const calculateCoreValues = (
  p: p5,
  diameter: number,
  sides: number,
  pattern: MandalaType
): CoreMandalaValues => {
  const startRadius = diameter / 2.0 // Radius between centre and start of shape
  const innerAngle = p.TWO_PI / sides // Angle at centre of circle
  const x = 2 * startRadius * p.sin(innerAngle / 2) // Length of side at bottom of triangle
  const reduceAngle = pattern === 'triangle' ? p.TWO_PI / 3 : p.TWO_PI / 4 // 120 if triangles, 90 if squares
  const outerAngle = p.PI - innerAngle - reduceAngle // Angle of outer triangle
  const shapeSide = x / (2 * p.sin(outerAngle / 2)) // Side length of shape
  const reduceLength = pattern === 'triangle' ? ROOT3 : ROOT2 // Ratio between shape side and shape radius
  const shapeRadius = shapeSide / reduceLength // Radius of shape
  const shapeDiameter = 4 * shapeRadius // Diameter of shape
  const patternDiameter = 2 * (startRadius + shapeRadius) // Diameter of pattern
  // If pattern is triangle, the ratio is between shape length and x
  const triFractalPatternRatio = shapeSide / x // Fractal ratio if pattern is triangle
  const bottomDiamondAngle = p.PI - outerAngle // Angle of bottom of diamond in square pattern
  const smallerSideLength = x / (2 * p.sin(bottomDiamondAngle / 2)) // Side length of smaller square
  const sqFractalPatternRatio = shapeSide / smallerSideLength // Fractal ratio if pattern is square
  const fractalRatio =
    pattern === 'triangle' ? triFractalPatternRatio : sqFractalPatternRatio // Fractal ratio
  return { shapeDiameter, patternDiameter, fractalRatio }
}

/**
 * Method to calculate the core values needed for the
 * triangle-2 pattern
 * @param {p5} p - The p5.js Object
 * @param {number} diameter - The initial diameter of the pattern
 * @param {number} sides - The number of sides in the pattern
 * @returns {CoreMandalaValues}
 */
const calculateFlippedCoreValues = (
  p: p5,
  diameter: number,
  sides: number
): CoreMandalaValues => {
  const startRadius = diameter / 2.0 // Radius between centre and start of shape
  const innerAngle = p.TWO_PI / sides // Angle at centre of circle
  const shapeSide = 2 * startRadius * p.sin(innerAngle / 2) // Length of equilateral triangle
  const angleA = p.PI / 3 - p.PI / sides // Double angle in isosceles triangle
  const angleB = p.PI - 2 * angleA // Single angle in isosceles triangle
  const y = 2 * shapeSide * p.sin(angleB / 2) // Larger side in isosceles triangle
  const fractalRatio = y / shapeSide // Ratio between each layer in fractal
  const triRadius = shapeSide / ROOT3 // Radius of equilateral triangle
  const shapeDiameter = triRadius * 4 // Diameter of equilateral triangle
  const smallerTriRadius = triRadius / 2 // Line between bottom of triangle and centre
  const properPatternRadius =
    Math.sqrt(startRadius ** 2 - shapeSide ** 2 / 4) + smallerTriRadius // Radius touching bottom of triangle
  const patternDiameter = properPatternRadius * 2 // Diameter of pattern used for shape
  return { shapeDiameter, patternDiameter, fractalRatio }
}

/**
 * Method which creates all shapes in the mandala, including each layer, and the inner fractal
 * shapes if there are any
 * @param {p5} p - The p5.js object
 * @param coordinates - The starting coordinates of the outermost layer
 * @param rotation - The rotation applied to the pattern
 * @param coreValues - The values that have been created through the trigonemetric equations
 */
const generateEachLayer = (
  p: p5,
  coordinates: Coordinate[],
  rotation: number,
  coreValues: CoreMandalaValues,
  patternConfig: PatternConfig
) => {
  let shapes: PhysicalShape[] = [] // Store all shapes in this array
  const { mandala } = patternConfig
  const { displacement, limit, numberOfShapes, patternType } = mandala
  let { fractalRatio, patternDiameter, shapeDiameter } = coreValues
  let spiralIncrementor = 0
  const { innerPattern, outerPattern } = patternConfig
  let pattern: _PhysicalFeatures = outerPattern
  let switchedToInner = false
  let isEdgeShape: boolean = false
  const sides = patternType === 'square' ? 4 : patternType === 'pent' ? 5 : 3 // Number of sides on the shape
  console.log('shapeDiameter: ' + shapeDiameter)
  console.log('patternDiameter: ' + patternDiameter)

  // Create all the layers of the geometry within the limit range
  for (let layer = 0; layer < limit; layer++) {
    if (!switchedToInner && patternDiameter < patternConfig.edgeDiameter) {
      // Make the switch to inner pattern when edge condition is altered
      pattern = innerPattern
      switchedToInner = true
      isEdgeShape = true
    }
    let runOnce = true // Set to true so that loop when a shape at each coordinate runs at least once

    // For triangle patterns, to make a spiral, every 2 layers we need to SHIFT the pattern by 1.
    if (patternType !== 'square' && layer % 2 == 0 && layer !== 0) {
      spiralIncrementor += 1
    } else if (patternType === 'square' || patternType === 'pent') {
      // For square patterns, to make a spiral, every layer the pattern is shifted by 1
      spiralIncrementor += 1
    }
    // Create a shape for each coordinate in the layer
    coordinates.forEach((coordinate, i2) => {
      runOnce = true // Ensure run once is set to tru
      let currentDiameter = shapeDiameter
      let currentRotation = rotation
      const shapeLayer =
        pattern.colorConfig.colorPatternType === 'layers'
          ? layer // Layered pattern applied to colors
          : i2 - spiralIncrementor // Spiral pattern applied to colors
      let incrementalLayer = shapeLayer // Increment the layer

      // Create a single shape, including its inner fractals

      while (
        runOnce ||
        (pattern.shapeDesign.innerFractals !== 'none' && currentDiameter > 60)
      ) {
        shapes.push(
          new PhysicalShape(
            p,
            coordinate.x,
            coordinate.y,
            sides,
            currentDiameter,
            shapeLayer,
            incrementalLayer,
            pattern.shapeDesign,
            currentRotation,
            isEdgeShape
          )
        )
        currentDiameter = calculateInnerFractalRadius(currentDiameter, sides)
        const rotator =
          pattern.shapeDesign.innerFractals === 'flipped'
            ? calculateFlippedFractalRotation(p, sides)
            : 0
        currentRotation += rotator // Adjust the inner fractal based on the appropriate rotation
        incrementalLayer += 1 // Increment the incremental layer
        runOnce = false // End loop if not generating inner fractal
      }
      // shapes.push( // ADD AN INVERTED SHAPE AT CENTRE
      //   new PhysicalShape(
      //     p,
      //     coordinate.x,
      //     coordinate.y,
      //     sides,
      //     currentDiameter,
      //     shapeLayer,
      //     incrementalLayer,
      //     {...pattern.shapeDesign, isInverted: true},
      //     currentRotation,
      //     isEdgeShape
      //   )
      // );
      rotation += p.TWO_PI / numberOfShapes // Adjust rotation for each triangle
    })

    // Reduce diameters by the appropriate ratio
    shapeDiameter = shapeDiameter / fractalRatio // Reduce diameter of shapes
    console.log('shapeDiameter: ' + shapeDiameter)
    patternDiameter = patternDiameter / fractalRatio // Reduce diameter of overall pattern
    console.log('patternDiameter: ' + patternDiameter)

    // Reset rotation based on the layer and type of pattern
    patternType === 'square'
      ? (rotation = -p.PI / 4) // Square rotation reset
      : patternType === 'pent'
      ? (rotation = p.PI / 2)
      : patternType === 'triangle'
      ? layer % 2 === 0
        ? (rotation = -p.PI / 2 + p.PI / numberOfShapes) // Triangle rotation reset
        : (rotation = -p.PI / 2)
      : layer % 2 === 0
      ? (rotation = p.PI / 2 + p.PI / numberOfShapes) // Triangle roatation flipped reset
      : (rotation = p.PI / 2)

    // Create new coordinates for the next layer
    coordinates = createCoordinates(
      p,
      numberOfShapes,
      patternDiameter,
      layer % 2 === 0 && patternType !== 'square' && patternType !== 'pent'
        ? p.PI / numberOfShapes
        : 0,
      displacement
    )

    if (isEdgeShape) isEdgeShape = false
  }
  return shapes
}

/**
 * Method to create a Any-sided pattern of squares
 * @param {p5} p - The p5.js object
 * @param {PatternConfig} patternConfig - The settings for the pattern
 * @returns {PhysicalShape[]}
 */
const createAnySidedSquares = (
  p: p5,
  patternConfig: PatternConfig
): PhysicalShape[] => {
  const { mandala } = patternConfig
  const { diameter, numberOfShapes, displacement } = mandala
  let sqRotation = -p.PI / 4 // rotation to apply to each square
  const coreValues = calculateCoreValues(p, diameter, numberOfShapes, 'square') // Get the core values
  let coordinates = createCoordinates(
    p,
    numberOfShapes,
    coreValues.patternDiameter,
    0,
    displacement
  ) // coordinates of Any-sided points
  const shapes = generateEachLayer(
    p,
    coordinates,
    sqRotation,
    coreValues,
    patternConfig
  )
  return shapes
}

/**
 * Method to create an any-sided triangles pattern for the shapes
 * @param {p5} p - The p5.js object
 * @param {PatternConfig} patternConfig - The settings for the pattern
 * @returns {PhysicalShape[]}
 */
const createAnySidedTriangles = (
  p: p5,
  patternConfig: PatternConfig
): PhysicalShape[] => {
  const { mandala } = patternConfig
  const { diameter, numberOfShapes, displacement } = mandala
  let triRotation = -p.PI / 2 // rotation to apply to each triangle
  const coreValues = calculateCoreValues(
    p,
    diameter,
    numberOfShapes,
    'triangle'
  ) // Get the core values
  let coordinates = createCoordinates(
    p,
    numberOfShapes,
    coreValues.patternDiameter,
    0,
    displacement
  ) // coordinates of 15-sided points

  const shapes = generateEachLayer(
    p,
    coordinates,
    triRotation,
    coreValues,
    patternConfig
  )
  return shapes
}

/**
 * Method to create an any-sided triangles pattern for the shapes
 * @param {p5} p - The p5.js object
 * @param {PatternConfig} patternConfig - The settings for the pattern
 * @returns {PhysicalShape[]}
 */
const createAnySidedTrianglesFlipped = (
  p: p5,
  patternConfig: PatternConfig
): PhysicalShape[] => {
  const { mandala } = patternConfig
  const { diameter, numberOfShapes, displacement } = mandala
  let triRotation = p.PI / 2 // rotation to apply to each triangle
  const coreValues = calculateFlippedCoreValues(p, diameter, numberOfShapes) // Get the core values
  let coordinates = createCoordinates(
    p,
    numberOfShapes,
    coreValues.patternDiameter,
    0,
    displacement
  ) // coordinates of 15-sided points
  const shapes = generateEachLayer(
    p,
    coordinates,
    triRotation,
    coreValues,
    patternConfig
  )
  return shapes
}

const createDecagonPattern = (p: p5, patternConfig: PatternConfig) => {
  const { mandala } = patternConfig
  const { diameter } = mandala
  const ratio1 = Math.sin(Math.PI / 5)
  const ratio2 = Math.tan((2 * Math.PI) / 5)
  const ratio3 = Math.tan((3 * Math.PI) / 10)
  let patternRadius = diameter / 2.0 // Radius of the decagonal pattern (decagon)
  let coordinates = createCoordinates(p, 10, patternRadius) // Coordinates of decagonal points, similar to createCoordinates()
  let shapeRadius = patternRadius / (ratio1 * (ratio3 + ratio2)) // Radius of the shape (pentagon)
  const coreValues: CoreMandalaValues = {
    shapeDiameter: shapeRadius * 2,
    patternDiameter: diameter / 2,
    fractalRatio: PHI
  }
  const shapes = generateEachLayer(
    p,
    coordinates,
    p.PI / 2,
    coreValues,
    patternConfig
  )
  return shapes
}

/**
 * Method to create a mandala pattern for the shapes
 * @param {p5} p - The p5.js object
 * @param {PatternConfig} patternConfig - The config settings for the overall geometry
 * @returns {PhysicalShape[]}
 */
export const createMandala = (
  p: p5,
  patternConfig: PatternConfig
): PhysicalShape[] => {
  const pattern = patternConfig.mandala.patternType
  if (pattern === 'square') {
    return createAnySidedSquares(p, patternConfig)
  } else if (pattern === 'triangle') {
    return createAnySidedTriangles(p, patternConfig)
  } else if (pattern === 'triangle-flipped') {
    return createAnySidedTrianglesFlipped(p, patternConfig)
  } else {
    return createDecagonPattern(p, patternConfig)
  }
}
