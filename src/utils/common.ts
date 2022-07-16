import { SketchKey } from "../sketches/sketchMap";

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
 * Convert a Sketch Key into a simple url param. For example -
 * "FunAnimation" -> "fun-animation"
 * @param {SketchKey} key - The text that is being converted
 * @returns {string} - The url param that has been generated
 */
export function convertToParam(key: SketchKey): string {
  let param = "";
  for (let i = 0; i < key.length; i++) {
    if (key[i] === key[i].toUpperCase() && i > 0) {
      param += "-";
    }
    param += key[i];
  }
  return param.toLowerCase();
}

/**
 * Convert a url param into a key for a sketch. For example -
 * "fun-animation" -> "FunAnimation"
 * @param {string} param - The param from the query string
 * @returns {string} - The key for the sketchMap
 */
export function convertFromParam(param: string): SketchKey {
  const words = param.trim().split("-");
  let key = "";
  words.forEach((word) => {
    console.log(word);
    for (let i = 0; i < word.length; i++) {
      if (i === 0) {
        key += word[i].toUpperCase();
      } else {
        key += word[i];
      }
    }
  });
  return key as SketchKey;
}
