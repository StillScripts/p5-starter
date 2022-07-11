import p5 from "p5";
import { BubbleSort } from "./classes";

/**
 * This sketch displays the bubble sort algorithm.
 * It uses a global BubbleSort object to store and move particles around.
 * It calls setup once to make a 400 x 400 canvas and initialise the BubbleSort.
 * It calls the draw method continuously to run the animation.
 * @param {p5} p - The p5.js object
 */
export default function bubbleSortSketch(p: p5) {
  let bubbleSort: BubbleSort;

  p.setup = () => {
    p.createCanvas(400, 400);
		p.frameRate(12);
    bubbleSort = new BubbleSort(p);
  };

  p.draw = () => {
    p.background(0);
    bubbleSort.sort(p);
    bubbleSort.display(p);
  };
}
