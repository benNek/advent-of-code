import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";
import { Monkey, parseMonkeys } from "./monkeyHelper.ts";

const ROUNDS_TO_PLAY = 10000;
const MOST_ACTIVE_MONKEYS_COUNT = 2;

const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");

const monkeys: Monkey[] = await parseMonkeys(lines);
const monkeysCount = Object.keys(monkeys).length;

let modulo = 1;
for (let i = 0; i < monkeysCount; i++) {
  modulo *= monkeys[i].divideBy;
}

const printSimulation = () => {
  Object.keys(monkeys).forEach(monkeyId => {
    const monkey = monkeys[monkeyId];
    console.log(`Monkey ${monkeyId}: ${monkey.items.join(', ')}`);
  });
  console.log('-----------------')
}

const simulateMonkeyMove = (monkey: Monkey) => {
  for (const item of monkey.items) {
    monkey.inspections++;
    const newWorryLevel = monkey.operation(item) % modulo;
    const passToMonkey = monkey.test(newWorryLevel);
    monkeys[passToMonkey].items.push(newWorryLevel);
  }

  monkey.items = [];
};

// printSimulation();
for (let round = 1; round <= ROUNDS_TO_PLAY; round++) {
  for (let monkeyId = 0; monkeyId < monkeysCount; monkeyId++) {
    simulateMonkeyMove(monkeys[monkeyId]);
  }
  // printSimulation();
}

const sorted = monkeys.sort((a, b) => b.inspections - a.inspections);

let product = 1;
for (let i = 0; i < MOST_ACTIVE_MONKEYS_COUNT; i++) {
  product *= sorted[i].inspections;
}

console.log(product);