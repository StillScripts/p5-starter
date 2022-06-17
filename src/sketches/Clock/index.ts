import p5 from "p5";
import { Clock } from "./classes";

/**
 * This sketch is creates a clock with an hour, minute and seconds hand.
 * @param {p5} p - The p5.js object
 *
 */
export default function clockSketch(p: p5) {
  let clock: Clock;

  p.setup = () => {
    p.createCanvas(400, 400);
    p.stroke(255);
    clock = new Clock(p.min(p.width, p.height) / 2);
  };

  p.draw = () => {
    p.background(10);
    clock.tick(p, p.width / 2, p.height / 2);
    p.push();
    p.circle(p.width / 2, p.height / 2, 8);
    p.pop();
  };
}
