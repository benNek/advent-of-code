import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";

const INPUT_FILE = "./input.txt";
const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), INPUT_FILE);

let totallyContained = 0;
for await (const line of lines) {
  const firstSection = line.split(',')[0];
  const firstMin = parseInt(firstSection.split('-')[0], 10);
  const firstMax = parseInt(firstSection.split('-')[1], 10);

  const secondSection = line.split(',')[1];
  const secondMin = parseInt(secondSection.split('-')[0], 10);
  const secondMax = parseInt(secondSection.split('-')[1], 10);
  if (firstMin >= secondMin && firstMax <= secondMax) {
    totallyContained++;
  } else if (secondMin >= firstMin && secondMax <= firstMax) {
    totallyContained++;
  }
}

console.log(totallyContained);