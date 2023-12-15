import getLines from "../../../helpers/readFile";

const lines = await getLines();

if (lines.length > 1) {
  throw Error("Invalid file with more than one line");
}

const line = lines[0];

const instructions = line.split(",");
const REGEX = /(.+)[-=]/;
const boxes: Record<number, string[]> = {};
for (const instruction of instructions) {
  const hasDash = instruction.includes("-");
  const label = REGEX.exec(instruction)![1];
  const box = hash(label);
  if (hasDash) {
    remove(box, label);
  } else {
    const focal = Number.parseInt(instruction.split("=")[1]);
    insert(box, label, focal);
  }
}

let sum = 0;
Object.entries(boxes).forEach((box) => {
  const [idx, lenses] = box;
  const boxId = Number.parseInt(idx) + 1;
  if (lenses.length) {
    for (let i = 0; i < lenses.length; i++) {
      const focal = lenses[i].split(" ")[1];
      sum += boxId * (i + 1) * Number.parseInt(focal);
    }
  }
});

function remove(box: number, label: string) {
  if (!boxes[box]) {
    return;
  }

  const lenses = boxes[box];
  const existingLense = lenses.findIndex(
    (lense) => lense.split(" ")[0] === label
  );

  if (existingLense === -1) {
    return;
  }

  boxes[box].splice(existingLense, 1);
}

function insert(box: number, label: string, focal: number) {
  const name = `${label} ${focal}`;
  if (boxes[box]) {
    const lenses = boxes[box];
    const existingLense = lenses.findIndex(
      (lense) => lense.split(" ")[0] === label
    );
    if (existingLense !== -1) {
      lenses[existingLense] = name;
    } else {
      lenses.push(name);
    }
  } else {
    boxes[box] = [name];
  }
}

function hash(instruction: string) {
  let value = 0;
  for (const symbol of instruction) {
    value += symbol.charCodeAt(0);
    value *= 17;
    value %= 256;
  }
  return value;
}

console.log("sum: ", sum);
