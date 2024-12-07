import getLines from "../../../helpers/readFile.ts";
import {generateOperatorsChoices, tryOperators} from "./helper.ts";

const lines = await getLines();

let sum = 0;
for (const line of lines) {
    const target = parseInt(line.split(':')[0], 10);
    const nums = line.split(':')[1].split(' ').filter(x => !!x).map(x => parseInt(x, 10));

    const combos = generateOperatorsChoices(nums.length - 1, ["+", "*"]);
    for (const combo of combos) {
        if (tryOperators(target, nums, combo)) {
            sum += target;
            break;
        }
    }
}

console.log(sum);