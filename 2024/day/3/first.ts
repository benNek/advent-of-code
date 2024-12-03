import getLines from "../../../helpers/readFile.ts";

const REGEX = /mul\((\d+),(\d+)\)/g;

const lines = await getLines();
let sum = 0;
for (const line of lines) {
    const matches = [...line.matchAll(REGEX)];
    for (const match of matches) {
        sum += parseInt(match[1]) * parseInt(match[2]);
    }
}
console.log("Total sum is ", sum);