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

// sort all ranges bcuz it makes out life easier
let node = root;
while (node) {
  node.ranges = node.ranges.sort((a, b) => a.source - b.source);

  node = node.to;
}

// Fun part
// get the split points of ranges and create new ones possibly
type LiteRange = {
  from: number;
  to: number;
};

let ranges: LiteRange[] = [];
for (let i = 0; i < seeds.length; i += 2) {
  const from = seeds[i];
  const to = from + seeds[i + 1] - 1;

  ranges.push({ from, to });
}

node = root;
while (node) {
  let newRanges: LiteRange[] = [];

  // branch out all current ones into smaller or same ones
  for (const sourceRange of ranges) {
    const { from: sourceFrom, to: sourceTo } = sourceRange;

    let currentFrom = sourceFrom;

    for (const targetRange of node.ranges) {
      const targetFrom = targetRange.source;
      const targetTo = targetFrom + targetRange.range - 1;
      if (!isIntersecting(currentFrom, sourceTo, targetFrom, targetTo)) {
        continue;
      }

      // there was a leftover we need to add
      if (targetFrom > currentFrom) {
        newRanges.push({
          from: currentFrom,
          to: targetFrom - 1,
        });
        currentFrom = targetFrom;
      }

      const newFrom = Math.max(currentFrom, targetFrom);
      const newTo = Math.min(sourceTo, targetTo);

      currentFrom = newTo + 1;
      newRanges.push({
        from: targetRange.destination + (newFrom - targetFrom),
        to: targetRange.destination + (newTo - targetFrom),
      });
    }

    if (currentFrom < sourceTo) {
      newRanges.push({
        from: currentFrom,
        to: sourceTo,
      });
    }
  }

  ranges = newRanges;
  node = node.to;
}

console.log(Math.min(...ranges.map((x) => x.from)));

function isIntersecting(
  xStart: number,
  xEnd: number,
  yStart: number,
  yEnd: number
) {
  return xEnd >= yStart && yEnd >= xStart;
}