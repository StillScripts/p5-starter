import p5 from "p5";

/**
 * A class which renders a ticking clock
 */
export class Clock {
  radius: number;
  secondsRadius: number;
  minutesRadius: number;
  hoursRadius: number;
  diameter: number;
  constructor(radius: number) {
    this.radius = radius;
    this.secondsRadius = radius * 0.71;
    this.minutesRadius = radius * 0.6;
    this.hoursRadius = radius * 0.45;
    this.diameter = radius * 1.7;
  }

  tick(p: p5, cx: number, cy: number) {
    // Draw the clock background
    p.noStroke();
    p.fill(244, 122, 158);
    p.ellipse(cx, cy, this.diameter + 25, this.diameter + 25);
    p.fill(237, 34, 93);
    p.ellipse(cx, cy, this.diameter, this.diameter);

    // Angles for sin() and cos() start at 3 o'clock;
    // subtract HALF_PI to make them start at the top
    let s = p.map(p.second(), 0, 60, 0, p.TWO_PI) - p.HALF_PI;
    let m =
      p.map(p.minute() + p.norm(p.second(), 0, 60), 0, 60, 0, p.TWO_PI) -
      p.HALF_PI;
    let h =
      p.map(p.hour() + p.norm(p.minute(), 0, 60), 0, 24, 0, p.TWO_PI * 2) -
      p.HALF_PI;

    // Draw the hands of the clock
    p.stroke(255);
    // Draw seconds
    p.strokeWeight(2);
    p.line(
      cx,
      cy,
      cx + p.cos(s) * this.secondsRadius,
      cy + p.sin(s) * this.secondsRadius
    );
    // Draw minutes
    p.strokeWeight(3);
    p.line(
      cx,
      cy,
      cx + p.cos(m) * this.minutesRadius,
      cy + p.sin(m) * this.minutesRadius
    );
    // Draw hours
    p.strokeWeight(4);
    p.line(
      cx,
      cy,
      cx + p.cos(h) * this.hoursRadius,
      cy + p.sin(h) * this.hoursRadius
    );

    // Draw the minute ticks
    p.strokeWeight(3);
    p.beginShape(p.POINTS);
    for (let a = 0; a < 360; a += 6) {
      let angle = p.radians(a);
      let x = cx + p.cos(angle) * this.secondsRadius;
      let y = cy + p.sin(angle) * this.secondsRadius;
      p.vertex(x, y);
    }
    p.endShape();
  }
}
