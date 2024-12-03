import getLines from "../../../helpers/readFile.ts";

const REGEX = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;

const lines = await getLines();
let sum = 0;
// 1st problem: we dont need to reset is enabled
    let isEnabled = true;
for (const line of lines) {
    const matches = [...line.matchAll(REGEX)];
    for (const match of matches) {
        const operation = match[0];
        if (operation === "do()") {
            isEnabled = true;
        } else if (operation === "don't()") {
            isEnabled = false;
        } else {
            if (isEnabled) {
                sum += parseInt(match[1]) * parseInt(match[2]);
            }
        }
    }
}
console.log("Total sum is ", sum);