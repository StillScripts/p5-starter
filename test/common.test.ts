import { expect, test } from "vitest";

import { spaceWords, getKeys } from "../src/utils/common";

test("spaceWords()", () => {
  expect(spaceWords("SuperAwesomeSketch")).toBe("Super Awesome Sketch");
  expect(spaceWords("MySpace")).toBe("My Space");
});

test("getKeys()", () => {
  expect(getKeys({ hi: 1, bye: 2 })).toHaveLength(2);
  expect(getKeys({ hi: 1, bye: 2 })).toContain("hi");
});
