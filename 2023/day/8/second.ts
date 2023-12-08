import getLines from "../../../helpers/readFile";

const PATH_REGEX = /(.+) = \((.+), (.+)\)/;
const START = "A";
const FINAL = "Z";

type Node = {
  name: string;
  left?: Node;
  right?: Node;
};

const lines = await getLines();
const instructions = lines[0].split("");

const nodesByName: Record<string, Node> = {};
let startingNodes: Node[] = [];

for (const line of lines.slice(2)) {
  const result = PATH_REGEX.exec(line);
  if (!result || result.length < 4) {
    throw Error("Malformed file");
  }
  const name = result[1];
  const left = result[2];
  const right = result[3];

  const node = getOrCreateNode(name, left, right);
  if (name.endsWith(START)) {
    startingNodes.push(node);
  }
}

let winningSteps: number[] = [];
for (let node of startingNodes) {
  let steps = 0;
  let instructionId = 0;

  while (!node.name.endsWith(FINAL)) {
    if (instructionId >= instructions.length) {
      instructionId = 0;
    }
    const instruction = instructions[instructionId++];
    if (instruction === "L") {
      if (!node.left) {
        throw Error("Game over. We cannot go left from " + node.name);
      }
      node = node.left;
    } else {
      if (!node.right) {
        throw Error("Game over. We cannot go right from " + node.name);
      }
      node = node.right;
    }
    steps++;
  }

  console.log(steps);
  winningSteps.push(steps);
}

console.log(lcm(winningSteps));

function gcd(a: number, b: number) {
  if (b == 0) return a;
  return gcd(b, a % b);
}

// shamelessly stole from the internet
function lcm(numbers: number[]) {
  let ans = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    ans = (numbers[i] * ans) / gcd(numbers[i], ans);
  }

  return ans;
}

function getOrCreateNode(
  name: string,
  leftName?: string,
  rightName?: string
): Node {
  let node: Node;

  if (nodesByName[name]) {
    node = nodesByName[name];
  } else {
    node = {
      name,
    };
    nodesByName[name] = node;
  }

  // ZZZ shouldnt lead to ZZZ
  if (leftName && leftName !== name) {
    node.left = getOrCreateNode(leftName);
  }
  if (rightName && rightName !== name) {
    node.right = getOrCreateNode(rightName);
  }

  return node;
}
