import getLines from "../../../helpers/readFile.ts";
import {getHashKey, Point, TWO_DIMENSIONAL_MOVEMENTS} from "../../../helpers/maps.ts";

const WALL_SYMBOL = "#";
const START_SYMBOL = "S";
const END_SYMBOL = "E";

const CHEAT_LENGTH = 20;

const lines = await getLines();

const map = lines.map((line) => line.split(""));
let start: Point | undefined;
let end: Point | undefined;

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === START_SYMBOL) {
            start = {x, y};
        } else if (map[y][x] === END_SYMBOL) {
            end = {x, y};
        }
    }
}

if (!start || !end) {
    throw Error("Failed to find start and/or end points");
}

const distances = new Map<string, number>();
const endNode = bfs({ point: start, distance: 0});
if (!endNode) {
    throw Error("Failed to find initial path");
}

let cnt = 0;
const pairs = getAllPairs(Array.from(distances.keys()));
for (const pair of pairs) {
    const [k1, k2] = pair;
    const [x1, y1] = k1.split("-").map(x => parseInt(x, 10));
    const [x2, y2] = k2.split("-").map(x => parseInt(x, 10));
    const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    const savings = distances.get(k2)! - distances.get(k1)! - distance;
    if (distance < 21 && savings >= 100) {
        cnt++;
    }
}
console.log(cnt);

type Node = {
    point: Point;
    distance: number;
    from?: Node,
}

function bfs(start: Node): Node | undefined {
    const visited = new Set();
    const queue: Node[] = [start];
    distances.set(getHashKey(start.point.x, start.point.y), 0);

    while (queue.length > 0) {
        const node = queue.shift()!;
        const { point, distance } = node;

        for (const [x, y] of TWO_DIMENSIONAL_MOVEMENTS) {
            const newX = point.x + x;
            const newY = point.y + y;
            const key = getHashKey(newX, newY);
            const value = map[newY][newX];

            if (visited.has(key)) {
                continue;
            }
            visited.add(key);

            const newNode: Node = {
                point: {x: newX, y: newY},
                distance: distance + 1,
                from: node
            };
            distances.set(key, distance + 1);

            if (value !== WALL_SYMBOL) {
                queue.push(newNode);
            }

            if (value === END_SYMBOL) {
                return newNode;
            }
        }
    }

    return undefined;
}

function getAllPairs(options: string[]): [string, string][] {
    const pairs: [string, string][] = [];
    for (let i = 0; i < options.length; i++) {
        for (let j = i + 1; j < options.length; j++) {
            pairs.push([options[i], options[j]]);
        }
    }

    return pairs;
}