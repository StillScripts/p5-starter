import { SketchKey } from "../sketches/sketchMap";
import { convertToParams, spaceWords } from "../utils/common";
import { redirectUrl } from "../utils/urlParams";

/**
 * A select input that is used to change the existing animation.
 * @param {string} id - The id for the select element
 * @param {string[]} options - The list of animations that are available
 * @param {string} sketch - The intial sketch value on page load
 * @returns {string} - The string for the HTML select element
 */
export default function SketchSelector(
  id: string,
  options: string[],
  sketch: SketchKey
): string {
  return `
	<select id="${id}">
		${options.map(
      (option) =>
        `<option value=${option} ${option === sketch && "selected"}>
          ${spaceWords(option)}
         </option>`
    )}
  </select>`;
}

/**
 * Add an event listener to the select input to the reload the page
 * with a new url param when the user selects a new sketch
 * @param {string} id - The id for the select element
 * @param currentSketch - The current sketch value of the page
 */
export function addListenerToSelect(id: string, currentSketch: SketchKey) {
  try {
    // Add an event listener to the select element
    document.querySelector("#" + id)?.addEventListener("change", (e) => {
      const select = e.target as HTMLSelectElement;
      const value = select.value as SketchKey;
      if (value !== currentSketch) {
        // Change the sketch if a new sketch option has been selected
        redirectUrl(window.location.href.split("?")[0], {
          sketch: convertToParams(value),
        });
      }
    });
  } catch (error) {
    console.error(
      "Error with adding event listener to select input - " + error
    );
  }
}
