import getLines from "../../../helpers/readFile";

const lines = await getLines();

const times = getNumbers(/Time:(.+)/.exec(lines[0])![1]!);
const distances = getNumbers(/Distance:(.+)/.exec(lines[1])![1]!);

let result = 1;
for (let raceId = 0; raceId < times.length; raceId++) {
  const time = times[raceId];
  const distance = distances[raceId];

  let winningPlays = 0;
  for (let waitTime = 0; waitTime < time; waitTime++) {
    if ((time - waitTime) * waitTime > distance) {
      winningPlays++;
    }
  }
  result *= winningPlays;
}

console.log(result);

function getNumbers(str: string) {
  return str
    .split(" ")
    .filter((x) => x.length)
    .map((x) => Number.parseInt(x));
}
