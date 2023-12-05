import getLines from "../../../helpers/readFile";

type Range = {
  source: number;
  destination: number;
  range: number;
};

type Node = {
  name: string;
  to?: Node;
  ranges: Range[];
};

const SEEDS_DESCRIBER = /seeds: (.+)/;
const MAP_DESCRIBER = /(.+)-to-(.+) map:/;
const lines = await getLines();

let root: Node | undefined;
let seeds: number[] = [];

let currentNode: Node | undefined;

// Parsing and mapping
for (const line of lines) {
  if (line.trim().length === 0) {
    if (!root) {
      root = currentNode;
    }
    continue;
  }

  if (SEEDS_DESCRIBER.test(line)) {
    const exec = SEEDS_DESCRIBER.exec(line)!;
    const numbers = exec[1].split(" ").map((x) => Number.parseInt(x, 10));

    seeds = numbers;

    continue;
  }

  if (MAP_DESCRIBER.test(line)) {
    const mapping = MAP_DESCRIBER.exec(line)!;
    const from = mapping[1];
    const to = mapping[2];

    const newNode: Node = {
      name: `${from} -> ${to}`,
      ranges: [],
    };

    if (currentNode) {
      currentNode.to = newNode;
    }

    currentNode = newNode;
    continue;
  }

  if (!currentNode) {
    throw Error("CRITICAL ERROR NO MAP DEFINED");
  }
  const [destination, source, range] = line
    .split(" ")
    .map((x) => Number.parseInt(x, 10));

  currentNode.ranges.push({ source, destination, range });
}

// Fun part
let node = root;
while (node) {
  for (let seedId = 0; seedId < seeds.length; seedId++) {
    const value = seeds[seedId];
    seeds[seedId] = transform(value, node.ranges);
  }

  node = node.to;
}

console.log(Math.min(...seeds));

function transform(value: number, ranges: Range[]): number {
  for (let range of ranges) {
    if (range.source <= value && value < range.source + range.range) {
      return range.destination + (value - range.source);
    }
  }

  // if nothing has been found, return the original value
  return value;
}
