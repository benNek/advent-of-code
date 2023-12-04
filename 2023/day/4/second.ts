import getLines from "../../../helpers/readFile";

const lines = await getLines();

const copies: Record<number, number> = {};

for (const line of lines) {
  const parsedId = /Card( +)(\d+):/.exec(line)?.[2]!;
  const cardId = Number.parseInt(parsedId, 10);
  if (!copies[cardId]) {
    copies[cardId] = 1;
  } else {
    copies[cardId]++;
  }

  const game = line.split(":")[1];
  const winMap: Record<number, boolean> = {};

  game
    .split("|")[0]
    .trim()
    .split(" ")
    .filter((x) => x.trim().length > 0)
    .map((x) => Number.parseInt(x, 10))
    .forEach((x) => (winMap[x] = true));
  const myNumbers = game
    .split("|")[1]
    .trim()
    .split(" ")
    .filter((x) => x.trim().length > 0)
    .map((x) => Number.parseInt(x, 10));

  let scratches = 0;
  for (const number of myNumbers) {
    if (winMap[number]) {
      scratches++;

      if (copies[cardId + scratches]) {
        copies[cardId + scratches] += copies[cardId];
      } else {
        copies[cardId + scratches] = copies[cardId];
      }
    }
  }
}

console.log(Object.values(copies).reduce((prev, curr) => prev + curr, 0));
