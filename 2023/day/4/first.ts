import getLines from "../../../helpers/readFile";

const lines = await getLines();

let sum = 0;
for (const line of lines) {
  const game = line.split(":")[1];
  const winMap: Record<string, boolean> = {};
  let score = 0;

  game
    .split("|")[0]
    .trim()
    .split(" ")
    .filter((x) => x.trim().length > 0)
    .forEach((x) => (winMap[x] = true));
  const myNumbers = game
    .split("|")[1]
    .trim()
    .split(" ")
    .filter((x) => x.trim().length > 0);

  for (const number of myNumbers) {
    // might have to remove from winmap after scrathing off.
    if (winMap[number]) {
      if (score === 0) {
        score = 1;
      } else {
        score *= 2;
      }
    }
  }

  sum += score;
}

console.log(sum);
