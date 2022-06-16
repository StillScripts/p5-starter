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
 * Convert a string of text into a simple url param. For example -
 * "Fun Animation " -> "fun-animation"
 * @param {string} key - The text that is being converted
 * @returns {string} - The url param that has been generated
 */
export function convertToParams(key: string): string {
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
 * Convert a url param into a readable key
 * @param {string} param - The param from the query string
 * @returns {string} - The key for the sketchMap
 */
export function convertFromParam(param: string): string {
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
  return key;
}
