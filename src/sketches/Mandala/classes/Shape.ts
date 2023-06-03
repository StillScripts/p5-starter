import p5 from "p5";

export interface _Shape {
  x: number; // x coordinate used in p.translate()
  y: number; // y coordinate used in p.translate
  sides: number; // number of sides the shape has
  diameter: number; // diameter of the shape within a circle
  rotation?: number; // optional rotation to p.rotate()
}

export type Coordinate = { x: number; y: number }; // A coordinate with x and y points

/**
 * Basic shape where each side is the same length.
 * It is used as the parent of all shapes in geometric animations
 */
export class Shape implements _Shape {
  x: number;
  y: number;
  readonly sides: number;
  diameter: number;
  rotation: number;
  coordinates: Coordinate[];
  constructor(
    p: p5,
    x: number,
    y: number,
    sides: number,
    diameter: number = 100,
    rotation: number = 0
  ) {
    this.x = x;
    this.y = y;
    this.sides = sides;
    this.diameter = diameter;
    this.rotation = this.calculateRotation(p, sides, rotation);
    this.coordinates = this.createRegularCoordinates(
      p,
      sides,
      diameter / 2.0,
      this.rotation
    );
  }

  /**
   * Method to normalise the rotation of the fundamental shapes
   * @param {p5} p - p5.js object
   * @param {number} sides - number of sides shape has
   * @param {number} baseRotation - optional extra rotation to add to default rotation
   * @returns {number}
   */
  calculateRotation(p: p5, sides: number, baseRotation: number): number {
    switch (sides) {
      case 3: // Triangle
        return -p.PI / 2 + baseRotation;
      case 4: // Square
        return -p.PI / 4 + baseRotation;
      case 5: // Pentagon
        return -p.PI / 2 + baseRotation;
      case 6: // Hexagon
        return 0 + baseRotation;
      default:
        return baseRotation;
    }
  }

  /**
   * Method to generate the x/y coordinates of each point in a regular polygon
   * @param {p5} p - The p5.js object
   * @param {number} sides - The number of sides of the shape pattern
   * @param {number} radius - The radius of the shape
   * @param {number} baseRotation - The initial rotation of the shape
   * @returns {void}
   */
  createRegularCoordinates = (
    p: p5,
    sides: number,
    radius: number,
    baseRotation: number
  ): Coordinate[] => {
    const coordinates: Coordinate[] = [];
    let angle = p.TWO_PI / sides; // Angle at centre point of shape
    for (let a = baseRotation; a < p.TWO_PI + baseRotation; a += angle) {
      let sx = p.cos(a) * radius;
      let sy = p.sin(a) * radius;
      coordinates.push({ x: sx, y: sy });
    }
    return coordinates;
  };
}
