import "./style.css";
import p5 from "p5";
import { SketchKey, sketchMap } from "./sketches/sketchMap";
import { Header, SketchSelector, SketchContainer } from "./components";
import { convertToParams } from "./utils/stringFunctions";
import { getSketchFromParams, redirectUrl } from "./utils/urlParams";

/**
 * Initialise the application by getting the sketch from the url parameter,
 * adding the HTML components to the #app div, adding an event listener to the
 * select input, and rendering the p5 sketch within the newly created #sketch div
 */
function init() {
  const CONTAINER_ID = "sketch-container";
  const SELECT_ID = "animation-selector";
  const sketch: SketchKey = getSketchFromParams(Object.keys(sketchMap)[0]); // get the sketch to render

  const app = document.querySelector<HTMLDivElement>("#app")!; // get the app container <div> element
  app.innerHTML = `
    ${Header(`${sketch}`)}
    <main>
      ${SketchSelector(SELECT_ID, Object.keys(sketchMap), sketch)}
      ${SketchContainer(CONTAINER_ID)}
    </main>
  `;


  try {
    // Add an event listener to the select element
    document.querySelector("#" + SELECT_ID)?.addEventListener("change", (e) => {
      const select = e.target as HTMLSelectElement;
      const value = select.value as SketchKey;
      if (value !== sketch) {
        // Change the sketch if a new sketch option has been selected
        redirectUrl(window.location.href.split("?")[0], {
          sketch: convertToParams(value),
        });
      }
    });

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
  } catch (error) {
    console.log("Error with initiating app: ", error);
  }
}

init();
