import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const MIN_DISTANCE_TO_MOVE_TAIL = 1.5;

const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");

let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;

const createKey = (x: number, y: number) => `${x};${y}`;

const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const areInLine = () => headX === tailX || headY === tailY;

const moveHead = (direction: string) => {
  switch (direction) {
    case 'R':
      headX++;
      break;
    case 'L':
      headX--;
      break;
    case 'U':
      headY++;
      break;
    case 'D':
      headY--;
      break;
    default:
      throw Error("Unknown head direction " + direction);
  }
};

const moveTail = (direction: string) => {
  if (direction === 'L' || direction === 'R') {
    if (!areInLine()) {
      tailY = headY;
    }
    tailX = tailX + (direction === 'L' ? -1 : 1);
  } else if (direction === 'U' || direction === 'D') {
    if (!areInLine()) {
      tailX = headX;
    }
    tailY = tailY + (direction === 'D' ? -1 : 1);
  } else {
    throw Error("Unknown tail direction " + direction);
  }
}

const visited = {[createKey(tailX, tailY)]: true};

for await (const line of lines) {
  const direction = line.split(' ')[0];
  const iterations = line.split(' ')[1];

  for (let it = 0; it < iterations; it++) {
    moveHead(direction);

    if (calculateDistance(headX, headY, tailX, tailY) >= MIN_DISTANCE_TO_MOVE_TAIL) {
      moveTail(direction);
      visited[createKey(tailX, tailY)] = true;
    }

    // console.log('dir: ', direction);
    // console.log(`head: ${headX};${headY}`);
    // console.log(`tail: ${tailX};${tailY}`);
    // console.log('-----');
  }
}

console.log(Object.keys(visited).length);
