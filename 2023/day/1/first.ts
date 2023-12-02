import getLines from "../../../helpers/readFile";

const REGEX = /\d/;

const lines = await getLines();

let sum = 0;
for await (const line of lines) {
  let first: string | null = null;
  let last: string | null = null;

  let combo;
  for (const char of line) {
    if (isDigit(char)) {
      if (!first) {
        first = char;
      }
      last = char;
    }
  }

  if (!first || !last) {
    throw Error("Failed to calculate");
  }
  combo = Number.parseInt(first + last);
  sum += combo;
}

console.log(sum);

function isDigit(char: string): boolean {
  return REGEX.test(char);
}
