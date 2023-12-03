import getLines from "../../../helpers/readFile";

const lines = await getLines();

const DEFAULT_STATE = {
  hasSymbol: false,
  value: "",
};

let sum = 0;
let state = DEFAULT_STATE;
for (let row = 0; row < lines.length; row++) {
  for (let col = 0; col < lines[row].length; col++) {
    const currentChar = lines[row][col];
    if (isDigit(currentChar)) {
      state = { ...state, value: state.value + currentChar };
      if (!state.hasSymbol && isCharacterAround(lines, row, col)) {
        state.hasSymbol = true;
      }
    } else {
      if (state === DEFAULT_STATE) {
        continue;
      }

      if (state.hasSymbol) {
        sum += Number.parseInt(state.value, 10);
      }

      state = DEFAULT_STATE;
    }
  }
}

if (state !== DEFAULT_STATE && state.hasSymbol) {
  sum += Number.parseInt(state.value, 10);
}

console.log(sum);

function isDigit(char: string) {
  return /\d/.test(char);
}

// also checks diagonally
function isCharacterAround(scheme: string[], row: number, col: number) {
  for (let rowIdx = row - 1; rowIdx <= row + 1; rowIdx++) {
    for (let colIdx = col - 1; colIdx <= col + 1; colIdx++) {
      const char = scheme[rowIdx]?.[colIdx] ?? null;
      if (char && !isDigit(char) && char !== ".") {
        return true;
      }
    }
  }
  return false;
}
