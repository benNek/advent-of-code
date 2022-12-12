import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const START_SYMBOL = 'E';
const FINAL_SYMBOL = 'a';
const INPUT_FILE = "./input.txt";
const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), INPUT_FILE);

const map: string[][] = [];

const createKey = (x: number, y: number) => `${x}:${y}`;

const fromKey = (key: string) => [parseInt(key.split(':')[0]), parseInt(key.split(':')[1])];

const canClimb = (currentHeight: string, nextHeight: string) => {
  let height = currentHeight === START_SYMBOL ? 'z' : currentHeight;
  return height.charCodeAt(0) - nextHeight.charCodeAt(0) <= 1;
}

const hasWon = (x: number, y: number, height: string) => {
  if (height !== FINAL_SYMBOL) {
    return false;
  }

  if (map[y - 1][x] === FINAL_SYMBOL) {
    return true;
  } else if (map[y + 1][x] === FINAL_SYMBOL) {
    return true;
  } else if (map[y][x - 1] === FINAL_SYMBOL) {
    return true;
  } else if (map[y][x + 1] === FINAL_SYMBOL) {
    return true;
  }
}

let startingPosition = createKey(0, 0);
let yPos = 0;
for await (const line of lines) {
  let currentRow: string[] = [];
  for (let x = 0; x < line.length; x++) {
    currentRow.push(line[x]);
    if (line[x] === START_SYMBOL) {
      startingPosition = createKey(x, yPos);
    }
  }
  yPos++;
  map.push(currentRow);
}

const visited: boolean[][] = [];
const visitedFrom: string[][] = [];
for (let i = 0; i < map.length; i++) {
  const row: boolean[] = [];
  const fromRow: string[] = [];
  for (let j = 0; j < map[i].length; j++) {
    row.push(false);
    fromRow.push("-1;-1");
  }
  visited.push(row);
  visitedFrom.push(fromRow);
}

const queue: string[] = [ startingPosition ];
const startCoord = fromKey(startingPosition);
visited[startCoord[1]][startCoord[0]] = true;

let finalPosition = createKey(-1, -1);

while (queue.length > 0) {
  const point = queue.shift()!;
  const [x, y] = fromKey(point);
  const height = map[y][x]
  
  if (hasWon(x, y, height)) {
    finalPosition = createKey(x, y);
    break;
  }

  // up
  if (y > 0 && canClimb(height, map[y - 1][x]) && !visited[y - 1][x]) {
    visited[y - 1][x] = true;
    visitedFrom[y - 1][x] = point;
    queue.push(createKey(x, y - 1));
  }
  // down
  if (y + 1 < map.length && canClimb(height, map[y + 1][x]) && !visited[y + 1][x]) {
    visited[y + 1][x] = true;
    visitedFrom[y + 1][x] = point;
    queue.push(createKey(x, y + 1));
  }
  // right
  if (x + 1 < map[y].length && canClimb(height, map[y][x + 1]) && !visited[y][x + 1]) {
    visited[y][x + 1] = true;
    visitedFrom[y][x + 1] = point;
    queue.push(createKey(x + 1, y));
  }
  // left
  if (x > 0 && canClimb(height, map[y][x - 1]) && !visited[y][x - 1]) {
    visited[y][x - 1] = true;
    visitedFrom[y][x - 1] = point;
    queue.push(createKey(x - 1, y));
  }
}

if (finalPosition === '-1:-1') {
  throw Error('Could not find finish');
}

// backtrace
let distance = 0;
let [x, y] = fromKey(finalPosition);
let height = 'z';

while (height !== START_SYMBOL) {
  distance++;
  [x, y] = fromKey(visitedFrom[y][x]);
  height = map[y][x];
}

console.log(distance);