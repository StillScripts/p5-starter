import p5 from "p5";
import { Coordinate } from "../types";

/**
 * A bubble that moves around the screen bouncing into other bubbles
 */
export class Bubble {
  location: Coordinate;
  xVelocity: number;
  yVelocity: number;
  diameter: number;
  id: number;
  others: Bubble[];
  constructor(
    xSpawn: number,
    ySpawn: number,
    diameter: number,
    id: number,
    others: Bubble[]
  ) {
    this.location = { x: xSpawn, y: ySpawn };
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.diameter = diameter;
    this.id = id;
    this.others = others;
  }

  /**
   * Apply collision detection to bubbles
   * @param {p5} p - The p5.js object
   * @param {number} numBubbles - The amount of bubbles in the system
   * @param {number} spring - The bounce acceleration when bubbles collide
   */
  collide(p: p5, numBubbles: number, spring: number) {
    for (let i = this.id + 1; i < numBubbles; i++) {
      let dx = this.others[i].location.x - this.location.x;
      let dy = this.others[i].location.y - this.location.y;
      let distance = p.sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      if (distance < minDist) {
        let angle = p.atan2(dy, dx);
        let targetX = this.location.x + p.cos(angle) * minDist;
        let targetY = this.location.y + p.sin(angle) * minDist;
        let ax = (targetX - this.others[i].location.x) * spring;
        let ay = (targetY - this.others[i].location.y) * spring;
        this.xVelocity -= ax;
        this.yVelocity -= ay;
        this.others[i].xVelocity += ax;
        this.others[i].yVelocity += ay;
      }
    }
  }

  /**
   * Move the bubble around 
   * @param {p5} p - The p5.js object
   * @param {number} gravity - The amount of gravitational force to apply
   * @param {number} friction - The rate at which bubbles slow down
   */
  move(p: p5, gravity: number, friction: number) {
    this.yVelocity += gravity;
    this.location.x += this.xVelocity;
    this.location.y += this.yVelocity;
    if (this.location.x + this.diameter / 2 > p.width) {
      this.location.x = p.width - this.diameter / 2;
      this.xVelocity *= friction;
    } else if (this.location.x - this.diameter / 2 < 0) {
      this.location.x = this.diameter / 2;
      this.xVelocity *= friction;
    }
    if (this.location.y + this.diameter / 2 > p.height) {
      this.location.y = p.height - this.diameter / 2;
      this.yVelocity *= friction;
    } else if (this.location.y - this.diameter / 2 < 0) {
      this.location.y = this.diameter / 2;
      this.yVelocity *= friction;
    }
  }

  /**
   * Render the bubble on the canvas
   * @param {p5} p - The p5.js object
   */
  display(p: p5) {
    p.circle(this.location.x, this.location.y, this.diameter);
  }
}

export class BubbleSystem {
  spring: number;
  gravity: number;
  friction: number;
  bubbles: Bubble[];
  constructor(
    p: p5,
    numBubbles: number,
    spring: number,
    gravity: number,
    friction: number
  ) {
    this.spring = spring;
    this.gravity = gravity;
    this.friction = friction;
    this.bubbles = this.generateBubbles(p, numBubbles);
  }

  /**
   * Move each bubble around the canvas
   * @param {p5} p - The p5.js object
   */
  run(p: p5) {
    this.bubbles.forEach((bubble) => {
      bubble.collide(p, this.bubbles.length, this.spring);
      bubble.move(p, this.gravity, this.friction);
      bubble.display(p);
    });
  }

  /**
   * Create all the bubbles in the system based on a set number of bubbles
   * @param {p5} p - The p5.js object
   * @param {number} numBubbles - The number of bubble to add to the system
   * @returns {Bubble[]}
   */
  generateBubbles(p: p5, numBubbles: number): Bubble[] {
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < numBubbles; i++) {
      newBubbles[i] = new Bubble(
        p.random(p.width),
        p.random(p.height),
        p.random(30, 70),
        i,
        newBubbles
      );
    }
    return newBubbles;
  }
}
