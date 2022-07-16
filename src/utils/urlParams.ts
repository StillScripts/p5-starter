import { SketchKey } from "../sketches/sketchMap";
import { convertFromParam } from "./common";

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
 * Get the sketch query param in the current URL
 * @param {SketchKey} defaultSketch - A basic sketch to use as a fallback
 * @returns {SketchKey} - The key of the sketch to use for the p5.js animation
 */
export function getSketchFromParams(defaultSketch: SketchKey): SketchKey {
  try {
    const params = new URLSearchParams(window.location.search);
    const sketchParam = params.get("sketch") as string;
    return convertFromParam(sketchParam) as SketchKey;
  } catch (error) {
    console.log("Url param error: " + error);
    console.log("Showing the default Shapes animation due to the Url error");
    return defaultSketch
  }  
}
