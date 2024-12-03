import getLines from "../../../helpers/readFile.ts";

const lines = await getLines();

let safeOptions = 0;
for (const line of lines) {
    const report = line.split(" ").map(x => parseInt(x));
    if(isSafe(report)) {
        safeOptions++;
    } else {
        // stupid af but lets just try removing one element at a time
        // in the first tried to be smarted and remove the first failure. it didnt work bcuz the way i can
        for (let i = 0; i < report.length; i++) {
            if (isSafe(report.filter((x, id) => id !== i))) {
                safeOptions++;
                break;
            }
        }
    }
}
console.log(`There are ${safeOptions} safe options`);

function isSafe(report: number[]) {
    let isIncreasing = undefined;

    for (let i = 1; i < report.length; i++) {
        if (i === 1) {
            isIncreasing = report[i] > report[i - 1];
        } else if (isIncreasing !== report[i] > report[i - 1]) {
            return false;
        }

        let diff = Math.abs(report[i] - report[i - 1]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }

    return true;
}