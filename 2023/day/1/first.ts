import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const REGEX = /\d/;
const INPUT_FILE = "./input.txt";
const lines = await getLines(
  path.dirname(path.fromFileUrl(import.meta.url)),
  INPUT_FILE
);

let sum = 0;
for await (const line of lines) {
  let first: string | null = null;
  let last: string | null = null;

  let combo;
  for (const char of line) {
    if (isDigit(char)) {
      if (!first) {
        first = char;
      }
      last = char;
    }
  }

  if (!first || !last) {
    throw Error("Failed to calculate");
  }
  combo = Number.parseInt(first + last);
  sum += combo;
}

console.log(sum);

function isDigit(char: string): boolean {
  return REGEX.test(char);
}
