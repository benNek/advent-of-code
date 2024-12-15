import getLines from "../../../helpers/readFile.ts";
import {DIRECTION_TO_MOVEMENT, getHashKey, printMap} from "../../../helpers/maps.ts";
import {isVisualMode} from "../../../helpers/execution.ts";
import colors, {blue} from "colors";

const WALL_SYMBOL = "#";
const BOX_SYMBOL = "O";
const BOX_START_SYMBOL = "[";
const BOX_END_SYMBOL = "]";
const EMPTY_SYMBOL = ".";
const ROBOT_SYMBOL = "@";

const symbolColorMap: Record<string, colors.Color> = {
    [WALL_SYMBOL]: colors.grey,
    [ROBOT_SYMBOL]: colors.blue,
    [BOX_START_SYMBOL]: colors.yellow,
    [BOX_END_SYMBOL]: colors.yellow,
}

const lines = await getLines();

type Box = {
    y: number;
    leftX: number;
    rightX: number;
}

const map: string[][] = [];
let instructions = "";

let robotX = 0;
let robotY = 0;
for (const line of lines) {
    if (line[0] === WALL_SYMBOL) {
        // we need to double the size of the map
        let newLine = "";
        for (let i = 0; i < line.length; i++) {
            if (line[i] === ROBOT_SYMBOL) {
                newLine += ROBOT_SYMBOL + EMPTY_SYMBOL;
            } else if (line[i] === BOX_SYMBOL) {
                newLine += BOX_START_SYMBOL + BOX_END_SYMBOL;
            } else {
                newLine += line[i] + line[i];
            }
        }

        map.push(newLine.split(""));
        if (newLine.includes(ROBOT_SYMBOL)) {
            robotX = newLine.indexOf(ROBOT_SYMBOL);
            robotY = map.length - 1;
        }
    } else if (line.trim().length > 0) {
        instructions += line;
    }
}

for (const direction of instructions) {
    const movement = DIRECTION_TO_MOVEMENT[direction];

    [robotX, robotY] = move(robotX, robotY, movement)

    if (isVisualMode()) {
        console.clear();
        console.log(`pos={${colors.blue(robotX.toString())},${colors.blue(robotY.toString())}}, dir={${colors.blue(direction)}}\n`);
        printMap(map, symbolColorMap);
        prompt("Press enter to continue");
    }
}
printMap(map, symbolColorMap);

let score = 0;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === BOX_START_SYMBOL) {
            score += x + 100 * y;
        }
    }
}
console.log("Total score is", score);

function move(x: number, y: number, movement: number[]): [number, number] {
    if (map[y + movement[1]][x + movement[0]] === WALL_SYMBOL) {
        return [x, y];
    }

    // need to update this logic to find all boxes that would be pushed and check them individually
    // since boxes are in width and not height, we can only push spreading out boxes when moving up or down
    const boxes: Box[] = findImpactedBoxes(x + movement[0], y + movement[1], movement);
    if (!boxes.every(box => canPushBox(box, movement))) {
        return [x, y];
    }

    const newBoxes: Box[] = [];
    for (const box of boxes) {
        map[box.y][box.leftX] = EMPTY_SYMBOL;
        map[box.y][box.rightX] = EMPTY_SYMBOL;

        const newY = box.y + movement[1];
        const newLeftX = box.leftX + movement[0];
        const newRightX = box.rightX + movement[0];
        newBoxes.push({y: newY, leftX: newLeftX, rightX: newRightX});
    }

    for (const box of newBoxes) {
        map[box.y][box.leftX] = BOX_START_SYMBOL;
        map[box.y][box.rightX] = BOX_END_SYMBOL;
    }

    map[y][x] = EMPTY_SYMBOL;
    map[y + movement[1]][x + movement[0]] = ROBOT_SYMBOL;
    return [x + movement[0], y + movement[1]];
}

function findImpactedBoxes(startingX: number, startingY: number, movement: number[]): Box[] {
    const boxes: Box[] = [];
    // use bfs instead
    const queue: [number, number][] = [[startingX, startingY]];
    const visited = new Set<string>();

    while (queue.length > 0) {
        const [x, y] = queue.shift()!;

        const key = getHashKey(x, y);
        if (visited.has(key)) {
            continue;
        }
        visited.add(key);

        const symbol = map[y][x];
        let box: Box | undefined;
        if (symbol === BOX_START_SYMBOL) {
            box = {y: y, leftX: x, rightX: x + 1};
            queue.push([x + movement[0], y + movement[1]]);
            queue.push([x + movement[0] + 1, y + movement[1]]);
        } else if (symbol === BOX_END_SYMBOL) {
            box = {y: y, leftX: x - 1, rightX: x};
            queue.push([x + movement[0] - 1, y + movement[1]]);
            queue.push([x + movement[0], y + movement[1]]);
        }

        if (box) {
            boxes.push(box);
        }
    }
    return boxes;
}

function canPushBox(box: Box, movement: number[]): boolean {
    // if (box.y + movement[1])
    if (map[box.y + movement[1]][box.leftX + movement[0]] === WALL_SYMBOL) {
        return false;
    }
    if (map[box.y + movement[1]][box.rightX + movement[0]] === WALL_SYMBOL) {
        return false;
    }

    return true;
}
