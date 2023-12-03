import getLines from "../../../helpers/readFile";

const lines = await getLines();

type NumberId = {
  value: string;
  row: number;
  startCol: number;
  endCol: number;
};

const DEFAULT_STATE: NumberId = {
  value: "",
  row: 0,
  startCol: 0,
  endCol: 0,
};

const allNumbers: NumberId[] = [];

let sum = 0;
let state = DEFAULT_STATE;
// generating all numbers and their position ranges
for (let row = 0; row < lines.length; row++) {
  for (let col = 0; col < lines[row].length; col++) {
    const currentChar = lines[row][col];
    if (isDigit(currentChar)) {
      if (state === DEFAULT_STATE) {
        state = { ...state };
        state.row = row;
        state.startCol = col;
      }

      state.value += currentChar;
      state.endCol = col;
    } else {
      if (state === DEFAULT_STATE) {
        continue;
      }
      allNumbers.push(state);

      state = DEFAULT_STATE;
    }
  }
}

if (state !== DEFAULT_STATE) {
  allNumbers.push(state);
}

// finding all asterisks and comparing them to existing numbers
for (let row = 0; row < lines.length; row++) {
  for (let col = 0; col < lines[row].length; col++) {
    const currentChar = lines[row][col];
    if (currentChar === "*") {
      sum += findProductOfTwoAdjacentNumbers(allNumbers, row, col);
    }
  }
}

console.log(sum);

function isDigit(char: string) {
  return /\d/.test(char);
}

function findProductOfTwoAdjacentNumbers(
  allNumbers: NumberId[],
  row: number,
  col: number
) {
  let product = 1;
  let countOfNumbers = 0;

  for (let i = 0; i < allNumbers.length; i++) {
    let { value, row: numberRow, startCol, endCol } = allNumbers[i];
    if (Math.abs(numberRow - row) > 1) {
      continue;
    }

    let nearby = false;
    for (let colIdx = col - 1; colIdx <= col + 1; colIdx++) {
      if (startCol <= colIdx && colIdx <= endCol) {
        nearby = true;
        break;
      }
    }

    if (nearby) {
      product *= Number.parseInt(value);
      countOfNumbers++;
    }
  }

  return countOfNumbers === 2 ? product : 0;
}
