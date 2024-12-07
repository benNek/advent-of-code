import getLines from "../../../helpers/readFile.ts";
import {Direction} from "../../../helpers/types.ts";
import {canMove, isOutOfMap, move, rotate} from "./helper.ts";

const START_CHAR = '^';
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
