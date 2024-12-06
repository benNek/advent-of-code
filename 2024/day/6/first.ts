import getLines from "../../../helpers/readFile.ts";
import {Direction} from "../../../helpers/types.ts";

const START_CHAR = '^';
const OBSTACLE_CHAR = "#";
const VISITED_CHAR = "X";

const lines = await getLines();
const map = lines.map(x => x.split(''));

let currentRow = 0;
let currentCol = 0;
for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
        if (map[row][col] === START_CHAR) {
            currentRow = row;
            currentCol = col;
            row = map.length;
            break;
        }
    }
}

let direction = Direction.UP;

while (true) {
    if (isOutOfMap(map, currentRow, currentCol)) {
        break;
    }
    map[currentRow][currentCol] = VISITED_CHAR;

    if (!canMove(map, currentRow, currentCol, direction)) {
        direction = rotate(direction);
    }

    let coords = move(currentRow, currentCol, direction);
    currentRow = coords[0];
    currentCol = coords[1];
}

let visitedCells = 0;
map.forEach(line => {
    visitedCells += line.filter(x => x === VISITED_CHAR).length;
})
console.log(`In total ${visitedCells} cells were visited`);

function isOutOfMap(map: string[][], row: number, col: number) {
    return row < 0 || row >= map.length || col < 0 || col >= map[row].length;
}


function canMove(map: string[][], row: number, col: number, direction: Direction) {
    switch (direction) {
        case Direction.UP:
            return map[row - 1]?.[col] !== OBSTACLE_CHAR;
        case Direction.DOWN:
            return map[row + 1]?.[col] !== OBSTACLE_CHAR;
        case Direction.RIGHT:
            return map[row]?.[col + 1] !== OBSTACLE_CHAR;
        case Direction.LEFT:
            return map[row]?.[col - 1] !== OBSTACLE_CHAR;
    }
}

function rotate(direction: Direction): Direction {
    switch (direction) {
        case Direction.UP:
            return Direction.RIGHT;
        case Direction.RIGHT:
            return Direction.DOWN;
        case Direction.DOWN:
            return Direction.LEFT;
        case Direction.LEFT:
            return Direction.UP;
    }
}

function move(row: number, col: number, direction: Direction): [number, number] {
    switch (direction) {
        case Direction.UP:
            return [row - 1, col];
        case Direction.DOWN:
            return [row + 1, col];
        case Direction.LEFT:
            return [row, col - 1];
        case Direction.RIGHT:
            return [row, col + 1];
    }
}
