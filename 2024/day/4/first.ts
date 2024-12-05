import getLines from "../../../helpers/readFile.ts";

const GOAL = "XMAS";

const puzzle = await getLines();

let count = 0;
for (let row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle[row].length; col++) {
        if (isHorizontal(row, col)) count++;
        if (isVertical(row, col)) count++;
        if (isDiagonalLeft(row, col)) count++;
        if (isDiagonalRight(row, col)) count++;
    }
}
console.log("In total XMAS: ", count);

function isHorizontal(row: number, col: number) {
    let str = "";
    for (let colOffset = 0; colOffset < GOAL.length; colOffset++) {
        str += puzzle[row][col + colOffset];
    }

    return isSuccess(str);
}

function isVertical(row: number, col: number) {
    if (row + GOAL.length > puzzle.length) {
        return false;
    }

    let str = "";
    for (let rowOffset = 0; rowOffset < GOAL.length; rowOffset++) {
        str += puzzle[row + rowOffset][col];
    }

    return isSuccess(str);
}

function isDiagonalLeft(row: number, col: number) {
    let str = "";

    if (row + GOAL.length > puzzle.length) {
        return false;
    }

    for (let offset = 0; offset < GOAL.length; offset++) {
        str += puzzle[row + offset][col - offset];
    }

    return isSuccess(str);
}

function isDiagonalRight(row: number, col: number) {
    let str = "";

    if (row + GOAL.length > puzzle.length) {
        return false;
    }

    for (let offset = 0; offset < GOAL.length; offset++) {
        str += puzzle[row + offset][col + offset];
    }

    return isSuccess(str);
}

function isSuccess(str: string) {
    return str === GOAL || str.split("").reverse().join("") === GOAL
}
