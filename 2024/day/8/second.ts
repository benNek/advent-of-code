import getLines, {printMap} from "../../../helpers/readFile.ts";
import {Point} from "../../../helpers/maps.ts";

const EMPTY_SPACE = ".";
const ANTINODE = "#";

const lines = await getLines();
const map = lines.map(line => line.split(""));

const frequencies = new Map<string, Point[]>;
for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        const value = lines[y][x];
        if (value === EMPTY_SPACE) {
            continue;
        }

        if (frequencies.has(value)) {
            frequencies.set(value, [...frequencies.get(value)!, { x, y }])
        } else {
            frequencies.set(value, [{ x, y }])
        }
    }
}

for (const key of frequencies.keys()) {
    // for each entry, we need to generate 2 antinode positions
    const points = frequencies.get(key)!;
    for (let pointA of points) {
        for (let pointB of points) {
            if (pointA === pointB) {
                continue;
            }

            const xDiff = pointA.x - pointB.x;
            const yDiff = pointA.y - pointB.y;

            let point: Point = {
                x: pointA.x + xDiff,
                y: pointA.y + yDiff,
            }
            while (updateMap(point)) {
                point = {
                    x: point.x + xDiff,
                    y: point.y + yDiff,
                }
            }
        }
    }
}

const unique = map.reduce((prev, curr) => prev + curr.filter(x => x !== EMPTY_SPACE).length, 0);

console.log(unique)

function updateMap(position: Point): boolean {
    if (position.x < 0 || position.x >= map.length) {
        return false;
    }

    if (position.y < 0 || position.y >= map[position.x].length) {
        return false;
    }

    if (map[position.y][position.x] === EMPTY_SPACE) {
        map[position.y][position.x] = ANTINODE;
    }
    return true;
}