// whole idea: flood fill
// scan through the cells, see if they are already filled.
//   if not, we have identified a new area and perform flood fill on it
// area is easy
// for sides, count the number of corners

import getLines from "../../../helpers/readFile.ts";
import {getHashKey, TWO_DIMENSIONAL_MOVEMENTS} from "../../../helpers/maps.ts";

const lines = await getLines();
const map = lines.map(line => line.split(''));

const visited = new Map<string, boolean>();
let price = 0;
for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
        if (visited.has(getHashKey(row, col))) {
            continue;
        }

        const plot = floodFill(row, col);
        // console.log(map[row][col], plot.area, plot.sides, plot.area * plot.sides);
        price += plot.area * plot.sides;
    }
}
console.log("Total price", price);

type Plot = {
    area: number;
    sides: number;
}

function floodFill(startingRow: number, startingCol: number): Plot {
    const queue = [[startingRow, startingCol]];
    let area = 0;
    let corners = 0;

    while (queue.length > 0) {
        const [row, col] = queue.shift()!;
        const key = getHashKey(row, col);
        if (visited.has(key)) {
            continue;
        }

        area++;
        visited.set(key, true);
        const type = map[row][col];

        for (const [rowOffset, colOffset] of TWO_DIMENSIONAL_MOVEMENTS) {
            const nextRow = row + rowOffset;
            const nextCol = col + colOffset;
            if (nextRow < 0 || nextRow >= map.length || nextCol < 0 || nextCol >= map[row].length) {
                continue;
            }

            if (map[nextRow][nextCol] === type) {
                queue.push([nextRow, nextCol]);
            }
        }

        corners += getCorners(row, col);
    }

    return {
        area,
        sides: corners,
    }
}

function getCorners(row: number, col: number): number {
    const region = map[row][col];
    let corners = 0;

    // it must be a corner if it has at least 2 in same general direction are not reachable
    const topReachable = row - 1 >= 0 && map[row - 1][col] === region;
    const rightReachable = col + 1 < map[row].length && map[row][col + 1] === region;
    const bottomReachable = row + 1 < map.length && map[row + 1][col] === region;
    const leftReachable = col - 1 >= 0 && map[row][col - 1] === region;
    const diagonalTLReachable = row - 1 >= 0 && col - 1 >= 0 && map[row - 1][col - 1] === region;
    const diagonalTRReachable = row - 1 >= 0 && col + 1 < map[row].length && map[row - 1][col + 1] === region;

    const c = [];
    // top-left
    if ((!topReachable && !leftReachable) || (!topReachable && diagonalTLReachable) || (!leftReachable && diagonalTLReachable)) {
        c.push('top-left')
        corners++;
    }
    // top-right
    if ((!topReachable && !rightReachable) || (!topReachable && diagonalTRReachable) || (!rightReachable && diagonalTRReachable)) {
        c.push('top-right')
        corners++;
    }
    // bottom-right
    if (!bottomReachable && !rightReachable) {
        c.push('bottom-right')
        corners++;
    }
    // bottom-left
    if (!bottomReachable && !leftReachable) {
        c.push('bottom-left')
        corners++;
    }

    return corners;
}