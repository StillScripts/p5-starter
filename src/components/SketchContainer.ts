import p5 from "p5"; // Import of the p5 object that is used for all sketches
import { SketchKey, sketchMap } from "../sketches/sketchMap";

/**
 * The container that the sketch will live in.
 * @param {string} id - The id for the sketch container element
 * @returns {string} - The string for the HTML div element
 */
export default function SketchContainer(id: string): string {
  return `<div id="${id}"><p id="loader">initialising app...</p></div>`;
}

/**
 * Add an event listener to the select input to the reload the page
 * with a new url param when the user selects a new sketch
 * @param {string} id - The id for the sketch container element
 * @param currentSketch - The current sketch value of the page
 */
export function renderSketch(id: string, currentSketch: SketchKey) {
  try {
    // Get the sketch container
    const container = document.querySelector<HTMLDivElement>("#" + id);
    // Remove existing animation
    container?.removeChild(container.childNodes[0]);
    // Make a div for the sketch
    const sketchDiv = document.createElement("div");
    // Give the div an id
    sketchDiv.id = "sketch";
    // Add this div to the sketch container
    container?.appendChild(sketchDiv);

    // Initialise the p5.js object which contains the sketch
    new p5(sketchMap[currentSketch], sketchDiv);
  } catch (error) {
    console.error("Error rendering p5.js sketch - " + error);
  }
}
