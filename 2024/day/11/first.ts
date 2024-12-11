import getLines from "../../../helpers/readFile.ts";

const lines = await getLines();
const input = lines[0].split(" ").map(x => parseInt(x, 10));

const MAX_TURNS = 25;
let stones = input;
for (let i = 0; i < MAX_TURNS; i++) {
    stones = processTurn(stones);
    // console.log("After turn ", (i + 1), ":", stones.join(","))
}

console.log("Total stones:", stones.length);

function processTurn(stones: number[]): number[] {
    const newStones: number[] = [];
    for (const stone of stones) {
        const stringRep = stone.toString();
        if (stone === 0) {
            newStones.push(1);
        } else if (stringRep.length % 2 === 0) {
            const leftSide = parseInt(stringRep.slice(0, stringRep.length / 2), 10);
            const rightSide = parseInt(stringRep.slice(stringRep.length / 2), 10);
            newStones.push(leftSide, rightSide);
        } else {
            newStones.push(stone * 2024);
        }
    }

    return newStones;
}