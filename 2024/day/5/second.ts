import getLines from "../../../helpers/readFile.ts";
import {getMiddleValue, isCorrectlyOrdered, save} from "./helper.ts";

const lines = await getLines();

const rightMap = new Map<string, string[]>();
const leftMap = new Map<string, string[]>();

let fixes = 0;

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
    // console.log(i);
    const line = lines[i];
    const values = line.split(",");

    if (!isCorrectlyOrdered(leftMap, rightMap, values)) {
        const fixedMiddleValue = fixArray(values);
        if (fixedMiddleValue > 0) {
            count += fixedMiddleValue;
        }
    }
}
console.log("Sum of fixed middle values: ", count)

function fixArray(values: string[]): number {
    const permutations: string[][] = [];
    console.log(fixes++);
    generatePermutations(values, [], permutations)

    if (permutations.length !== 1) {
        throw Error("Failed");
    }

    return parseInt(permutations[0][Math.floor(permutations[0].length / 2)], 10)
}

function generatePermutations(values: string[], perm: string[] = [], result: string[][]) {
    // sloooow af but it works
    if (values.length === 0) {
        result.push(perm);
    }

    if (perm.length === 0) {
        for (let i = 0; i < values.length; i++) {
            generatePermutations(values.filter((x, idx) => idx !== i), [...perm, values[i]], result);
        }
    } else {
        const lastChar = perm.at(-1)!;
        const possibleOptions = values.filter(value => rightMap.get(lastChar)?.includes(value));
        for (const option of possibleOptions) {
            const firstIndex = values.indexOf(option);
            const remainingOptions = values.filter((x, idx) => idx !== firstIndex);
            generatePermutations(remainingOptions, [...perm, option], result);
        }
    }
}