import { Circle, Ellipse, Polygon, RotatingShapes } from "./classes";
import p5 from "p5";

/**
 * This sketches is an animation of moving particles.
 * It uses a global ParticleSystem object to store and move particles.
 * It calls setup once to make a 600 x 400 canvas and initialise the ParticleSystem.
 * It calls the draw method continuously to run the animation.
 *
 * @param {p5} p - The p5.js object
 *
 */
export default function polygonsSketch(p: p5) {
  let painter: RotatingShapes;

  p.setup = () => {
    p.createCanvas(400, 400);
    painter = new RotatingShapes([
      new Circle("red", { x: -90, y: 50 }, 30),
      new Ellipse("orange", { x: 120, y: -60 }, 40, 60),
      new Polygon(p, "green", { x: 30, y: 90 }, 20, 4),
      new Polygon(p, "blue", { x: -20, y: -20 }, 20, 6),
    ]);
  };

  p.draw = () => {
    console.log("Drawing rotating shapes")
    p.background(10);
    painter.run(p);
  };
}
