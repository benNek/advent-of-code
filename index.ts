import { program } from "commander";

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
  .option("-p, --part <part>", "Part of the exercise (1-2)", "1");

program.parse();

const { year, day, part } = program.opts();

let partFile = part == 1 ? "first" : "second";

const dir = `./${year}/day/${day}`;

process.env.FILE_PATH = dir;
// execute
await import(`${dir}/${partFile}`);
