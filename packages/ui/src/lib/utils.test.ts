import assert from "node:assert/strict";
import { test } from "node:test";
import { cn } from "./utils.js";

test("cn lets the later Tailwind class win", () => {
  assert.equal(cn("px-2 px-4", "px-6"), "px-6");
});
