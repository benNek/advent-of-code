import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const REGEX = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
const NUMBER_REGEX = /\d/;
const INPUT_FILE = "./input.txt";
const lines = await getLines(
  path.dirname(path.fromFileUrl(import.meta.url)),
  INPUT_FILE
);

let sum = 0;
for await (const line of lines) {
  let first: string | null = null;
  let last: string | null = null;

  let combo = "";
  const matches = line.matchAll(REGEX);
  for (const match of matches) {
    if (!first) {
      first = match[1];
    }
    last = match[1];
  }

  if (!isDigit(first)) {
    combo += toInteger(first);
  } else {
    combo += first;
  }

  if (!isDigit(last)) {
    combo += toInteger(last);
  } else {
    combo += last;
  }

  sum += Number.parseInt(combo);
}

console.log(sum);

function isDigit(str: string | null): boolean {
  if (!str) {
    return false;
  }
  return NUMBER_REGEX.test(str);
}

function toInteger(str: string | null) {
  switch (str) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      throw Error("failarauskas");
  }
}
