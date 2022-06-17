import "./style.css";
import p5 from "p5";
import { SketchKey, sketchMap } from "./sketches/sketchMap";
import { Header, SketchSelector, SketchContainer } from "./components";
import { convertToParams } from "./utils/stringFunctions";
import { getParam, redirectUrl } from "./utils/urlParams";

/**
 * Initialise the application by getting the sketch from the url parameter,
 * adding the HTML components to the #app div, adding an event listener to the
 * select input, and rendering the p5 sketch within the newly created #sketch div
 */
function init() {
  const containerID = "sketch-container";
  const selectID = "animation-selector";
  let sketch: SketchKey = "RotatingShapes"; // initialise with shapes as default sketch

  try {
    sketch = getParam();
  } catch (error) {
    console.log("Url param error: " + error);
    console.log("Showing the default Shapes animation due to the Url error");
  }

  try {
    const app = document.querySelector<HTMLDivElement>("#app")!;
    app.innerHTML = `
      ${Header(`${sketch}`)}
      <main>
        ${SketchSelector(selectID, Object.keys(sketchMap), sketch)}
        ${SketchContainer(containerID)}
      </main>
    `;

    // Add an event listener to the select element
    document.querySelector("#" + selectID)?.addEventListener("click", (e) => {
      const select = e.target as HTMLSelectElement;
      const value = select.value as SketchKey;
      if (value !== sketch) {
        // Change the sketch if a new option has been selected
        redirectUrl(window.location.href.split("?")[0], {
          sketch: convertToParams(value),
        });
      }
    });

    // Get the sketch container
    const container = document.querySelector<HTMLDivElement>("#" + containerID);
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
  } catch (error) {
    console.log("Error with initiating app: ", error);
  }
}

init();
