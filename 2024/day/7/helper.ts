export function tryOperators(target: number, numbers: number[], combo: string[]): boolean {
    let result = numbers[0];

    let item = 1;
    for (const operation of combo) {
        if (operation === '*') {
            result *= numbers[item]
        } else if (operation === '+') {
            result += numbers[item]
        } else {
            result = parseInt(result.toString() + numbers[item].toString());
        }
        item++;
    }

    return result === target;
}

export function generateOperatorsChoices(length: number, choices: string[]) {
    let result: string[][] = [];
    generateOperators(length, choices, [], result);
    return result;
}

function generateOperators(length: number, choices: string[], operators: string[], result: string[][]) {
    if (length === 0) {
        result.push(operators);
        return;
    }

    for (const choice of choices) {
        generateOperators(length - 1, choices, [...operators, choice], result)
    }
}