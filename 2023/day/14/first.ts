import getLines from "../../../helpers/readFile";

const lines = await getLines();
const map = lines.map((x) => x.split(""));

// trying to move each individual rock up
for (let row = 0; row < map.length; row++) {
  for (let col = 0; col < map[row].length; col++) {
    if (map[row][col] === "O") {
      moveRockNorth(row, col);
    }
  }
}

const load = calculateLoad();
console.log("load:", load);

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
