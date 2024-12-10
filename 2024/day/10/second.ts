import getLines from "../../../helpers/readFile.ts";
import {getHashKey} from "../../../helpers/maps.ts";

const lines = await getLines();

const map: number[][] = [];
for (let i = 0; i < lines.length; i++) {
    const nums: number[] = [];
    for (let j = 0; j < lines[i].length; j++) {
        const input = lines[i][j];
        if (input === '.') {
            nums.push(-1);
        } else {
            nums.push(parseInt(input, 10));
        }
    }
    map.push(nums);
}

let score = 0;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === 0) score += calculateTrailheadScore(x, y);
    }
}

console.log("Total score is", score);

function calculateTrailheadScore(startingX: number, startingY: number) {
    let paths = 0;

    const queue: Point[] = [{x: startingX, y: startingY, h: map[startingY][startingX]}];
    while (queue.length > 0) {
        const {x, y, h} = queue.shift()!;

        if (h === 9) {
            paths++;
            continue;
        }

        if (map[y - 1]?.[x] === h + 1) {
            queue.push({y: y - 1, x, h: h + 1})
        }
        if (map[y + 1]?.[x] === h + 1) {
            queue.push({y: y + 1, x, h: h + 1})
        }
        if (map[y]?.[x - 1] === h + 1) {
            queue.push({y, x: x - 1, h: h + 1})
        }
        if (map[y]?.[x + 1] === h + 1) {
            queue.push({y, x: x + 1, h: h + 1})
        }

    }
    return paths;
}

type Point = {
    x: number;
    y: number;
    h: number;
}