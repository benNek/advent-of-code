import getLines from "../../../helpers/readFile.ts";
import {isCorrectlyOrdered, save} from "./helper.ts";

const lines = await getLines();

const rightMap = new Map<string, string[]>();
const leftMap = new Map<string, string[]>();

let lineIdx = 0;
for (const line of lines) {
    lineIdx++
    if (line.trim().length === 0) break;

    const [from, to] = line.split("|");
    save(rightMap, from, to);
    save(leftMap, to, from);
}

let count = 0;
for (let i = lineIdx; i < lines.length; i++) {
    const line = lines[i];
    const values = line.split(",");

    const middleValue = getMiddleValue(values);
    if (middleValue >= 0) {
        count += middleValue;
    }
}

export function getMiddleValue(values: string[]): number {
    if (!isCorrectlyOrdered(leftMap, rightMap, values)) {
        return -1;
    }

    return parseInt(values[Math.floor(values.length / 2)], 10);
}

console.log("Sum of middle values: ", count)
