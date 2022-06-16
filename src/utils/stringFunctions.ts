/**
 * Put a space between words where there is a capital letter.
 * For example - "ParticleSystem" -> "Particle System"
 * @param {string} key - The original string
 * @returns {string} - A string containing spaces between words
 */
export function spaceWords(key: string): string {
  let newString = "";
  for (let i = 0; i < key.length; i++) {
    if (key[i] === key[i].toUpperCase() && i > 0) {
      newString += " ";
    }
    newString += key[i];
  }
  return newString;
}


/**
 * (Unneeded for now) Convert a string of text into a simple key name. For example -
 * "Fun Animation " -> "fun-animation"
 * @param {string} text - The text that is being converted
 * @returns {string} - The key that hase been generated
 */
export function convertToKey(text: string): string {
  return text.trim().replace(" ", "-").toLowerCase();
}
