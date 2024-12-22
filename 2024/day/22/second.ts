import getLines from "../../../helpers/readFile.ts";

const TIMES = 2000;
// const TIMES = 10;
const SEQUENCE_LENGTH = 4;

const lines = await getLines();

const patterns = new Map<string, number>;
for (const line of lines) {
    const secret = parseInt(line, 10);

    const numbers: number[] = [ secret ];
    const diffs: number[] = [];
    let generated = secret;
    for (let i = 0; i < TIMES; i++) {
        generated = generateNumber(generated);
        numbers.push(generated);
        if (i > 0) {
            diffs.push(numbers[i] % 10 - numbers[i - 1] % 10);
        }
    }

    const seen = new Set<string>();
    for (let i = 0; i < numbers.length - SEQUENCE_LENGTH; i++) {
        const pattern = diffs.slice(i, i + SEQUENCE_LENGTH);
        const key = hash(pattern);

        if (!seen.has(key)) {
            seen.add(key)
            patterns.set(key, (patterns.get(key) ?? 0) + numbers[i + SEQUENCE_LENGTH] % 10);
        }
    }
}

let max = -Infinity;
let answer = "";
for (const [pattern, value] of patterns.entries()) {
    if (value > max) {
        max = value;
        answer = pattern;
    }
}
console.log(answer, max);

function generateNumber(num: number) {
    const a = mixAndPrune(num, num * 64);
    const b = mixAndPrune(a, Math.floor(a / 32));
    return mixAndPrune(b, b * 2048);
}

function mixAndPrune(num: number, mix: number): number {
    return num ^ mix % 16777216;
}

function hash(arr: number[]) {
    return arr.join(",");
}