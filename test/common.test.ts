import { expect, test } from "vitest";

import {
  spaceWords,
} from "../src/utils/common";

test("spaceWords()", () => {
  expect(spaceWords("SuperAwesomeSketch")).toBe("Super Awesome Sketch");
  expect(spaceWords("MySpace")).toBe("My Space");
});
