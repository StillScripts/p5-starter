import { spaceWords } from "../../utils/stringFunctions"

/**
 * The header for the page which displays the information about the app
 * @param {string} sketch - The name of the sketch
 * @returns {string}
 */
export default function Header(sketch: string): string {
  return `
	<header>
    <h1>P5.js Animations</h1>
    <p>Showing: <strong id="current-title">${spaceWords(sketch)}</strong></p>
    <a class="link" href="https://p5js.org/" target="_blank">P5.js Docs</a>
		<a class="link" href="https://github.com/StillScripts" target="_blank">View on GitHub</a>
		<br/>
  </header>`;
}
