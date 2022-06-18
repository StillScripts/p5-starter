import p5 from "p5";
import { Coordinate, ShapeType } from "../types";

/**
 * A basic form in the p5.js canvas with a color, a location on the canvas.
 * and a radius for its size.
 */
export class Shape {
  color: string;
  location: Coordinate;
  radius: number;
  type: ShapeType;
  // The variables below are only here to enable polymorphic usage of Shape children
  points?: Coordinate[];
  width?: number;
  height?: number;
  constructor(
    color: string,
    location: Coordinate,
    radius: number,
    type: ShapeType
  ) {
    this.color = color;
    this.location = location;
    this.radius = radius;
    this.type = type;
  }
}

/**
 * A circle shape that will be rendered with p5.circle()
 */
export class Circle extends Shape {
  constructor(color: string, location: Coordinate, radius: number = 50) {
    super(color, location, radius, "circle");
  }
}

/**
 * An ellipse shape that will be rendered with p5.ellipse()
 */
export class Ellipse extends Shape {
  constructor(
    color: string,
    location: Coordinate,
    width: number,
    height: number
  ) {
    super(color, location, 50, "ellipse");
    this.width = width;
    this.height = height;
  }
}

/**
 * A shape with a specific number of sides and points representing the position
 * of each of its corners.
 */
export class Polygon extends Shape {
  sides: number;

  constructor(
    p: p5,
    color: string,
    location: Coordinate,
    radius: number = 50,
    sides: number = 4,
    points?: Coordinate[]
  ) {
    super(color, location, radius, "polygon");
    this.location = location;
    this.radius = radius;
    this.sides = sides;
    this.points =
      points || this.createRegularPoints(p, location, sides, radius);
  }

  /**
   * Generate the corners of a regular polygon, making each side an equal length
   * @param {p5} p - The p5.js object
   * @param {Coordinate} location - The central location of the shape on the canvas
   * @param {number} sides - The number of sides the shape has
   * @param {number} radius - The radius of the shape
   * @returns {Coordinate[]} - The array of points that represent the shapes corners
   */
  createRegularPoints(
    p: p5,
    location: Coordinate,
    sides: number,
    radius: number
  ): Coordinate[] {
    const { x, y } = location;
    const points: Coordinate[] = [];
    const angle = p.TWO_PI / sides;
    for (let i = 0; i < p.TWO_PI; i += angle) {
      let sx = x + p.cos(i) * radius;
      let sy = y + p.sin(i) * radius;
      points.push({ x: sx, y: sy });
    }
    return points;
  }
}

/**
 * The object which holds all the shapes and renders each one on the canvas
 * while also applying rotation
 */
export class RotatingShapes {
  shapes: Shape[];
  constructor(shapes: Shape[]) {
    this.shapes = shapes;
  }

  /**
   * Render each shape on the canvas and apply rotation
   * @param {p5} p - The p5.js object
   */
  run(p: p5) {
    this.shapes.forEach((shape) => {
      const { color, location, type, radius, points, width, height } = shape;

      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.fill(p.color(color));
      p.rotate(p.frameCount / 50); // Apply rotation

      // Apply a different rendering method based on the shape type
      switch (type) {
        case "circle":
          p.circle(location.x, location.y, radius * 2);
          break;
        case "ellipse":
          if (width && height) p.ellipse(location.x, location.y, width, height);
          break;
        case "polygon":
          p.beginShape();
          points && points.forEach((point) => p.vertex(point.x, point.y));
          p.endShape(p.CLOSE);
          break;
        default:
          p.circle(location.x, location.y, radius * 2);
          break;
      }
      p.pop();
    });
  }
}
