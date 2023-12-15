import getLines from "../../../helpers/readFile";

const lines = await getLines();

if (lines.length > 1) {
  throw Error("Invalid file with more than one line");
}

const line = lines[0];

const instructions = line.split(",");
let sum = 0;
for (const instruction of instructions) {
  let value = 0;
  for (const symbol of instruction) {
    value += symbol.charCodeAt(0);
    value *= 17;
    value %= 256;
  }
  sum += value;
}

console.log("sum: ", sum);
