import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";

const INPUT_FILE = "./input.txt";
const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), INPUT_FILE);

function isOverlapping(a1: number, a2: number, b1: number, b2: number): boolean {
  // probably overcomplicating and writing too many cases but if it works - it works
  if (a1 <= b1 && b1 <= a2 && a2 <= b2) {
    return true;
  } else if (a1 <= b1 && b2 <= a2) {
    return true;
  } else if (b1 <= a1 && a1 <= b2 && b2 <= a2) {
    return true;
  } else if (b1 <= a1 && a2 <= b2) {
    return true;
  }
  return false;
}

let overlap = 0;
for await (const line of lines) {
  const firstSection = line.split(',')[0];
  const firstMin = parseInt(firstSection.split('-')[0], 10);
  const firstMax = parseInt(firstSection.split('-')[1], 10);

  const secondSection = line.split(',')[1];
  const secondMin = parseInt(secondSection.split('-')[0], 10);
  const secondMax = parseInt(secondSection.split('-')[1], 10);

  if (isOverlapping(firstMin, firstMax, secondMin, secondMax)) {
    overlap++;
  }
}

console.log(overlap);