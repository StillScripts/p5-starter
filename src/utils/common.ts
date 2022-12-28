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

/** Typesafe version of Object.keys */
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;
