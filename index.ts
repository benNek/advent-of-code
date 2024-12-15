import {program} from "commander";

program
    .option(
        "-y, --year <year>",
        "Year of the exercise (2022-2023)",
        new Date().getFullYear().toString()
    )
    .option(
        "-d, --day <day>",
        "Day of the exercise (1-25)",
        new Date().getDate().toString()
    )
    .option("-p, --part <part>", "Part of the exercise (1-2)", "1")
    .option("-v, --visualize", "Visualize the solution", false);

program.parse();

console.log(program.opts());
const {year, day, part, visualize} = program.opts();

let partFile = part == 1 ? "first" : "second";

const dir = `./${year}/day/${day}`;

process.env.FILE_PATH = dir;
process.env.VISUAL_MODE = visualize;

// execute
const start = performance.now();
console.log(`[INFO] Visual mode: ${visualize}`);
console.log(`[INFO] Executing ${dir}/${partFile}`);
await import(`${dir}/${partFile}`);
const end = performance.now();
console.info(`[INFO] Execution took ${(end - start).toFixed(2)}ms`);