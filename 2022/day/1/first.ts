import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";

const INPUT_FILE = "./input.txt";
const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), INPUT_FILE);

let maxCalories = -1;
let calories = 0;
for await (const line of lines) {
  if (line === '') {
    maxCalories = Math.max(calories, maxCalories);
    calories = 0;
  } else {
    calories += parseInt(line, 10);

  }
}

console.log("Max calories:", maxCalories);