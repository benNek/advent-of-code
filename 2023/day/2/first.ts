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
  const gameId = Number.parseInt(match[1], 10);
  const instructions = match[2];

  if (isPossibleDraw(instructions)) {
    total += gameId;
  }
}

console.log(total);

function isPossibleDraw(instructions: string): boolean {
  for (const draws of instructions.split(";")) {
    for (const draw of draws.split(", ")) {
      const [balls, color] = draw.trim().split(" ");
      if (!balls || !color) {
        throw Error("failed to parse data");
      }

      if (LIMITS[color] < Number.parseInt(balls, 10)) {
        return false;
      }
    }
  }

  return true;
}
