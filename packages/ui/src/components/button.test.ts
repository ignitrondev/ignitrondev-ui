import assert from "node:assert/strict";
import { test } from "node:test";
import { buttonVariants } from "./button.js";

test("primary button is the light fill that turns amber on hover", () => {
  const classes = buttonVariants({ variant: "primary", size: "lg" });
  assert.match(classes, /bg-primary/);
  assert.match(classes, /hover:bg-brand/);
  assert.match(classes, /h-\[52px\]/);
});

test("icon buttons do not slide their glyph", () => {
  const classes = buttonVariants({ size: "icon" });
  assert.doesNotMatch(classes, /hover:\[&_svg\]:translate-x-/);
});
