import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const INPUT_FILE = "./input.txt";
const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), INPUT_FILE);

const WIN_POINTS = 6;
const DRAW_POINTS = 3;

const SCORES = {
  X: 1,
  Y: 2,
  Z: 3,
};

const LOSES_TO = {
  'A': 'Y',
  'B': 'Z',
  'C': 'X',
  'X': 'B',
  'Y': 'C',
  'Z': 'A',
}

let score = 0;
for await (const line of lines) {
  const choices = line.split(' ');
  const opponentChoice = choices[0];
  const myChoice = choices[1];

  score += SCORES[myChoice];
  if (LOSES_TO[opponentChoice] === myChoice) {
    score += WIN_POINTS;
  } else if (LOSES_TO[myChoice] !== opponentChoice) {
    score += DRAW_POINTS;
  }
}

console.log(score);
