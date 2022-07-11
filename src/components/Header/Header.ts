import { spaceWords } from "../../utils/stringFunctions";

/**
 * The header for the page which displays the information about the app
 * @param {string} sketch - The name of the sketch
 * @param {boolean} showLinks - Show links for p5.js documentation, and the GitHub repo for this project
 * @returns {string} - The string for the HTML header element
 */
export default function Header(sketch: string, showLinks?: boolean): string {
  return `
	<header>
    <h1>${spaceWords(sketch)} Sketch</h1>
    ${
      showLinks
        ? `<a class="link" href="https://p5js.org/" target="_blank">P5.js Docs</a>
		       <a class="link" href="https://github.com/StillScripts/p5-starter" target="_blank">View on GitHub</a>`
        : ""
    }
  </header>`;
}
