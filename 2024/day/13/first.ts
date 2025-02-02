import getLines from "../../../helpers/readFile.ts";

const INSTRUCTION_REGEX = /Button (.+): X\+(\d+), Y\+(\d+)/;
const TARGET_REGEX = /Prize: X=(\d+), Y=(\d+)/;

const lines = await getLines();

let price = 0;
for (let i = 0; i < lines.length; i += 4) {
    const a = lines[i].match(INSTRUCTION_REGEX);
    const ax = parseInt(a?.[2]!);
    const ay = parseInt(a?.[3]!);

    const b = lines[i + 1].match(INSTRUCTION_REGEX);
    const bx = parseInt(b?.[2]!);
    const by = parseInt(b?.[3]!);

    const target = lines[i + 2].match(TARGET_REGEX);
    const tx = parseInt(target?.[1]!);
    const ty = parseInt(target?.[2]!);

    const [aClicks, bClicks] = solve(ax, ay, bx, by, tx, ty);

    if (aClicks === -1 || bClicks === -1) {
        continue;
    }

    if (aClicks > 100 || bClicks > 100) {
        console.log('exceeded 100 clicks')
        continue;
    }

    // console.log(aClicks, bClicks);
    price += aClicks * 3 + bClicks;
}
console.log("Total price is ", price);

// fun time solving systems after so many years in a notebook
function solve(ax: number, ay: number, bx: number, by: number, tx: number, ty: number): [number, number] {
    const clicksB = (ax * ty - ay * tx) / (ax * by - bx * ay);
    const clicksA = (tx - bx * clicksB) / ax;

    if (!looksLikeAnswer(clicksA) || !looksLikeAnswer(clicksB)) {
        return [-1, -1];
    }

    return [clicksA, clicksB];
}

function looksLikeAnswer(x: number) {
    return x % 1 === 0;
}
