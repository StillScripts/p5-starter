import { SketchKey } from "../sketches/sketchMap";
import { convertFromParam } from "./common";

interface ParamsType {
  [key: string]: string | number;
}

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
 * @param {SketchKey} defaultSketch
 * @returns {SketchKey}
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
