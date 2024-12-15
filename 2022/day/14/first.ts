import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";

enum FillType {
  EMPTY = '.',
  SAND = 'o',
  ROCK = 'X',
};

interface Point {
  x: number,
  y: number
}

const map: FillType[][] = [];

const isValidPath = (point1: Point, point2: Point) => point1.x === point2.x || point1.y === point2.y;

const updateFill = (x: number, y: number, fill: FillType) => {
  map[y - minPoint.y][x - minPoint.x] = fill;
};

const getFill = (x: number, y: number): FillType => {
  return map[y - minPoint.y][x - minPoint.x];
}

const printMap = () => {
  for (let y = 0; y < map.length; y++) {
    let line = "";
    for (let x = 0; x < map[y].length; x++) {
      line += map[y][x];
    }
    console.log(line);
  }
}

const simulateSandFall = () => {
  let x = 500;
  let y = 0;
  
  while (true) {
    if (y === maxPoint.y) {
      return false;
    }

    if (getFill(x, y + 1) === FillType.EMPTY) {
      y++;
    } else if (getFill(x - 1, y + 1) === FillType.EMPTY) {
      if (x - 2 < minPoint.x) {
        return false;
      }

      x--;
      y++;
    } else if (getFill(x + 1, y + 1) === FillType.EMPTY) {
      if (x + 2 > maxPoint.x) {
        return false;
      }

      x++;
      y++;
    } else {
      updateFill(x, y, FillType.SAND);
      return true;
    }
  }

  return false;
};

let minPoint: Point = {
  x: 9999,
  y: 0,
};
let maxPoint: Point = {
  x: -1,
  y: -1,
};
const paths: Point[][] = [];
const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");
for await (const line of lines) {
  const linePaths: Point[] = line.split(' -> ').map(point => ({
    x: parseInt(point.split(',')[0]),
    y: parseInt(point.split(',')[1]),
  }));

  linePaths.forEach(point => {
    minPoint.x = Math.min(minPoint.x, point.x);
    // min point y is 0 anyways
    maxPoint.x = Math.max(maxPoint.x, point.x);
    maxPoint.y = Math.max(maxPoint.y, point.y);
  })

  paths.push(linePaths);
}

for (let y = minPoint.y; y <= maxPoint.y; y++) {
  const line: FillType[] = [];
  for (let x = minPoint.x; x <= maxPoint.x; x++) {
    line.push(FillType.EMPTY);
  }
  map.push(line);
}

paths.forEach(path => {
  for (let i = 1; i < path.length; i++) {
    const from = path[i - 1];
    const to = path[i];

    if (!isValidPath(from, to)) {
      throw Error(`Incorrect path ${from.x},${from.y} -> ${to.x},${to.y}`);
    }

    if (from.x === to.x) {
      for (let y = Math.min(from.y, to.y); y <= Math.max(from.y, to.y); y++) {
        updateFill(from.x, y, FillType.ROCK);
      }
    } else {
      for (let x = Math.min(from.x, to.x); x <= Math.max(from.x, to.x); x++) {
        updateFill(x, from.y, FillType.ROCK);
      }
    }
  }
});

let count = 0;
while (simulateSandFall()) {
  count++;
}

printMap();
console.log(count);
