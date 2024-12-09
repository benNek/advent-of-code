import getLines from "../../../helpers/readFile.ts";

const FREE_SYMBOL = ".";

const lines = await getLines();

const input = lines[0];

let disk: string[] = [];
for (let i = 0; i < input.length; i++) {
    const value = parseInt(input[i], 10);
    for (let j = 0; j < value; j++) {
        disk.push(i % 2 === 0 ? (i / 2).toString() : FREE_SYMBOL).toString();
    }
}

let leftIdx = 0;
let rightIdx = disk.length - 1;
while (leftIdx < rightIdx) {
    if (disk[leftIdx] !== FREE_SYMBOL) {
        leftIdx++;
        continue;
    }

    if (disk[rightIdx] === FREE_SYMBOL) {
        rightIdx--;
        continue;
    }

    disk[leftIdx] = disk[rightIdx]
    disk[rightIdx] = FREE_SYMBOL;

    leftIdx++;
    rightIdx--;
}

let checksum = 0;
for (let i = 0; i < disk.length; i++) {
    if (disk[i] === FREE_SYMBOL) {
        break;
    }
    checksum += i * parseInt(disk[i], 10);
}
console.log(checksum)