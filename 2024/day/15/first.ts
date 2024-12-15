import getLines from "../../../helpers/readFile.ts";
import {DIRECTION_TO_MOVEMENT, printMap} from "../../../helpers/maps.ts";

const WALL_SYMBOL = "#";
const BOX_SYMBOL = "O";
const EMPTY_SYMBOL = ".";
const ROBOT_SYMBOL = "@";

const lines = await getLines();

const map: string[][] = [];
let instructions = "";

let robotX = 0;
let robotY = 0;
for (const line of lines) {
    if (line[0] === WALL_SYMBOL) {
        map.push(line.split(""));
        if (line.includes(ROBOT_SYMBOL)) {
            robotX = line.indexOf(ROBOT_SYMBOL);
            robotY = map.length - 1;
        }
    } else if (line.trim().length > 0) {
        instructions += line;
    }
}

for (const direction of instructions) {
    const movement = DIRECTION_TO_MOVEMENT[direction];
    [robotX, robotY] = move(robotX, robotY, movement)
}

let score = 0;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === BOX_SYMBOL) {
            score += x + 100 * y;
        }
    }
}
console.log("Total score is", score);

function move(x: number, y: number, movement: number[]): [number, number] {
    let targetX = x + movement[0];
    let targetY = y + movement[1];
    // keep scanning until we find a empty space
    let canMove = true;
    while (map[targetY]?.[targetX] !== EMPTY_SYMBOL) {
        // out of map
        if (targetX < 0 || targetX >= map[0].length || targetY < 0 || targetY >= map.length) {
            canMove = false;
            break;
        }

        // hit the wall, we cannot push them around
        if (map[targetY][targetX] === WALL_SYMBOL) {
            canMove = false;
            break;
        }

        targetX += movement[0];
        targetY += movement[1];
    }

    if (!canMove) {
        return [x, y];
    }

    // if we can move, then we need to move all the boxes up to that point
    while (true) {
        if (targetY - movement[1] === y && targetX - movement[0] === x) {
            break;
        }

        map[targetY][targetX] = BOX_SYMBOL;
        map[targetY - movement[1]][targetX - movement[0]] = EMPTY_SYMBOL;

        targetX -= movement[0];
        targetY -= movement[1];
    }

    map[y][x] = EMPTY_SYMBOL;
    map[targetY][targetX] = ROBOT_SYMBOL;
    return [targetX, targetY];
}