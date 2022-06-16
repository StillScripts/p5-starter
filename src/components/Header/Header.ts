/**
 * The header for the page which displays the information about the app
 * @param {string} animation - The name of the animation
 * @returns {string}
 */
export default function Header(animation: string): string {
  return `
	<header>
    <h1>P5.js Animations</h1>
    <p>Showing: <strong>${animation}</strong></p>
    <a class="link" href="https://p5js.org/" target="_blank">P5.js Docs</a>
		<a class="link" href="https://github.com/StillScripts" target="_blank">View on GitHub</a>
		<br/>
  </header>`;
}
