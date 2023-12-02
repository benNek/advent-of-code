import getLines from "../../../helpers/readFile";

const REGEX = /Game (\d+): (.+)/;

interface Map {
  [key: string]: number | undefined;
}

const LIMITS: Map = {
  red: 12,
  green: 13,
  blue: 14,
};

const lines = await getLines();

let total = 0;
for (const line of lines) {
  const match = REGEX.exec(line)!;
  const instructions = match[2];

  total += findPower(instructions);
}

console.log(total);

function findPower(instructions: string): number {
  let minCubes: Map = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const draws of instructions.split(";")) {
    for (const draw of draws.split(", ")) {
      const [ballsStr, color] = draw.trim().split(" ");
      if (!ballsStr || !color) {
        throw Error("failed to parse data");
      }

      const balls = Number.parseInt(ballsStr, 10);
      if (balls > minCubes[color]) {
        minCubes[color] = balls;
      }
    }
  }

  return Object.values(minCubes).reduce(
    (previousValue, currentValue) => previousValue! * currentValue!,
    1
  )!;
}
