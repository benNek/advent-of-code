import getLines from "../../../helpers/readFile.ts";
import {getHashKey, Point, printMap, TWO_DIMENSIONAL_MOVEMENTS_DIRECTED} from "../../../helpers/maps.ts";
import colors from "colors";
import {Direction} from "../../../helpers/types.ts";
import {PriorityQueue} from "../../../helpers/structures/PriorityQueue.ts";

const WALL_SYMBOL = "#";
const START_SYMBOL = "S";
const END_SYMBOL = "E";

const ROTATE_SCORE = 1000;
const MOVE_SCORE = 1;

const SYMBOL_COLOR_MAP: Record<string, colors.Color> = {
    [WALL_SYMBOL]: colors.grey,
    [START_SYMBOL]: colors.blue,
    [END_SYMBOL]: colors.yellow,
}

const lines = await getLines();

const map: string[][] = lines.map(line => line.split(""));

let startPoint: Point | undefined;
let endPoint: Point | undefined;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === START_SYMBOL) {
            startPoint = {x, y};
        } else if (map[y][x] === END_SYMBOL) {
            endPoint = {x, y};
        }
    }
}

if (!startPoint || !endPoint) {
    throw Error("RIP no start or end point detected");
}

// printMap(map, SYMBOL_COLOR_MAP);

const seats = findSeatCount(startPoint, endPoint);
console.log("total seats", seats)

type Pointed = {
    point: Point;
    direction: Direction;
    path: Set<string>;
}

function findSeatCount(start: Point, end: Point): number {
    const queue = new PriorityQueue<Pointed>();
    const distances: Record<string, number> = {};
    const visited: Record<string, boolean> = {};
    queue.enqueue({point: start, direction: Direction.RIGHT, path: new Set()}, 0);
    let minDistance = Infinity;

    let uniquePoints: Set<string> = new Set();

    while (!queue.isEmpty()) {
        const node = queue.dequeue()!;

        const key = getHashKey(node.point.x, node.point.y);
        if (visited[key]) {
            continue;
        }
        distances[getHashKey(start.x, start.y)] = 0;
        visited[key] = true;

        for (const [xOffset, yOffset, direction] of TWO_DIMENSIONAL_MOVEMENTS_DIRECTED) {
            const x = node.point.x + xOffset;
            const y = node.point.y + yOffset;

            const weight = direction === node.direction ? MOVE_SCORE : ROTATE_SCORE + MOVE_SCORE;
            const neighborKey = getHashKey(x, y);
            if (map[y][x] === WALL_SYMBOL) {
                continue;
            }

            if (!visited[neighborKey] && distances[key] + weight < (distances[neighborKey] ?? Infinity)) {
                distances[neighborKey] = distances[key] + weight;
                const path = new Set(node.path);
                path.add(key);
                queue.enqueue({
                    point: {x, y},
                    direction: direction,
                    path,
                }, distances[neighborKey])
            }

            if (x === end.x && y === end.y) {
                if (distances[neighborKey] < minDistance) {
                    minDistance = distances[neighborKey];
                    uniquePoints = new Set(...node.path, key);
                } else if (distances[neighborKey] === minDistance) {
                    node.path.forEach(point => uniquePoints.add(point));
                    uniquePoints.add(key);
                }
            }
        }
    }

    return uniquePoints.size;
}