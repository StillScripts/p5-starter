import { Vector } from "p5";
import type p5 from "p5";

/**
 * A simple Particle class
 */
export class Particle {
  acceleration: Vector;
  velocity: Vector;
  position: Vector;
  lifespan: number;
  constructor(p: p5, position: Vector) {
    this.acceleration = p.createVector(0, 0.05);
    this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 0));
    this.position = position.copy();
    this.lifespan = 255;
  }

  /**
   * Move the particle and render it on the canvas
   * @param {p5} p - The p5.js object
   */
  run(p: p5) {
    this.update();
    this.display(p);
  }

  /**
   * Move the particle based on its velocity and reduce its lifespan
   */
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  /**
   * Render the particle on the canvas
   * @param {p5} p - The p5.js object 
   */
  display(p: p5) {
    p.stroke(200, this.lifespan);
    p.strokeWeight(2);
    p.fill(127, this.lifespan);
    p.ellipse(this.position.x, this.position.y, 12, 12);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

// The class which holds all the particles
/**
 * The class which holds all the particles
 */
export class ParticleSystem {
  origin: Vector;
  particles: Particle[];
  constructor(position: Vector) {
    this.origin = position.copy();
    this.particles = [];
  }

  run(p: p5) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.run(p);
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  addParticle(p: p5) {
    this.particles.push(
      new Particle(p, this.origin)
    );
  }
}
