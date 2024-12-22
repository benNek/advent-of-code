import getLines from "../../../helpers/readFile.ts";

const TIMES = 2000;

// i know whats coming for part 2 for but fk it.
const lines = await getLines();
let total = 0;
for (const line of lines) {
    const secret = parseInt(line, 10);

    let generated = secret;
    for (let i = 0; i < TIMES; i++) {
        generated = generateNumber(generated);
    }
    total += generated;
}
console.log(total);

function generateNumber(num: number) {
    const a = mixAndPrune(num, num * 64);
    const b = mixAndPrune(a, Math.floor(a / 32));
    return mixAndPrune(b, b * 2048);
}

function mixAndPrune(num: number, mix: number): number {
    return num ^ mix % 16777216;
}