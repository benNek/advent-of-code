import getLines from "../../../helpers/readFile.ts";

const INITIAL_VALUE_REGEX = /(.+): (\d+)/;
const EXPRESSION_REGEX = /(.+) (AND|OR|XOR) (.+) -> (.+)/;

const values: Record<string, number> = {};
const lines = await getLines();

type Expression = {
    lhs: string,
    rhs: string,
    op: string,
    key: string
}
let expressions: Expression[] = [];

for (const line of lines) {
    if (INITIAL_VALUE_REGEX.test(line)) {
        const match = INITIAL_VALUE_REGEX.exec(line);
        const [key, value] = match!.slice(1, 3);
        values[key] = parseInt(value, 10);
    } else if (EXPRESSION_REGEX.test(line)) {
        const match = EXPRESSION_REGEX.exec(line);
        const [lhs, op, rhs, key] = match!.slice(1, 5);

        expressions.push({
            lhs,
            rhs,
            op,
            key
        });
    }
}

// too laazy to build a graph. we can evaluate and if one of the value is not there, push it to the back of the list
for (let i = 0; i < expressions.length; i++) {
    const { lhs, rhs, op, key } = expressions[i];

    if (values[lhs] === undefined || values[rhs] === undefined) {
        const temp = expressions[i];
        expressions = expressions.filter(exp => exp.key!== key);
        expressions.push(temp);
        i--;
        continue;
    }
    values[key] = evaluate(values[lhs], values[rhs], op);
}


const answer = Object.keys(values)
    .filter(key => key.startsWith('z'))
    .sort((a, b) => b.localeCompare(a))
    .map(key => values[key])
    .join("");

console.log(parseInt(answer, 2));

function evaluate(lhs: number, rhs: number, op: string): number {
    switch (op) {
        case "AND":
            return lhs & rhs;
        case "OR":
            return lhs | rhs;
        case "XOR":
            return lhs ^ rhs;
        default:
            throw new Error("Invalid operator");
    }
}