export default async function getLines() {
  return (await Bun.file(process.env.FILE_PATH + "/input.txt").text()).split(
    "\n"
  );
}

export function printMap(map: string[][]) {
  for (let y = 0; y < map.length; y++) {
    let line = "";
    for (let x = 0; x < map[y].length; x++) {
      line += map[y][x];
    }
    console.log(line);
  }
}