import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { moveTail, Point } from "./ropeHelper.ts";

let tail: Point = {
  x: 0,
  y: 0,
}

Deno.test("Movement in straight line →", () => {
  let head: Point = {
    x: 2,
    y: 0,
  };

  assertEquals(moveTail(head, tail), { x: 1, y: 0 });
});

Deno.test("Movement in straight line ←", () => {
  let head: Point = {
    x: -2,
    y: 0,
  };

  assertEquals(moveTail(head, tail), { x: -1, y: 0 });
});

Deno.test("Movement in straight line ↑", () => {
  let head: Point = {
    x: 0,
    y: 2,
  };

  assertEquals(moveTail(head, tail), { x: 0, y: 1 });
});

Deno.test("Movement in straight line ↓", () => {
  let head: Point = {
    x: 0,
    y: -2,
  };

  assertEquals(moveTail(head, tail), { x: 0, y: -1 });
});

Deno.test("Movement diagonally ↖ (1)", () => {
  let head: Point = {
    x: -1,
    y: 2,
  };

  assertEquals(moveTail(head, tail), { x: -1, y: 1 });
});

Deno.test("Movement diagonally ↖ (2)", () => {
  let head: Point = {
    x: -2,
    y: 1,
  };

  assertEquals(moveTail(head, tail), { x: -1, y: 1 });
});

Deno.test("Movement diagonally ↖ (3)", () => {
  let head: Point = {
    x: -2,
    y: 2,
  };

  assertEquals(moveTail(head, tail), { x: -1, y: 1 });
});

Deno.test("Movement diagonally ↗ (1)", () => {
  let head: Point = {
    x: 1,
    y: 2,
  };

  assertEquals(moveTail(head, tail), { x: 1, y: 1 });
});

Deno.test("Movement diagonally ↗ (2)", () => {
  let head: Point = {
    x: 2,
    y: 1,
  };

  assertEquals(moveTail(head, tail), { x: 1, y: 1 });
});

Deno.test("Movement diagonally ↗ (3)", () => {
  let head: Point = {
    x: 2,
    y: 2,
  };

  assertEquals(moveTail(head, tail), { x: 1, y: 1 });
});

Deno.test("Movement diagonally ↘ (1)", () => {
  let head: Point = {
    x: 1,
    y: -2,
  };

  assertEquals(moveTail(head, tail), { x: 1, y: -1 });
});

Deno.test("Movement diagonally ↘ (2)", () => {
  let head: Point = {
    x: 2,
    y: -1,
  };

  assertEquals(moveTail(head, tail), { x: 1, y: -1 });
});

Deno.test("Movement diagonally ↘ (3)", () => {
  let head: Point = {
    x: 2,
    y: -2,
  };

  assertEquals(moveTail(head, tail), { x: 1, y: -1 });
});


Deno.test("Movement diagonally ↙ (1)", () => {
  let head: Point = {
    x: -1,
    y: -2,
  };

  assertEquals(moveTail(head, tail), { x: -1, y: -1 });
});

Deno.test("Movement diagonally ↙ (2)", () => {
  let head: Point = {
    x: -2,
    y: -1,
  };

  assertEquals(moveTail(head, tail), { x: -1, y: -1 });
});

Deno.test("Movement diagonally ↙ (3)", () => {
  let head: Point = {
    x: -2,
    y: -2,
  };

  assertEquals(moveTail(head, tail), { x: -1, y: -1 });
});
