import getLines from "../../../helpers/readFile";

const lines = await getLines();

let first: number[] = [];
let second: number[] = [];

const map = new Map<string, number>();
for (const line of lines) {
    const pair = line.split("   ");
    first.push(parseInt(pair[0]));
    map.set(pair[0], 0);
    second.push(parseInt(pair[1]));
}

let similarity = 0;
for (const value of second) {
    const str = value.toString();
    if (map.has(str)) {
        map.set(str, map.get(str)! + 1)
    }
}

for (const value of first) {
    const str = value.toString();
    if (map.get(str)! > 0) {
        similarity += map.get(str)! * value;
    }
}
console.log("Total similarity", similarity);
