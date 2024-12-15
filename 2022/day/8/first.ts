import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";

const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");

enum Status {
  INVISIBLE = -1,
  UNKNOWN = 0,
  VISIBLE = 1,
};

const map: number[][] = [];
for await (const line of lines) {
  const row: number[] = [];
  for (let i = 0; i < line.length; i++) {
    row.push(parseInt(line[i]));
  }
  map.push(row);
}

// fill with true values and we will correctly set it later
const visibilityMap: Status[][] = [];
for (let rowNumber = 0; rowNumber < map.length; rowNumber++) {
  const visibility: Status[] = [];
  for (let colNumber = 0; colNumber < map[rowNumber].length; colNumber++) {
    visibility.push(Status.UNKNOWN);
    }
  visibilityMap.push(visibility);
}

for (let rowNumber = 0; rowNumber < map.length; rowNumber++) {
  const row = map[rowNumber];

  // >>>>>>>>>>>>
  let maxHeight = -1;
  for (let colNumber = 0; colNumber < row.length; colNumber++) {
    const height = row[colNumber];
    visibilityMap[rowNumber][colNumber] = checkVisibility(height, visibilityMap[rowNumber][colNumber], maxHeight);

    maxHeight = Math.max(height, maxHeight);
  }

  maxHeight = -1;
  // <<<<<<<<<<<
  for (let colNumber = row.length - 1; colNumber > 0; colNumber--) {
    const height = row[colNumber];
    visibilityMap[rowNumber][colNumber] = checkVisibility(height, visibilityMap[rowNumber][colNumber], maxHeight);

    maxHeight = Math.max(height, maxHeight);
  }
}

for (let colNumber = 0; colNumber < map[0].length; colNumber++) {
  // DOWN
  let maxHeight = -1;
  for(let rowNumber = 0; rowNumber < map.length; rowNumber++) {
    const height = map[rowNumber][colNumber];
    visibilityMap[rowNumber][colNumber] = checkVisibility(height, visibilityMap[rowNumber][colNumber], maxHeight);

    maxHeight = Math.max(height, maxHeight);
  }

  // UP
  maxHeight = -1;
  for(let rowNumber = map.length - 1; rowNumber > 0; rowNumber--) {
    const height = map[rowNumber][colNumber];
    visibilityMap[rowNumber][colNumber] = checkVisibility(height, visibilityMap[rowNumber][colNumber], maxHeight);

    maxHeight = Math.max(height, maxHeight);
  }
}

let visibleCount = 0;
for (let rowNumber = 0; rowNumber < visibilityMap.length; rowNumber++) {
  for (let colNumber = 0; colNumber < visibilityMap[rowNumber].length; colNumber++) {
    if (visibilityMap[rowNumber][colNumber] === Status.VISIBLE) {
      visibleCount++;
    }
  }
}
console.log(visibleCount)

function checkVisibility(height: number, status: Status, maxHeight: number) {
  if (height <= maxHeight && status === Status.UNKNOWN) {
    return Status.INVISIBLE;
  } else if (height > maxHeight) {
    return Status.VISIBLE;
  }
  return status;
}