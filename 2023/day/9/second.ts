import getLines from "../../../helpers/readFile";

const lines = await getLines();

let sum = 0;
for (const line of lines) {
  const numbers = line.split(" ").map((x) => Number.parseInt(x, 10));
  sum += exterpolate(numbers);
}
console.log(sum);

function exterpolate(numbers: number[]) {
  const sequences: number[][] = [numbers];

  let allZeroes = false;
  while (!allZeroes) {
    const seq = sequences.at(-1)!;
    const newSeq = generateSequence(seq);
    sequences.push(newSeq);
    allZeroes = newSeq.every((x) => x === 0);
  }

  let previous = 0;
  for (let i = sequences.length - 2; i >= 0; i--) {
    const num = sequences[i].at(0)! - previous;
    previous = num;
    sum += num;
  }
  return previous;
}

function generateSequence(numbers: number[]): number[] {
  const seq: number[] = [];
  for (let i = 1; i < numbers.length; i++) {
    seq.push(numbers[i] - numbers[i - 1]);
  }
  return seq;
}
