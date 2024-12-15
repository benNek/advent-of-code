import getLines from "../../../helpers/readFile.ts";
import {DIRECTION_TO_MOVEMENT, printMap} from "../../../helpers/maps.ts";
import {isVisualMode} from "../../../helpers/execution.ts";

const WALL_SYMBOL = "#";
const BOX_SYMBOL = "O";
const BOX_START_SYMBOL = "[";
const BOX_END_SYMBOL = "]";
const EMPTY_SYMBOL = ".";
const ROBOT_SYMBOL = "@";

const lines = await getLines();

type Box = {
    id: string;
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
        printMap(map);
        prompt("Press enter to continue");
    }
}
printMap(map);

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
    let boxes: Box[] = [];
    findImpactedBoxes(x + movement[0], y + movement[1], movement, boxes);
    boxes =  [...new Map(boxes.map(box =>
        [box.id, box])).values()];

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
        newBoxes.push({id: createBoxId(newY, newLeftX, newRightX), y: newY, leftX: newLeftX, rightX: newRightX});
    }

    for (const box of newBoxes) {
        map[box.y][box.leftX] = BOX_START_SYMBOL;
        map[box.y][box.rightX] = BOX_END_SYMBOL;
    }

    map[y][x] = EMPTY_SYMBOL;
    map[y + movement[1]][x + movement[0]] = ROBOT_SYMBOL;
    return [x + movement[0], y + movement[1]];
}

function findImpactedBoxes(x: number, y: number, movement: number[], boxes: Box[] = []) {
    const isVerticalMovement = movement[1] !== 0;

    let box: Box | undefined;
    if (map[y][x] === BOX_START_SYMBOL) {
        box = {id: createBoxId(y, x, x + 1), y, leftX: x, rightX: x + 1};
    } else if (map[y][x] === BOX_END_SYMBOL) {
        box = {id: createBoxId(y, x - 1, x), y, leftX: x - 1, rightX: x};
    } else {
        return;
    }

    if (!box) {
        return;
    }

    boxes.push(box);
    if (isVerticalMovement) {
        findImpactedBoxes(box.leftX + movement[0], box.y + movement[1], movement, boxes);
        findImpactedBoxes(box.rightX + movement[0], box.y + movement[1], movement, boxes);
    } else {
        findImpactedBoxes(x + movement[0], y + movement[1], movement, boxes);
    }
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

function createBoxId(y: number, leftX: number, rightX: number): string {
    return `${y};${leftX}-${rightX}`;
}