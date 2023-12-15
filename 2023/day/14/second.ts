import getLines from "../../../helpers/readFile";

const lines = await getLines();
const map = lines.map((x) => x.split(""));

const cycles = 1000000000;

const seenMap: Record<string, number> = {};
// trying to move each individual rock up
for (let i = 0; i < cycles; i++) {
  cycle();

  const hash = hashGrid();
  if (seenMap[hash]) {
    const loopStart = seenMap[hash];
    const loopLength = i - loopStart;

    const remaining = cycles - 1 - i;
    const remainingMod = remaining % loopLength;
    for (let j = 0; j < remainingMod; j++) {
      cycle();
    }
    break;
  }
  seenMap[hash] = i;
}

const load = calculateLoad();
console.log("load:", load);

function cycle() {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === "O") {
        moveRockNorth(row, col);
      }
    }
  }

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === "O") {
        moveRockWest(row, col);
      }
    }
  }

  for (let row = map.length - 1; row >= 0; row--) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === "O") {
        moveRockSouth(row, col);
      }
    }
  }

  for (let row = 0; row < map.length; row++) {
    for (let col = map[row].length - 1; col >= 0; col--) {
      if (map[row][col] === "O") {
        moveRockEast(row, col);
      }
    }
  }
}

function moveRockNorth(row: number, col: number) {
  let newRow = row;
  for (let currRow = row - 1; currRow >= 0; currRow--) {
    if (map[currRow][col] !== ".") {
      break;
    }
    newRow = currRow;
  }
  map[row][col] = ".";
  map[newRow][col] = "O";
}

function moveRockWest(row: number, col: number) {
  let newCol = col;
  for (let currCol = col - 1; currCol >= 0; currCol--) {
    if (map[row][currCol] !== ".") {
      break;
    }
    newCol = currCol;
  }
  map[row][col] = ".";
  map[row][newCol] = "O";
}

function moveRockSouth(row: number, col: number) {
  let newRow = row;
  for (let currRow = row + 1; currRow < map.length; currRow++) {
    if (map[currRow][col] !== ".") {
      break;
    }
    newRow = currRow;
  }
  map[row][col] = ".";
  map[newRow][col] = "O";
}

function moveRockEast(row: number, col: number) {
  let newCol = col;
  for (let currCol = col + 1; currCol < map[row].length; currCol++) {
    if (map[row][currCol] !== ".") {
      break;
    }
    newCol = currCol;
  }
  map[row][col] = ".";
  map[row][newCol] = "O";
}

function hashGrid() {
  //sha256 hash
  const hasher = new Bun.CryptoHasher("sha256");
  return hasher.update(map.map((row) => row.join("")).join("\n")).digest("hex");
}

function calculateLoad() {
  let load = 0;
  let rowLoad = 1;
  for (let row = map.length - 1; row >= 0; row--, rowLoad++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === "O") {
        load += rowLoad;
      }
    }
  }
  return load;
}
