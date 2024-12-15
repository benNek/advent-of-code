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
let elfId = 1;
let elvesItems = {};
for await (const line of lines) {
  // for first elf, fill his items,
  // but for all others, only include items that were already in the previous one
  if (Object.keys(elvesItems).length === 0) {
    let items = {};
    for (let i = 0; i < line.length; i++) {
      items[line[i]] = true;
    }
    elvesItems[elfId] = items;
  } else {
    let items = {};
    const previousElfItems = elvesItems[elfId - 1];
    for (let i = 0; i < line.length; i++) {
     if (previousElfItems[line[i]]) {
        items[line[i]] = true;
     } 
    }
    elvesItems[elfId] = items;
  }

  if (elfId === 3) {
    const possibleBadges = elvesItems[elfId]
    if (Object.keys(possibleBadges).length !== 1) {
      throw Error(`More than one item type (${Object.keys(elvesItems[elfId]).join(',')}) for elf group`);
    }

    let badge = Object.keys(possibleBadges)[0];
    sum += calculateItemTypeScore(badge);

    elfId = 1;
    elvesItems = {};
  } else {
    elfId++;
  }
}

console.log(sum);