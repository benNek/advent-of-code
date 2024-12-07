import getLines, {printMap} from "../../../helpers/readFile.ts";
import {Direction} from "../../../helpers/types.ts";
import {canMove, isOutOfMap, move, rotate} from "./helper.ts";

const START_CHAR = '^';
const OBSTACLE_CHAR = "#";

const lines = await getLines();

let startRow = 0;
let startCol = 0;
for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
        if (lines[row][col] === START_CHAR) {
            startRow = row;
            startCol = col;
            row = lines.length;
            break;
        }
    }
}

let loops = 0;
for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
        if (lines[row][col] === START_CHAR) {
            continue;
        }

        const map = lines.map(x => x.split(''));
        map[row][col] = OBSTACLE_CHAR;

        if (isALoop(map, startRow, startCol)) {
            loops++;
        }
    }
}

console.log("There are total of " + loops + " loops.");


function isALoop(map: string[][], startRow: number, startCol: number): boolean {
    let cache = new Map<string, boolean>();

    let direction = Direction.UP;
    let row = startRow;
    let col = startCol;
    while (true) {
        if (isOutOfMap(map, row, col)) {
            return false;
        }

        if (!canMove(map, row, col, direction)) {
            direction = rotate(direction);
            continue;
        }

        let coords = move(row, col, direction);
        row = coords[0];
        col = coords[1];

        const cacheKey = getCacheKey(row, col, direction);
        // if we have been here with same direction, then it's a loop
        if (cache.has(cacheKey)) {
            return true;
        }
        cache.set(cacheKey, true);
    }
}

function getCacheKey(row: number, col: number, direction: Direction): string {
    return `${direction}-${row}-${col};`
}