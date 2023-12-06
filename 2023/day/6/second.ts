import getLines from "../../../helpers/readFile";

const lines = await getLines();

const time = getNumbers(/Time:(.+)/.exec(lines[0])![1]!);
const distance = getNumbers(/Distance:(.+)/.exec(lines[1])![1]!);

let winningPlays = 0;
for (let waitTime = 0; waitTime < time; waitTime++) {
  if ((time - waitTime) * waitTime > distance) {
    winningPlays++;
  }
}

console.log(winningPlays);

function getNumbers(str: string) {
  return Number.parseInt(
    str
      .split(" ")
      .filter((x) => x.length)
      .join(""),
    10
  );
}
