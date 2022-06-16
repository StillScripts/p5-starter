/**
 * The container that the sketch will live in.
 * @param {string} id - The id for the sketch container element
 * @returns {string}
 */
export default function SketchContainer(id: string): string {
  return `<div id="${id}"><p id="loader">initialising app...</p></div>`;
}
