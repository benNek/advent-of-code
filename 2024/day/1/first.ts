import getLines from "../../../helpers/readFile";

const lines = await getLines();

let first: number[] = [];
let second: number[] = [];

for (const line of lines) {
    const pair = line.split("   ");
    first.push(parseInt(pair[0]));
    second.push(parseInt(pair[1]));
}

first = first.sort();
second = second.sort();

let distance = 0;
for (let pairIdx = 0; pairIdx < first.length; pairIdx++) {
    const left = first[pairIdx];
    const right = second[pairIdx];
    distance += Math.abs(left - right);
}
console.log("Final distance", distance);
