import getLines from "../../../helpers/readFile.ts";
import {getHashKey, Point, TWO_DIMENSIONAL_MOVEMENTS} from "../../../helpers/maps.ts";

const WALL_SYMBOL = "#";
const START_SYMBOL = "S";
const END_SYMBOL = "E";

const CHEAT_LENGTH = 2;

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

const endNode = bfs({ point: start, distance: 0});
if (!endNode) {
    throw Error("Failed to find initial path");
}
const runtime = endNode.distance;

// now starting with the last nodes, try cheating.
let currentNode: Node | undefined = endNode;

let cnt = 0;
while (currentNode) {
    // find all possible positions for cheating start
    const startPoints = getPossibleLocations(currentNode.point);
    // console.log(startPoints);
    for (const point of startPoints) {
        const end = bfs({ point: point, distance: currentNode.distance + 2 });
        const dist = runtime - (end?.distance ?? 0);
        if (dist >= 100) {
            cnt++;
        }
    }

    currentNode = currentNode.from;
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

    while (queue.length > 0) {
        const node = queue.shift()!;
        const { point, distance } = node;

        const key = getHashKey(point.x, point.y);
        if (visited.has(key)) {
            continue;
        }
        visited.add(key);

        for (const [x, y] of TWO_DIMENSIONAL_MOVEMENTS) {
            const newX = point.x + x;
            const newY = point.y + y;
            const value = map[newY][newX];

            const newNode: Node = {
                point: {x: newX, y: newY},
                distance: distance + 1,
                from: node
            };

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

function getPossibleLocations(point: Point): Point[] {
    const visited = new Set();
    const options: Point[] = [];
    for (const [x, y] of TWO_DIMENSIONAL_MOVEMENTS) {
        if (map[point.y + y][point.x + x] === WALL_SYMBOL) {
            for (const [x2, y2] of TWO_DIMENSIONAL_MOVEMENTS) {
                const newX = point.x + x + x2;
                const newY = point.y + y + y2;
                if (newY < 0 || newY >= map.length || newX < 0 || newX >= map[newY].length) {
                    continue;
                }

                const key = getHashKey(newX, newY);

                if (visited.has(key)) {
                    continue;
                }
                if (newX === point.x && newY === point.y) {
                    continue;
                }

                if (map[newY][newX] !== WALL_SYMBOL) {
                    options.push({x: newX, y: newY});
                    visited.add(key);
                }
            }
        }
    }

    return options;
}