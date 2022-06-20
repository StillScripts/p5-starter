import p5 from "p5";

/**
 * A class which uses the bubble sorting algorithm and displays
 * each iterate using p5.js
 */
export class BubbleSort {
  values: number[];
  i: number;
  j: number;
  constructor(p: p5) {
    this.values = this.generateValues(p);
    this.i = 0;
    this.j = 0;
  }

  generateValues(p: p5) {
    const startValues: number[] = [];
    for (let i = 0; i < p.width / 8; i++) {
      startValues.push(p.random(p.height));
    }
    return startValues;
  }

  sort(p: p5) {
    for (let k = 0; k < 8; k++) {
      if (this.i < this.values.length) {
        let temp = this.values[this.j];
        if (this.values[this.j] > this.values[this.j + 1]) {
          this.values[this.j] = this.values[this.j + 1];
          this.values[this.j + 1] = temp;
        }
        this.j++;

        if (this.j >= this.values.length - this.i - 1) {
          this.j = 0;
          this.i++;
        }
      } else {
        p.noLoop();
      }
    }
  }

  display(p: p5) {
    for (let i = 0; i < this.values.length; i++) {
      p.stroke(100, 143, 143);
      p.fill(180);
      p.rect(i * 8, p.height, 8, -this.values[i], 20);
    }
  }
}
