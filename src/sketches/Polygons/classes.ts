import p5 from "p5";
import { Coordinate } from "../types";

/**
 * A simple shape with points representing the its coordinates.
 */
export class Polygon {
  radius: number;
  sides: number;
  points: Coordinate[];

  constructor(p: p5, radius: number = 50, sides: number = 4, points?: Coordinate[]) {
    this.radius = radius;
    this.sides = sides;
    this.points = points || this.createRegularPoints(p, sides, radius);
  }

  /**
   *
   * @param {p5} p - The p5.js object
   * @param {number} sides - The number of sides the shape has
   * @param {number} radius - The radius of the shape
   * @returns {Coordinate[]} - The array of points that represent the shapes corners
   */
  createRegularPoints(p: p5, sides: number, radius: number): Coordinate[] {
    const points: Coordinate[] = [];
    const angle = p.TWO_PI / sides;
    for (let i = 0; i < p.TWO_PI; i += angle) {
      let sx = p.cos(i) * radius;
      let sy = p.sin(i) * radius;
      points.push({ x: sx, y: sy });
    }
    return points;
  }
}
