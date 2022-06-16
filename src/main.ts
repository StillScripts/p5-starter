import "./style.css";
import p5 from "p5";
import { SketchKey, sketchMap } from "./sketches/sketchMap";
import { Header, SketchSelector, SketchContainer } from "./components";

let currentSketch: SketchKey = "Polygon";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  ${Header(`${currentSketch} Animation`)}
  <main>
    ${SketchSelector(Object.keys(sketchMap))}
    ${SketchContainer()}
  </main>
`;

function init() {
  // Get the sketch container and append a div that will hold the sketch canvas
  const main = document.getElementById("sketch-container");
  const sketchDiv = document.createElement("div");
  sketchDiv.id = "sketch";
  main?.appendChild(sketchDiv);

  // Add an event listener to the select input
  const selector: HTMLSelectElement = document.getElementsByTagName("select")[0];
  selector.addEventListener("click", (ev) => {
    console.log(ev.target);
  });

  // Initialise the p5.js object which contains the sketch
  new p5(sketchMap[currentSketch], sketchDiv);
}

init();
