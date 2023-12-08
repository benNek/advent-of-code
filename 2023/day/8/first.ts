import getLines from "../../../helpers/readFile";

const PATH_REGEX = /(.+) = \((.+), (.+)\)/;
const START = "AAA";
const FINAL = "ZZZ";

type Node = {
  name: string;
  left?: Node;
  right?: Node;
};

const lines = await getLines();
const instructions = lines[0].split("");

const nodesByName: Record<string, Node> = {};

for (const line of lines.slice(2)) {
  const result = PATH_REGEX.exec(line);
  if (!result || result.length < 4) {
    throw Error("Malformed file");
  }
  const name = result[1];
  const left = result[2];
  const right = result[3];

  const node = getOrCreateNode(name, left, right);
}

let node = nodesByName[START];
let steps = 0;
let instructionId = 0;
while (node.name !== FINAL) {
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
