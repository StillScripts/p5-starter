import type p5 from "p5";
import { BubbleSystem } from "./classes";

/**
 * This sketch is an animation of bubbles moving around and colliding with each other.
 * It uses a global BubbleSystem object to store and move particles around.
 * It calls setup once to make a 400 x 400 canvas and initialise the BubbleSystem.
 * It calls the draw method continuously to run the animation.
 * @param {p5} p - The p5.js object
 */
export default function bouncyBubbleSketch(p: p5) {
  let bubbleSystem: BubbleSystem;

  p.setup = () => {
    p.createCanvas(400, 400);
    bubbleSystem = new BubbleSystem(p, 13, 0.05, 0.03, -0.9);
    p.noStroke();
    p.fill(255, 204);
  };

  p.draw = () => {
    p.background(0);
    bubbleSystem.run(p);
  };
}
