import { Polygon } from "./classes";
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
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(50);
    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.beginShape();
    const shape = new Polygon(p, 70, 5);
    shape.points.forEach((point) => p.vertex(point.x, point.y));
    p.endShape(p.CLOSE);
    p.pop();
  };
}
