import getLines from "../../../helpers/readFile.ts";

const lines = await getLines();

let safeOptions = 0;
for (const report of lines) {
    // console.log(report);
    if(isSafe(report.split(" ").map(x => parseInt(x)))) {
        safeOptions++;
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