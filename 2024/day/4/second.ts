import getLines from "../../../helpers/readFile.ts";

const GOAL = "MAS";

const puzzle = await getLines();

let count = 0;
for (let row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle[row].length; col++) {
        if (isRightSided(row, col) && isLeftSided(row, col)) count++;
    }
}
console.log("In total XMAS: ", count);

function isRightSided(row: number, col: number) {
    if (row - 1 < 0 || row + 1 >= puzzle.length) {
        return false;
    }

    let str = "";
    for (let offset = -1; offset <= 1; offset++) {
        str += puzzle[row + offset][col + offset];
    }

    return isSuccess(str);
}

function isLeftSided(row: number, col: number) {
    if (row - 1 < 0 || row + 1 >= puzzle.length) {
        return false;
    }

    let str = "";
    for (let offset = -1; offset <= 1; offset++) {
        str += puzzle[row + offset][col - offset];
    }

    return isSuccess(str);
}

function isSuccess(str: string) {
    return str === GOAL || str.split("").reverse().join("") === GOAL;
}