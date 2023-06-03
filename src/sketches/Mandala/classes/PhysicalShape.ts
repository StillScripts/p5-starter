import p5 from 'p5'
import { calculateInnerStarRadius } from '../Mandala/functions'
import {
  ShapeDesign,
  _ColorConfig,
  _PhysicalFeatures,
  _ShapeDesign
} from './Config'
import { Coordinate, Shape, _Shape } from './Shape'

export interface _PhysicalShape extends _Shape {
  layer: number // The layer of the base shape within the overall pattern
  incrementalLayer: number // The internal layer of the shape based on inner fractals
  shapeDesign: ShapeDesign // The pattern to apply to the shape
  isEdgeShape?: boolean // Applied if the shape is the edge where it switched from outer to inner
}

/**
 * Class used for shapes in the geometry
 */
export class PhysicalShape extends Shape implements _PhysicalShape {
  layer: number
  incrementalLayer: number
  shapeDesign: ShapeDesign
  isEdgeShape?: boolean
  constructor(
    p: p5,
    x: number,
    y: number,
    sides: number,
    diameter: number,
    layer: number,
    incrementalLayer: number,
    shapeDesign: _ShapeDesign,
    rotation?: number,
    isEdgeShape?: boolean
  ) {
    super(p, x, y, sides, diameter, rotation)
    this.layer = layer
    this.incrementalLayer = incrementalLayer
    this.shapeDesign = shapeDesign
    this.coordinates = this.createCustomCoordinates(
      p,
      sides,
      diameter / 2.0,
      shapeDesign
    )
    this.isEdgeShape = isEdgeShape
  }

  /**
   * Method to generate the x/y coordinates of each point in a custom polygon
   * @param {p5} p - The p5.js object
   * @param {number} sides - The number of sides of the shape pattern
   * @param {number} radius - The radius of the shape
   * @param {_ShapeDesign} shapeDesign - The shape design
   * @returns {Coordinate[]}
   */
  createCustomCoordinates = (
    p: p5,
    sides: number,
    radius: number,
    shapeDesign: _ShapeDesign
  ): Coordinate[] => {
    const { isStar, isInverted } = shapeDesign
    const coordinates: Coordinate[] = []
    let angle = p.TWO_PI / sides // Angle at centre point of shape
    let halfAngle: number = 0 // Angle used for inner points of stars
    let innerRadius: number = 1 // Radius used for inner points of stars
    if (isStar) {
      // If shape is a star, generate the values for halfAngle and innerRadius
      halfAngle = angle / 2.0
      innerRadius = calculateInnerStarRadius(radius, sides)
    }
    for (let a = 0; a < p.TWO_PI + 0; a += angle) {
      let sx = p.cos(a) * radius
      let sy = p.sin(a) * radius
      coordinates.push({ x: sx, y: sy })
      isInverted && coordinates.push({ x: 0, y: 0 })
      if (isStar) {
        // If shape is a star generate the points for the star
        sx = p.cos(a + halfAngle) * innerRadius
        sy = p.sin(a + halfAngle) * innerRadius
        coordinates.push({ x: sx, y: sy })
        isInverted && coordinates.push({ x: 0, y: 0 })
      }
    }
    return coordinates
  }
}
