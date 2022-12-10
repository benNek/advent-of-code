import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const OPERATION_DELAY = 2;
const SCREEN_WIDTH = 40;

const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");

const print = () => {
  console.log(`#${cycleNo} => ${register}`)
}

const processLogic = () => {
  const position = (cycleNo - 1) % SCREEN_WIDTH;
  if (Math.abs(position - register) <= 1) {
    row += '# ';
  } else {
    row += '. ';
  }
  if (position + 1 === SCREEN_WIDTH) {
    console.log(row);
    row = '';
  }
};

let cycleNo = 1;
let register = 1;

let row = '';
for await (const line of lines) {
  const operationName = line.split(' ')[0];
  const amount = parseInt(line.split(' ')[1]);

  processLogic();
  if (operationName === 'addx') {
    cycleNo++;
    processLogic();
    register += amount;
  }
  cycleNo++;
}
