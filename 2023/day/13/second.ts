import getLines from "../../../helpers/readFile";

const lines = await getLines();
const games: string[][] = [];

let game: string[] = [];
for (const line of lines) {
  if (!line.trim()) {
    games.push(game);
    game = [];
    continue;
  }

  game.push(line);
}
games.push(game);

let sum = 0;
for (const game of games) {
  sum += calculateScore(game);
}
console.log("Final:", sum);

// we need to calculate in a way, that after finding out we dont need to go more
function calculateScore(game: string[]) {
  for (let row = game.length - 1; row > 0; row--) {
    if (isHorizontalReflection(row, game)) {
      return row * 100;
    }
  }

  for (let col = game[0].length - 1; col > 0; col--) {
    if (isVerticalReflection(col, game)) {
      return col;
    }
  }

  return 0;
}

function isHorizontalReflection(row: number, game: string[]) {
  const totalRows = game.length;
  const iterations = Math.min(row, totalRows - row);

  let smudges = 0;
  for (let distance = 0; distance < iterations; distance++) {
    const upperRow = game[row - distance - 1];
    const lowerRow = game[row + distance];

    for (let col = 0; col < game[row].length; col++) {
      if (upperRow[col] !== lowerRow[col]) {
        smudges++;
        if (smudges > 1) {
          return false;
        }
      }
    }
  }
  return smudges === 1;
}

function isVerticalReflection(col: number, game: string[]) {
  const totalCols = game[0].length;
  const iterations = Math.min(col, totalCols - col);

  let smudges = 0;
  for (let distance = 0; distance < iterations; distance++) {
    for (let row = 0; row < game.length; row++) {
      if (game[row][col - distance - 1] !== game[row][col + distance]) {
        smudges++;
        if (smudges > 1) {
          return false;
        }
      }
    }
  }

  return smudges === 1;
}
