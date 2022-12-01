import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const TOP_ELVES_COUNT = 3;
const INPUT_FILE = "./input.txt";
const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), INPUT_FILE);

let elfCalories: number[] = [];
let calories = 0;
for await (const line of lines) {
  if (line === '') {
    elfCalories.push(calories);
    calories = 0;
  } else {
    calories += parseInt(line, 10);
  }
}
elfCalories.sort((lhs, rhs) => rhs - lhs);

let sum  = 0;
const iterationLength = Math.min(TOP_ELVES_COUNT, elfCalories.length);
for (let i = 0; i < iterationLength; i++) {
  sum += elfCalories[i];
}

console.log(`Top ${iterationLength} elves are carrying ${sum} calories.`);