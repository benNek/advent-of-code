import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");

const map: number[][] = [];
for await (const line of lines) {
  const row: number[] = [];
  for (let i = 0; i < line.length; i++) {
    row.push(parseInt(line[i]));
  }
  map.push(row);
}

let maxScenicScore = -1;
for (let rowNumber = 0; rowNumber < map.length; rowNumber++) {
  for (let colNumber = 0; colNumber < map[rowNumber].length; colNumber++) {
    const scenicScore = calculateScenicScore(rowNumber, colNumber);
    maxScenicScore = Math.max(scenicScore, maxScenicScore);
  }
}

console.log(maxScenicScore)

function calculateScenicScore(rowNumber: number, colNumber: number): number {
  const height = map[rowNumber][colNumber];

  let rightScore = 0;
  for (let x = colNumber + 1; x < map[rowNumber].length; x++) {
    rightScore++;
    if (map[rowNumber][x] >= height) {
      break;
    }
  }

  let leftScore = 0;
  for (let x = colNumber - 1; x >= 0; x--) {
    leftScore++;
    if (map[rowNumber][x] >= height) {
      break;
    }
  }

  let topScore = 0;
  for (let y = rowNumber - 1; y >= 0; y--) {
    topScore++;
    if (map[y][colNumber] >= height) {
      break;
    }
  }

  let bottomScore = 0;
  for (let y = rowNumber + 1; y < map[0].length; y++) {
    bottomScore++;
    if (map[y][colNumber] >= height) {
      break;
    }
  }

  return rightScore * leftScore * topScore * bottomScore;
}