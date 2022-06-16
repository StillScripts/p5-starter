import { spaceWords } from "../../utils/stringFunctions";

/**
 * A select input that is used to change the existing animation.
 * @param {string} id - The id that can be used to get the select element
 * @param {string[]} options - The list of animations that are available
 * @returns {string} - The string for the HTML select element
 */
export default function SketchSelector(id: string, options: string[]): string {
  return `
	<select id=${id}>
		${options.map(
      (option) => `<option value=${option}>${spaceWords(option)}</option>`
    )}
  </select>`;
}
