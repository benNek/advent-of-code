import getLines from "../../../helpers/readFile.ts";

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

    const middleValue =  getMiddleValue(values);
    if (middleValue >= 0) {
        count += middleValue;
    }
}
console.log("Sum of middle values: ", count)

function getMiddleValue(values: string[]): number {
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        const leftValue = values[i - 1];
        const rightValue = values[i + 1];

        if (leftValue !== undefined && !leftMap.get(value)?.includes(leftValue)) {
            return -1;
        }

        if (rightValue !== undefined && !rightMap.get(value)?.includes(rightValue)) {
            return -1;
        }
    }

    return parseInt(values[Math.floor(values.length / 2)], 10);
}

function save(map: Map<string, string[]>, key: string, value: string) {
    if (map.has(key)) {
        const arr = map.get(key)!;
        arr.push(value);
        map.set(key, arr);
    } else {
        map.set(key, [value])
    }
}