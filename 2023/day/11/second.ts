import getLines from "../../../helpers/readFile";

const EMPTY_SIZE = 1000000;

const universe = await getLines();

let emptyX: Record<number, boolean> = {};
let emptyY: Record<number, boolean> = {};

// not expanding universes this time, just marking the "jumps"
for (let row = 0; row < universe.length; row++) {
  let empty = true;
  for (let col = 0; col < universe[row].length; col++) {
    if (universe[row][col] !== ".") {
      empty = false;
      break;
    }
  }
  if (empty) {
    emptyY[row] = true;
  }
}

for (let col = 0; col < universe[0].length; col++) {
  let empty = true;
  for (let row = 0; row < universe.length; row++) {
    if (universe[row][col] !== ".") {
      empty = false;
      break;
    }
  }

  if (empty) {
    emptyX[col] = true;
  }
}

type Star = {
  x: number;
  y: number;
};

const stars: Star[] = [];
for (let col = 0; col < universe.length; col++) {
  for (let row = 0; row < universe[col].length; row++) {
    if (universe[col][row] === "#") {
      stars.push({
        x: row,
        y: col,
      });
    }
  }
}

let sum = 0;
for (let i = 0; i < stars.length; i++) {
  for (let j = i + 1; j < stars.length; j++) {
    sum += manhattanDistance(stars[i], stars[j]);
  }
}

console.log(sum);

function manhattanDistance(a: Star, b: Star) {
  let galaxyDistance = 0;
  let travelDistance = 0;
  const startX = Math.min(a.x, b.x);
  const endX = Math.max(a.x, b.x);
  const startY = Math.min(a.y, b.y);
  const endY = Math.max(a.y, b.y);

  for (let x = startX; x < endX; x++) {
    travelDistance++;
    if (emptyX[x]) {
      galaxyDistance++;
    }
  }

  for (let y = startY; y < endY; y++) {
    travelDistance++;
    if (emptyY[y]) {
      galaxyDistance++;
    }
  }

  return galaxyDistance * (EMPTY_SIZE - 1) + travelDistance;
}
