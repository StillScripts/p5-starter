import "./style.css";
import p5 from "p5";
import { SketchKey, sketchMap } from "./sketches/sketchMap";
import { Header, SketchSelector, SketchContainer } from "./components";
import { convertFromParam, convertToParams } from "./utils/stringFunctions";
import { redirectUrl } from "./utils/urlParams";

const CONTAINER_ID = "sketch-container";
const SELECT_ID = "animation-selector";

let sketch: SketchKey = "Shapes";

try {
  const params = new URLSearchParams(window.location.search);
  const sketchParam = params.get("sketch") as string;
  sketch = convertFromParam(sketchParam) as SketchKey;
} catch (error) {
  console.log("Url param error: " + error);
  console.log("Sticking with the shape animation for now...");
}

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  ${Header(`${sketch}`)}
  <main>
    ${SketchSelector(SELECT_ID, Object.keys(sketchMap), sketch)}
    ${SketchContainer(CONTAINER_ID)}
  </main>
`;

function renderSketch() {
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
  new p5(sketchMap[sketch], sketchDiv);
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
      if (value !== sketch) {
        //setSketch(value);
        redirectUrl("http://localhost:3000", { sketch: convertToParams(value) });
      }
    });

    // Get the sketch container and append a div that will hold the sketch canvas
    renderSketch();
  } catch (error) {
    console.log("Error with initiating app: ", error);
  }
}

init();
