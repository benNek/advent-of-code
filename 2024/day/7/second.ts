import getLines from "../../../helpers/readFile.ts";

const lines = await getLines();

let sum = 0;
for (const line of lines) {
    const target = parseInt(line.split(':')[0], 10);
    const nums = line.split(':')[1].split(' ').filter(x => !!x).map(x => parseInt(x, 10));

    let combos: string[][] = [];
    generateOperators(nums.length - 1, [], combos);


    for (const combo of combos) {
        let result = nums[0];

        let item = 1;
        for (const operation of combo) {
            if (operation === '*') {
                result *= nums[item]
            } else if (operation === '+') {
                result += nums[item]
            } else {
                result = parseInt(result.toString() + nums[item].toString());
            }
            item++;
        }

        if (result === target) {
            sum += target;
            break;
        }
    }
}

console.log(sum);

function generateOperators(length: number, operators: string[], result: string[][]) {
    if (length === 0) {
        result.push(operators);
        return;
    }

    generateOperators(length - 1, [...operators, "+"], result)
    generateOperators(length - 1, [...operators, "*"], result)
    generateOperators(length - 1, [...operators, "||"], result)
}