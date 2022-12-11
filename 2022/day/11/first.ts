import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";
import { Monkey, parseMonkeys } from "./monkeyHelper.ts";

const ROUNDS_TO_PLAY = 20;
const MOST_ACTIVE_MONKEYS_COUNT = 2;

const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");

const monkeys: Monkey[] = await parseMonkeys(lines);

const monkeysCount = Object.keys(monkeys).length;

const printSimulation = () => {
  Object.keys(monkeys).forEach(monkeyId => {
    const monkey = monkeys[monkeyId];
    console.log(`Monkey ${monkeyId}: ${monkey.items.join(', ')}`);
  });
  console.log('-----------------')
}

const simulateMonkeyMove = (monkey: Monkey) => {
  // console.log(`Monkey ${monkey.id}:`)
  for (const item of monkey.items) {
    // console.log(`  Monkey inspects an item with a worry level of ${item}`);
    monkey.inspections++;
    const newWorryLevel = Math.floor(monkey.operation(item) / 3);
    // console.log(`    Monkey gets bored with item. Worry level is divided by 3 to ${newWorryLevel}.`);
    const passToMonkey = monkey.test(newWorryLevel);
    // console.log(`    Item with worry level ${newWorryLevel} is thrown to monkey ${passToMonkey}.`);
    monkeys[passToMonkey].items.push(newWorryLevel);
  }

  monkey.items = [];
};

printSimulation();
for (let round = 1; round <= ROUNDS_TO_PLAY; round++) {
  for (let monkeyId = 0; monkeyId < monkeysCount; monkeyId++) {
    simulateMonkeyMove(monkeys[monkeyId]);
  }
  printSimulation();
}

const sorted = monkeys.sort((a, b) => b.inspections - a.inspections);

let product = 1;
for (let i = 0; i < MOST_ACTIVE_MONKEYS_COUNT; i++) {
  product *= sorted[i].inspections;
}

console.log(product);