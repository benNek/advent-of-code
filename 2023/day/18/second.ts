import getLines from "../../../helpers/readFile";

const lines = await getLines();

type Position = [row: number, col: number];
const vertices: Position[] = [[0, 0]];

const REGEX = /\(#(.+)\)/;

type Direction = "U" | "R" | "D" | "L";

type Operation = {
  direction: Direction;
  steps: number;
};

const operations: Operation[] = [];
for (const line of lines) {
  const result = REGEX.exec(line);
  const hex = result![1];

  const steps = parseInt(hex.slice(0, 5), 16);
  const direction = getDirection(hex.at(-1)!);

  // @ts-ignore
  operations.push({ direction, steps });
}

let row = 0;
let col = 0;
let p = 0;
for (const operation of operations) {
  const direction = operation.direction;
  for (let step = 0; step < operation.steps; step++) {
    p++;
    [row, col] = getNewPosition(direction, row, col);
  }
  vertices.push([row, col]);
}

let shoelace = 0;
vertices.push(vertices[0]);
for (let i = 0; i < vertices.length - 1; i++) {
  shoelace +=
    (vertices[i + 1][1] + vertices[i][1]) *
    (vertices[i + 1][0] - vertices[i][0]);
}
shoelace /= 2;
console.log(shoelace + 1 + p / 2);

function getNewPosition(
  direction: Direction,
  row: number,
  col: number
): [number, number] {
  switch (direction) {
    case "U":
      return [row - 1, col];
    case "R":
      return [row, col + 1];
    case "D":
      return [row + 1, col];
    case "L":
      return [row, col - 1];
  }
}

function getDirection(d: string): Direction {
  switch (d) {
    case "0":
      return "R";
    case "1":
      return "D";
    case "2":
      return "L";
    case "3":
      return "U";
    default:
      return "D";
  }
}
