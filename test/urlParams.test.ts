import { expect, test } from "vitest";

import {
  convertFromParam,
  convertToParam,
} from "../src/utils/urlParams";

test("convertFromParam()", () => {
  expect(convertFromParam("bubble-sort")).toBe("BubbleSort");
  expect(convertFromParam("particle-system")).toBe("ParticleSystem");
});

test("convertToParam()", () => {
  expect(convertToParam("BubbleSort")).toBe("bubble-sort");
  expect(convertToParam("Shapes")).toBe("shapes");
});