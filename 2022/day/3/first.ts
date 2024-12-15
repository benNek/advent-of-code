import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";

const INPUT_FILE = "./input.txt";
const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), INPUT_FILE);

function calculateItemTypeScore(char: string): number {
  // Big A starts at 65, while small one starts at 97
  if (char.toUpperCase() === char) {
    return char.charCodeAt(0) - 64 + 26;
  } else {
    return char.charCodeAt(0) - 96;
  }
}

let sum = 0;
for await (const line of lines) {
  const firstCompartment = line.slice(0, line.length / 2);
  const secondCompartment = line.slice(line.length / 2);

  const firstCompartmentMap = {};
  const duplicatesMap = {};
  for (let i = 0; i < firstCompartment.length; i++) {
    firstCompartmentMap[firstCompartment[i]] = true;
  }

  for (let i = 0; i < secondCompartment.length; i++) {
    const itemType = secondCompartment[i];
    if (firstCompartmentMap[itemType] && !duplicatesMap[itemType]) {
      sum += calculateItemTypeScore(itemType);
      duplicatesMap[itemType] = true;
    }
  }
}

console.log(sum);