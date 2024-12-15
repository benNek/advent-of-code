import { PNG } from "pngjs";

import getLines from "../../../helpers/readFile.ts";

const REGEX = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/;
const SECONDS_TO_PROCESS = 15000;
// FAK forgot to update those
const MAP_WIDTH = 101;
const MAP_HEIGHT = 103;

type Robot = {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
}

const lines = await getLines();
const robots: Robot[] = [];

for (const line of lines) {
    const result = REGEX.exec(line);
    const [x, y, velocityX, velocityY] = result!.slice(1, 5).map(x => parseInt(x, 10));

    robots.push({
        x, y, velocityX, velocityY,
    });
}

for (let second = 1; second <= SECONDS_TO_PROCESS; second++) {
    for (const robot of robots) {
        move(robot);
    }
    printMapToFile(second, robots);
}

const quadrants = Array(5).fill(0);
for (const robot of robots) {
    const quadrant = calculateQuadrant(robot.x, robot.y);
    if (quadrant === 0) {
        continue;
    }

    quadrants[quadrant]++;
}

let safety = 1;
for (let quadrant = 1; quadrant < quadrants.length; quadrant++) {
    safety *= quadrants[quadrant];
}
console.log("Safety: ", safety);

function move(robot: Robot) {
    robot.x += robot.velocityX;
    if (robot.x < 0) {
        robot.x += MAP_WIDTH;
    } else if (robot.x >= MAP_WIDTH) {
        robot.x -= MAP_WIDTH;
    }

    robot.y += robot.velocityY;
    if (robot.y < 0) {
        robot.y += MAP_HEIGHT;
    } else if (robot.y >= MAP_HEIGHT) {
        robot.y -= MAP_HEIGHT;
    }
}

function calculateQuadrant(x: number, y: number): number {
    if (x + 1 === Math.ceil(MAP_WIDTH / 2) || y + 1 === Math.ceil(MAP_HEIGHT / 2)) {
        return 0;
    }

    if (y < MAP_HEIGHT / 2) {
        if (x < MAP_WIDTH / 2) {
            return 1;
        } else {
            return 2;
        }
    } else {
        if (x < MAP_WIDTH / 2) {
            return 3;
        } else {
            return 4;
        }
    }
}

// sorted by file size (got this tip from reddit as png is able to compress image-like combinations and then easily identify)
async function printMapToFile(second: number, robots: Robot[]) {
    console.log("Working on ", second);
    const png = new PNG({ width: MAP_WIDTH, height: MAP_HEIGHT });
    for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            const position = (y * MAP_WIDTH + x) * 4;
            png.data[position] = 0;
            png.data[position + 1] = 0;
            png.data[position + 2] = 0;
            png.data[position + 3] = 255;
        }
    }

    for (const robot of robots) {
        const position = (robot.y * MAP_WIDTH + robot.x) * 4;
        // RGBA
        png.data[position] = 0;
        png.data[position + 1] = 255;
        png.data[position + 2] = 0;
        png.data[position + 3] = 255;
    }

    // save this buffer into a some kind of image file for macos
    await Bun.write(`2024/day/14/trees/${second}.png`, PNG.sync.write(png));

}