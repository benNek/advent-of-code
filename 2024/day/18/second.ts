import getLines from "../../../helpers/readFile.ts";
import {getHashKey, Point, printMap, TWO_DIMENSIONAL_MOVEMENTS} from "../../../helpers/maps.ts";

const EMPTY_SYMBOL = ".";
const CORRUPTED_SYMBOL = "#";
const MAP_SIZE = 71;
// const MAP_SIZE = 7;

const map: string[][] = [];
for (let y = 0; y < MAP_SIZE; y++) {
    let row: string[] = [];
    for (let x = 0; x < MAP_SIZE; x++) {
        row.push(EMPTY_SYMBOL);
    }
    map.push(row);
}

const lines = await getLines();
for (const line of lines) {
    const [x, y] = line.split(",").map(x => parseInt(x));
    map[y][x] = CORRUPTED_SYMBOL;

    const distance = bfs({x: 0, y: 0}, {x: MAP_SIZE - 1, y: MAP_SIZE - 1});
    if (distance === -1) {
        console.log("Failed due to a new byte");
        console.log(`${x},${y}`);
        break;
    }
}

type Node = {
    point: Point,
    distance: number,
}

function bfs(start: Point, end: Point) {
    const queue: Node[] = [];
    queue.push({point: start, distance: 0});
    const visited = new Set<string>();

    while (queue.length > 0) {
        const {point: {x, y}, distance} = queue.shift()!;
        const key = getHashKey(x, y);
        if (visited.has(key)) {
            continue;
        }
        visited.add(key);

        for (const [xOffset, yOffset] of TWO_DIMENSIONAL_MOVEMENTS) {
            const newX = x + xOffset;
            const newY = y + yOffset;

            const value = map[newY]?.[newX];
            if (value === EMPTY_SYMBOL) {
                queue.push({point: {x: newX, y: newY}, distance: distance + 1});
            }

            if (newX === end.x && newY === end.y) {
                return distance + 1;
            }
        }
    }

    return -1;
}