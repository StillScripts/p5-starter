import "./style.css";
import p5 from "p5";
import { SketchKey, sketchMap } from "./sketches/sketchMap";
import { Header, SketchSelector, SketchContainer } from "./components";

const CONTAINER_ID = "sketch-container";
const SELECT_ID = "animation-selector";
let currentSketch: SketchKey = "ParticleSystem";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  ${Header(`${currentSketch}`)}
  <main>
  ${SketchSelector(SELECT_ID, Object.keys(sketchMap))}
  ${SketchContainer(CONTAINER_ID)}
  </main>
`;

function fillSketchContainer() {
  // Get the sketch container
  const container = document.querySelector<HTMLDivElement>("#" + CONTAINER_ID);
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
}

function selectNewSketch(key: SketchKey) {
  try {
    currentSketch = key; // Change the animation
    fillSketchContainer(); // Fill the sketch container with the new animation
  } catch (error) {
    console.log("Error with new selection: ", error);
  }
}

function init() {
  try {
    // Firstly, add an event listener to the existing select input
    const selector = document.querySelector(
      "#" + SELECT_ID
    ) as HTMLSelectElement;
    // Add the eventListener to change the method if the select value has changed
    selector.addEventListener("click", (e) => {
      const select = e.target as HTMLSelectElement;
      const value = select.value as SketchKey;
      if (value !== currentSketch) {
        selectNewSketch(value);
      }
    });

    // Get the sketch container and append a div that will hold the sketch canvas
    fillSketchContainer();
  } catch (error) {
    console.log("Error with initiating app: ", error);
  }
}

init();
