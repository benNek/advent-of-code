import getLines from "../../../helpers/readFile.ts";

const HEIGHT = 7;
const OCCUPIED = "#";

const lines = await getLines() as string[];

type Column = number[];

const locks: Column[] = [];
const keys: Column[] = [];

for (let i = 0; i < lines.length; i += HEIGHT + 1) {
    const grid = lines.slice(i, i + HEIGHT).map(line => line.split(""));
    if (grid[0][0] === OCCUPIED) {
        locks.push(calculateLock(grid));
    } else {
        keys.push(calculateKey(grid));
    }
}

let count = 0;
for (const lock of locks) {
    for (const key of keys) {
        if (isMatching(lock, key)) {
            count++;
        }
    }
}
console.log("Total is", count);

function isMatching(lock: Column, key: Column) {
    for (let i = 0; i < lock.length; i++) {
        if (lock[i] + key[i] > 5) {
            return false;
        }
    }
    return true;
}

function calculateLock(grid: string[][]): Column {
    const scores: Column = [];
    for (let x = 0; x < grid[0].length; x++) {
        let score = 0;
        for (let y = 1; y < grid.length; y++) {
            if (grid[y][x] === OCCUPIED) {
                score++;
            }
        }
        scores.push(score);
    }
    return scores;
}

function calculateKey(grid: string[][]): Column {
    const scores: Column = [];
    for (let x = 0; x < grid[0].length; x++) {
        let score = 0;
        for (let y = grid.length - 2; y >= 0; y--) {
            if (grid[y][x] === OCCUPIED) {
                score++;
            }
        }
        scores.push(score);
    }
    return scores;
}

