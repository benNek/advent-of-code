import getLines from "../../../helpers/readFile";

const SYMBOLS = {
  START: "S",
  VERTICAL: "|",
  HORIZONTAL: "-",
  UP_RIGHT: "L",
  UP_LEFT: "J",
  DOWN_LEFT: "7",
  DOWN_RIGHT: "F",
  GROUND: ".",
};

enum Direction {
  UP, DOWN, LEFT, RIGHT;
}

const ASCII_MAPPING: Record<string, string> = {
  S: "S",
  "|": "│",
  "-": "─",
  "7": "┐",
  L: "└",
  J: "┘",
  F: "┌",
  ".": "░",
};

type Node = {
  name: string;
  x: number;
  y: number;
  neighbors: Node[];

  visited?: boolean;

  distance?: number;
};

let map = await getLines();

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

connectWithNeigbors(startNode, startNode.x, startNode.y);


const NORTH_FACING = [SYMBOLS.UP_RIGHT, SYMBOLS.UP_LEFT, SYMBOLS.VERTICAL];
// raycasting
let tiles = 0;
for (let y = 0; y < map.length; y++) {
  let isInside = false;
  let str = "";
  for (let x = 0; x < map[y].length; x++) {
    const name = getNodeName(x, y);

    if (nodesMap[name]) {
      str += "\x1b[34m" + ASCII_MAPPING[map[y][x]] + "\x1b[0m";

      if (NORTH_FACING.includes(map[y][x])) {
        isInside = !isInside;
      }
    } else if (isInside) {
      str += "\x1b[31m▓\x1b[0m";
      tiles++;
    } else {
      str += ASCII_MAPPING[map[y][x]];
    }
  }
  console.log(str);
}
console.log("No of tiles:", tiles);

function connectWithNeigbors(targetNode: Node, fromX: number, fromY: number) {
  const stack: Node[] = [targetNode];

  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      throw Error("Undefined node");
    }
    const { x, y } = node;

    let hasUp = false, hasDown = false, hasRight = false, hasLeft = false;

    if (isPossibleNeighbor(node, x, y - 1, Direction.UP)) {
      const neighbor = createNeighborNode(x, y - 1, node);
      if (neighbor) {
        stack.push(neighbor);
      }
      hasUp = true;
    }

    if (
      isPossibleNeighbor(node, x, y + 1, Direction.DOWN)
    ) {
      const neighbor = createNeighborNode(x, y + 1, node);
      if (neighbor) {
        stack.push(neighbor);
      }
      hasDown = true;
    }

    if (
      isPossibleNeighbor(node, x - 1, y, Direction.LEFT)
    ) {
      const neighbor = createNeighborNode(x - 1, y, node);
      if (neighbor) {
        stack.push(neighbor);
      }
      hasLeft = true;
    }

    if (
      isPossibleNeighbor(node, x + 1, y, Direction.RIGHT)
    ) {
      const neighbor = createNeighborNode(x + 1, y, node);

      if (neighbor) {
        stack.push(neighbor);
      }
      hasRight = true;
    }

    // Replacing start node symbol with what it should be
    if (node === startNode) {
      let replacementSymbol = SYMBOLS.START;
      if (hasUp && hasDown) {
        replacementSymbol = SYMBOLS.VERTICAL;
      } else if (hasLeft && hasRight) {
        replacementSymbol = SYMBOLS.HORIZONTAL;
      } else if (hasUp && hasRight) {
        replacementSymbol = SYMBOLS.UP_RIGHT;
      } else if(hasUp && hasLeft) {
        replacementSymbol = SYMBOLS.UP_LEFT;
      } else if(hasDown && hasRight) {
        replacementSymbol = SYMBOLS.DOWN_RIGHT;
      } else if (hasDown && hasLeft) {
        replacementSymbol = SYMBOLS.DOWN_LEFT;
      }

      map[startNode.y] = map[startNode.y].replace(SYMBOLS.START, replacementSymbol);
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
  direction: Direction,
) {
  const {x: fromX, y: fromY} = parentNode;
  const from = map[fromY][fromX];
  const to = map?.[y]?.[x];

  if (!to) {
    return false;
  }

  if (isParent(x, y, fromX, fromY)) {
    return false;
  }

  if (direction === Direction.DOWN) {
    const canGoDownSymbols = [SYMBOLS.START, SYMBOLS.VERTICAL, SYMBOLS.DOWN_LEFT, SYMBOLS.DOWN_RIGHT];
    if (!canGoDownSymbols.includes(from)) {
      return false;
    }

    const downSymbols = [SYMBOLS.START, SYMBOLS.VERTICAL, SYMBOLS.UP_RIGHT, SYMBOLS.UP_LEFT];
    return downSymbols.includes(to);
  }

  if (direction === Direction.UP) {
    const canGoUp = [SYMBOLS.START, SYMBOLS.VERTICAL, SYMBOLS.UP_LEFT, SYMBOLS.UP_RIGHT];
    if (!canGoUp.includes(from)) {
      return false;
    }

    const upSymbols = [SYMBOLS.START, SYMBOLS.VERTICAL, SYMBOLS.DOWN_RIGHT, SYMBOLS.DOWN_LEFT];
    return upSymbols.includes(to);
  }

  if (direction === Direction.RIGHT) {
    const canGoRight = [SYMBOLS.START, SYMBOLS.HORIZONTAL, SYMBOLS.UP_RIGHT, SYMBOLS.DOWN_RIGHT];
    if (!canGoRight.includes(from)) {
      return false;
    }

    const rightSymbols = [SYMBOLS.START, SYMBOLS.HORIZONTAL, SYMBOLS.UP_LEFT, SYMBOLS.DOWN_LEFT];
    return rightSymbols.includes(to);
  }

  if (direction === Direction.LEFT) {
    const canGoLeft = [SYMBOLS.START, SYMBOLS.HORIZONTAL, SYMBOLS.UP_LEFT, SYMBOLS.DOWN_LEFT];
    if (!canGoLeft.includes(from)) {
      return false;
    }

    const leftSymbols = [SYMBOLS.START, SYMBOLS.HORIZONTAL, SYMBOLS.UP_RIGHT, SYMBOLS.DOWN_RIGHT];
    return leftSymbols.includes(to);
  }

  return false;
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
