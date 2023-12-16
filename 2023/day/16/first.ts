import { sleep } from "bun";
import { getHashKey } from "../../../helpers/maps";
import getLines from "../../../helpers/readFile";
import { Direction } from "../../../helpers/types";

const map = await getLines();
const visited: Record<string, boolean> = {};
const performedTileActions: Record<string, boolean> = {};

traverse(0, 0, Direction.RIGHT);

for (let row = 0; row < map.length; row++) {
  let str = "";
  for (let col = 0; col < map[row].length; col++) {
    const key = getHashKey(row, col);
    if (visited[key]) {
      str += "#";
    } else {
      str += ".";
    }
  }
  console.log(str);
}

function traverse(row: number, col: number, dir: Direction) {
  while (true) {
    if (isOutOfMap(row, col)) {
      return;
    }
    const cell = map[row][col];

    const key = getHashKey(row, col);
    const fullKey = getKey(row, col, dir);
    if (performedTileActions[fullKey]) {
      return;
    }

    performedTileActions[fullKey] = true;
    visited[key] = true;
    // console.log(key, cell, dir);

    if (cell === ".") {
      const position = moveForward(row, col, dir);
      row = position[0];
      col = position[1];
    } else if (cell === "\\" || cell === "/") {
      const position = moveMirrored(row, col, dir, cell);
      row = position[0];
      col = position[1];
      dir = position[2];
    } else if (
      cell === "-" &&
      (dir === Direction.RIGHT || dir === Direction.LEFT)
    ) {
      const position = moveForward(row, col, dir);
      row = position[0];
      col = position[1];
    } else if (
      cell === "|" &&
      (dir === Direction.UP || dir === Direction.DOWN)
    ) {
      const position = moveForward(row, col, dir);
      row = position[0];
      col = position[1];
    } else {
      break;
    }
  }

  const newBeams = split(row, col, dir, map[row][col]);
  traverse(...newBeams[0]);
  traverse(...newBeams[1]);
}

function isOutOfMap(row: number, col: number) {
  return row < 0 || col < 0 || row >= map.length || col >= map[row].length;
}

function moveForward(
  row: number,
  col: number,
  dir: Direction
): [number, number] {
  if (dir === Direction.RIGHT) {
    return [row, col + 1];
  } else if (dir === Direction.DOWN) {
    return [row + 1, col];
  } else if (dir === Direction.LEFT) {
    return [row, col - 1];
  } else {
    return [row - 1, col];
  }
}

function moveMirrored(
  row: number,
  col: number,
  dir: Direction,
  cell: string
): [number, number, Direction] {
  //  / or \
  if (dir === Direction.RIGHT) {
    if (cell === "/") {
      return [row - 1, col, Direction.UP];
    } else {
      return [row + 1, col, Direction.DOWN];
    }
  } else if (dir === Direction.DOWN) {
    if (cell === "/") {
      return [row, col - 1, Direction.LEFT];
    } else {
      return [row, col + 1, Direction.RIGHT];
    }
  } else if (dir === Direction.LEFT) {
    if (cell === "/") {
      return [row + 1, col, Direction.DOWN];
    } else {
      return [row - 1, col, Direction.UP];
    }
  } else {
    if (cell === "/") {
      return [row, col + 1, Direction.RIGHT];
    } else {
      return [row, col - 1, Direction.LEFT];
    }
  }
}

function split(
  row: number,
  col: number,
  dir: Direction,
  cell: string
): [number, number, Direction][] {
  if ((dir === Direction.RIGHT || dir === Direction.LEFT) && cell === "|") {
    return [
      [row - 1, col, Direction.UP],
      [row + 1, col, Direction.DOWN],
    ];
  } else if ((dir === Direction.DOWN || dir === Direction.UP) && cell === "-") {
    return [
      [row, col - 1, Direction.LEFT],
      [row, col + 1, Direction.RIGHT],
    ];
  }
  throw Error("Unknown path");
}

function getKey(row: number, col: number, dir: Direction) {
  return getHashKey(row, col) + "-" + dir;
}

console.log("Visited tiles:", Object.values(visited).length);
