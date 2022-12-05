import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const SYMBOLS_PER_STACK = 4;

const INPUT_FILE = "./input.txt";
const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), INPUT_FILE);

const stacks = {};

function pushToStack(symbol: string, stackId: number) {
  if (!stacks[stackId]) {
    stacks[stackId] = [ symbol ];
  } else {
    stacks[stackId].push(symbol);
  }
}

function processMove(count: number, from: number, to: number) {
  for (let i = 0; i < count; i++) {
    const item = stacks[from].shift();
    // console.log(`pushing ${item} from ${from} to ${to}`);
    stacks[to].unshift(item);

    // console.log(from, stacks[from]);
    // console.log(to, stacks[to]);
    // console.log('---------');
  }
}

const operationRegex = /move (\d+) from (\d+) to (\d+)/;

for await (const line of lines) {
  // operations
  if (line.startsWith("move")) {
    const match = operationRegex.exec(line);
    if (match?.length !== 4) {
      throw Error("Invalid input for move commands.")
    }
    processMove(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10));
  } else {
    // we can ignore these, as stack numbers go through 1 to N
    if (line.indexOf('[') === -1) {
      continue;
    }

    for (let i = 0; i < line.length - 1; i++) {
      if (line[i] === '[') {
        const char = line[i + 1];
        const stackId = i / SYMBOLS_PER_STACK + 1;

        pushToStack(char, stackId);
      }
    }
  }
}

console.log(Object.values(stacks).map(stack => stack[0]).join(''));