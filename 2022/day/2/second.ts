import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";

const INPUT_FILE = "./input.txt";
const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), INPUT_FILE);

const WIN_POINTS = 6;
const DRAW_POINTS = 3;

const SCORES = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissor
};

const OUTCOME_SCORES = {
  X: 0,
  Y: 3,
  Z: 6,
}

const CORRECT_CHOICE = {
  A: {
    X: 'C', // lose scenario
    Y: 'A', // draw scenario
    Z: 'B' // win scenario
  },
  B: {
    X: 'A',
    Y: 'B',
    Z: 'C',
  },
  C: {
    X: 'B',
    Y: 'C',
    Z: 'A', 
  }
}

let score = 0;
for await (const line of lines) {
  const data = line.split(' ');
  const opponentChoice = data[0];
  const desiredOutcome = data[1];

  const myChoice = CORRECT_CHOICE[opponentChoice][desiredOutcome];
  score += SCORES[myChoice] + OUTCOME_SCORES[desiredOutcome];
}

console.log(score);
