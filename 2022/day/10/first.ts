import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const OPERATION_DELAY = 2;

const START_INTERVAL = 20;
const INTERVAL = 40;

const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");

const print = () => {
  console.log(`#${cycleNo} => ${register}`)
}

const checkInterval = () => {
  if (cycleNo === START_INTERVAL + INTERVAL * intervalsPassed) {
    sum += register * (START_INTERVAL + INTERVAL * intervalsPassed);
    intervalsPassed++;
  }
}

let cycleNo = 1;
let register = 1;
let sum = 0;
let intervalsPassed = 0;
for await (const line of lines) {
  const operationName = line.split(' ')[0];
  const amount = parseInt(line.split(' ')[1]);

  // print();
  checkInterval();
  if (operationName === 'addx') {
    cycleNo++;
    checkInterval();
    // print();
    register += amount;
  }
  cycleNo++;
}

console.log(register, sum, cycleNo);