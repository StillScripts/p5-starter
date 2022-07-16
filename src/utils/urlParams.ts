import { type SketchKey, sketchMap } from "../sketches/sketchMap";

interface ParamsType {
  [key: string]: string | number;
}

/**
 * Reload the page with new URL parameters to load a new sketch
 * @param {string} url - The url path of the site
 * @param {string} params - The new url parameters to use
 */
export function redirectUrl(url: string, params?: ParamsType) {
  if (typeof window !== "undefined") {
    try {
      const _url = new URL(url);

      if (params) {
        const keyList = Object.keys(params);
        for (let i = 0; i < keyList.length; i += 1) {
          const key = keyList[i];
          _url.searchParams.set(keyList[i], params[key]?.toString());
        }
      }

      window.location.assign(_url.href);
    } catch (e) {
      throw new Error("The URL is not valid");
    }
  }
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

/**
 * Get the sketch query param in the current URL
 * @param {SketchKey} defaultSketch - A basic sketch to use as a fallback
 * @returns {SketchKey} - The key of the sketch to use for the p5.js animation
 */
export function getSketchFromParams(defaultSketch: SketchKey): SketchKey {
  try {
    const params = new URLSearchParams(window.location.search);
    const sketchParam = params.get("sketch") as string;
    const key = convertFromParam(sketchParam) as SketchKey;
    if (Object.keys(sketchMap).includes(key)) {
      return key;
    } else {
      return defaultSketch;
    }
  } catch (error) {
    console.log("Url param error: " + error);
    console.log("Showing the default Shapes animation due to the Url error");
    return defaultSketch;
  }
}
