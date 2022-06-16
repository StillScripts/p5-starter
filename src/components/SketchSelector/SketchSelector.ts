/**
 * Convert a string of text into a simple key name. For example -
 * "Fun Animation " -> "fun-animation"
 * @param {string} text - The text that is being converted
 * @returns {string} - The key that hase been generated
 */
export function convertToKey(text: string): string {
  return text.trim().replace(" ", "-").toLowerCase();
}

/**
 * A select input that is used to change the existing animation.
 * @param {string[]} options - The list of animations that are available
 * @param {string} id - The id that can be used to get the select element
 * @returns {string} - The string for the HTML select element
 */
export default function SketchSelector(
  options: string[],
  id: string = "animation-selector"
): string {
  return `
	<select id=${id}>
		${options.map(
      (option) => `<option value=${option}>${option}</option>`
    )}
  </select>`;
}
