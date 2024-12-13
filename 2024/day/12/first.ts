// whole idea: flood fill
// scan through the cells, see if they are already filled.
//   if not, we have identified a new area and perform flood fill on it
// area is easy, we can attach a struct to each cell with the overall region information
// for perimeter, we need to see if the direction has another cell to visit. if not, it adds the side to the perimeter

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
        price += plot.area * plot.perimeter;
    }
}
console.log("Total price", price);

type Plot = {
    area: number;
    perimeter: number;
}

function floodFill(startingRow: number, startingCol: number): Plot {
    const queue = [[startingRow, startingCol]];
    let area = 0;
    let perimeter = 0;

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
                perimeter++;
                continue;
            }

            if (map[nextRow][nextCol] === type) {
                queue.push([nextRow, nextCol]);
            } else {
                // dead end, so that must be a fence
                perimeter++;
            }
        }

    }

    return {
        area,
        perimeter,
    }
}