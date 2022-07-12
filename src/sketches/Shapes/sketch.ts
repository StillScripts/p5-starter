import { Circle, Ellipse, Polygon, RotatingShapes } from "./classes";
import type p5 from "p5";

/**
 * This sketch is an animation of various 2D shapes rotating around the canvas.
 * It uses a global RotatingShapes object to store and render the shapes.
 * @param {p5} p - The p5.js object
 */
export default function shapesSketch(p: p5) {
  let painter: RotatingShapes;

  p.setup = () => {
    p.createCanvas(400, 400);
    painter = new RotatingShapes([
      new Circle("red", { x: -90, y: 50 }, 30),
      new Ellipse("orange", { x: 120, y: -60 }, 40, 60),
      new Polygon(p, "green", { x: 30, y: 90 }, 20, 4),
      new Polygon(p, "blue", { x: -20, y: -20 }, 20, 6),
      new Polygon(p, "purple", { x: -80, y: -110}, 20, 3)
    ]);
  };

  p.draw = () => {
    p.background(10);
    painter.run(p);
  };
}
