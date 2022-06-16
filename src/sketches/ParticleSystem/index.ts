import { ParticleSystem } from "./classes";
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
export default function particleSystemSketch(p: p5) {
  let system: ParticleSystem;

  p.setup = () => {
    p.createCanvas(400, 400); 
    system = new ParticleSystem(p.createVector(p.width / 2, 50));
  };

  p.draw = () => {
    p.background(50);
    system.addParticle(p);
    system.run(p);
  };
}
