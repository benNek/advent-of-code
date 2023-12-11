import getLines from "../../../helpers/readFile";

const SYMBOLS = {
  START: "S",
  VERTICAL: "|",
  HORIZONTAL: "-",
  UP_RIGHT: "L",
  UP_LEFT: "J",
  DOWN_LEFT: "7",
  DOWN_RIGHT: "F",
};

const UP_COMBINATIONS = [
  SYMBOLS.VERTICAL,
  SYMBOLS.DOWN_LEFT,
  SYMBOLS.DOWN_RIGHT,
  SYMBOLS.START,
];
const DOWN_COMBINATIONS = [
  SYMBOLS.VERTICAL,
  SYMBOLS.UP_LEFT,
  SYMBOLS.UP_RIGHT,
  SYMBOLS.START,
];
const LEFT_COMBINATIONS = [
  SYMBOLS.HORIZONTAL,
  SYMBOLS.UP_RIGHT,
  SYMBOLS.DOWN_RIGHT,
  SYMBOLS.START,
];
const RIGHT_COMBINATIONS = [
  SYMBOLS.HORIZONTAL,
  SYMBOLS.UP_LEFT,
  SYMBOLS.DOWN_LEFT,
  SYMBOLS.START,
];

type Node = {
  name: string;
  x: number;
  y: number;
  neighbors: Node[];

  visited?: boolean;

  distance?: number;
};

const map = await getLines();

let startNode: Node | null = null;
const nodesMap: Record<string, Node> = {};

// generate the graph from input
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === SYMBOLS.START) {
      startNode = getOrCreateNode(getNodeName(x, y), x, y);
    }
  }
}

if (!startNode) {
  throw Error("RIP no start node detected");
}

let maxDist = 0;
connectWithNeigbors(startNode, startNode.x, startNode.y);
dfs(startNode, startNode);
console.log(maxDist);

function dfs(node: Node, fromNode: Node) {
  node.visited = true;
  for (const neighbor of node.neighbors) {
    if (fromNode !== startNode && neighbor === startNode) {
      console.log("loop", Math.ceil(maxDist / 2));
    }
    if (!neighbor.visited) {
      neighbor.distance = (node.distance ?? 0) + 1;
      maxDist = Math.max(maxDist, neighbor.distance);

      dfs(neighbor, node);
    }
  }
}

function connectWithNeigbors(targetNode: Node, fromX: number, fromY: number) {
  const stack: Node[] = [targetNode];

  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      throw Error("Undefined node");
    }
    const { x, y } = node;

    if (isPossibleNeighbor(node, x, y - 1, fromX, fromY, UP_COMBINATIONS)) {
      const neighbor = createNeighborNode(x, y - 1, node);
      if (neighbor) {
        stack.push(neighbor);
      }
    }

    if (
      isPossibleNeighbor(targetNode, x, y + 1, fromX, fromY, DOWN_COMBINATIONS)
    ) {
      const neighbor = createNeighborNode(x, y + 1, node);
      if (neighbor) {
        stack.push(neighbor);
      }
    }

    if (
      isPossibleNeighbor(targetNode, x - 1, y, fromX, fromY, LEFT_COMBINATIONS)
    ) {
      const neighbor = createNeighborNode(x - 1, y, node);
      if (neighbor) {
        stack.push(neighbor);
      }
    }

    if (
      isPossibleNeighbor(targetNode, x + 1, y, fromX, fromY, RIGHT_COMBINATIONS)
    ) {
      const neighbor = createNeighborNode(x + 1, y, node);

      if (neighbor) {
        stack.push(neighbor);
      }
    }
  }
}

function createNeighborNode(x: number, y: number, parentNode: Node) {
  const newNode = getOrCreateNode(getNodeName(x, y), x, y, parentNode);

  if (parentNode.neighbors.includes(newNode)) {
    return null;
  }

  parentNode.neighbors.push(newNode);
  return newNode;
}

function isPossibleNeighbor(
  parentNode: Node,
  x: number,
  y: number,
  fromX: number,
  fromY: number,
  combinations: string[]
) {
  return combinations.includes(map?.[y]?.[x]) && !isParent(x, y, fromX, fromY);
}

function getOrCreateNode(
  name: string,
  x: number,
  y: number,
  parentNode?: Node
): Node {
  let node: Node;

  if (nodesMap[name]) {
    node = nodesMap[name];
  } else {
    node = {
      name,
      x,
      y,
      neighbors: [],
    };
    nodesMap[name] = node;
  }

  if (
    parentNode &&
    node.neighbors.filter((x) => x.name === parentNode.name).length === 0
  ) {
    node.neighbors.push(parentNode);
  }

  return node;
}

function isParent(
  currX: number,
  currY: number,
  parentX: number,
  parentY: number
) {
  return currX === parentX && currY === parentY;
}

function getNodeName(x: number, y: number) {
  return `${x}-${y}`;
}
