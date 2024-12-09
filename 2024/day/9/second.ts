import getLines from "../../../helpers/readFile.ts";

const FREE_SYMBOL = ".";

const lines = await getLines();

const input = lines[0];

type Block = {
    id: string;
    length: number;
}

let disk: Block[] = [];
for (let i = 0; i < input.length; i++) {
    const value = parseInt(input[i], 10);
    if (value === 0) {
        continue;
    }
    const symbol = i % 2 === 0 ? (i / 2).toString() : FREE_SYMBOL
    disk.push({
        id: symbol,
        length: value
    });
}

let leftIdx = 0;
let rightIdx = disk.length - 1;
while (rightIdx > 0) {
    if (leftIdx >= rightIdx) {
        rightIdx--;
        leftIdx = 0;
        continue;
    }

    if (disk[leftIdx].id !== FREE_SYMBOL) {
        leftIdx++;
        continue;
    }

    if (disk[rightIdx].id === FREE_SYMBOL) {
        rightIdx--;
        continue;
    }

    const leftOverSpace = disk[leftIdx].length - disk[rightIdx].length;
    if (leftOverSpace < 0) {
        leftIdx++;
        continue;
    }

    const temp = disk[leftIdx];
    if (leftOverSpace === 0) {
        disk[leftIdx] = disk[rightIdx]
        disk[rightIdx] = temp;
    } else {
        // there are more space than file, lets include both
        disk.splice(leftIdx, 1, disk[rightIdx]);
        disk.splice(leftIdx + 1, 0, {
            id: FREE_SYMBOL,
            length: leftOverSpace
        });
        disk[rightIdx + 1] = {
            id: FREE_SYMBOL,
            length: disk[rightIdx + 1].length,
        }

        // additional increase since we inserted element
        rightIdx++;
    }

    // console.log('after moving')
    // prettyPrint(disk);

    leftIdx = 0;
    rightIdx--;
}


let checksum = 0;
let idx = 0;
for (let i = 0; i < disk.length; i++) {
    const item = disk[i]
    for (let j = 0; j < item.length; j++) {
        if (item.id !== FREE_SYMBOL) {
            checksum += idx * parseInt(item.id, 10)
        }
        idx++;
    }
}

function prettyPrint(disk: Block[]) {
    let str = "";
    for (const block of disk) {
        str += block.id.repeat(block.length);
    }
    console.log(str);
}