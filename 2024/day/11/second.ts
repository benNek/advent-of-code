import getLines from "../../../helpers/readFile.ts";

type Dict = Record<string, number>;
const lines = await getLines();
const input = lines[0].split(" ").map(x => parseInt(x, 10));

const MAX_TURNS = 7500;
const stones: Dict = {};
for (const stone of input) {
    stones[stone] = 1;
}
for (let i = 0; i < MAX_TURNS; i++) {
    processTurn(stones)
    console.log("Turn", i + 1, Object.keys(stones).length);
}

let totalStones = 0;
console.log("Total stones:", totalStones);

function processTurn(stones: Dict): void {
    const copy = {...stones};
    for (const stone in copy) {
        const count = copy[stone];
        if (count === 0) {
            continue;
        }

        const numValue = parseInt(stone, 10);
        if (stone === "0") {
            increase(stones, 1, count);
        } else if (stone.length % 2 === 0) {
            const leftSide = parseInt(stone.slice(0, stone.length / 2), 10);
            const rightSide = parseInt(stone.slice(stone.length / 2), 10);

            increase(stones, leftSide, count);
            increase(stones, rightSide, count);
        } else {
            increase(stones, numValue * 2024, count);
        }

        stones[stone] -= count;
    }
}

function increase(stones: Dict, stone: number, count: number): void {
    if (!stones[stone]) {
        stones[stone] = count;
    } else {
        stones[stone] += count;
    }
}