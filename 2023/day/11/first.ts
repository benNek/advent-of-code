import getLines from "../../../helpers/readFile";

const universe = await getLines();
let expandedUniverse = [...universe];
let expandedRows = 0;
let expandedCols = 0;

// expand the universes first
for (let row = 0; row < universe.length; row++) {
  let empty = true;
  for (let col = 0; col < universe[row].length; col++) {
    if (universe[row][col] !== ".") {
      empty = false;
      break;
    }
  }
  if (empty) {
    expandedUniverse.splice(row + expandedRows++, 0, universe.at(row)!);
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
    for (
      let rowToUpdate = 0;
      rowToUpdate < expandedUniverse.length;
      rowToUpdate++
    ) {
      const str = expandedUniverse[rowToUpdate];
      expandedUniverse[rowToUpdate] =
        str.slice(0, col + expandedCols) +
        "." +
        str.substring(col + expandedCols);
    }
    expandedCols++;
  }
}

type Star = {
  x: number;
  y: number;
};

const stars: Star[] = [];
for (let col = 0; col < expandedUniverse.length; col++) {
  for (let row = 0; row < expandedUniverse[col].length; row++) {
    if (expandedUniverse[col][row] === "#") {
      stars.push({
        x: row,
        y: col,
      });
    }
  }
}

let sum = 0;
for (const star1 of stars) {
  for (const star2 of stars) {
    if (star1 === star2) continue;
    sum += manhattanDistance(star1, star2);
  }
}

console.log(sum / 2);

function manhattanDistance(a: Star, b: Star) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
