import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";
import { calculateDistance, createKey, Direction, moveHead, moveTail, Point, printMap } from "./ropeHelper.ts";

const MIN_DISTANCE_TO_MOVE_TAIL = 1.5;
const KNOTS_COUNT = 10;

const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");

const positions: Point[] = [];
for (let i = 0; i < KNOTS_COUNT; i++) {
  positions.push({ x: 0, y: 0 });
}

const visited = {[createKey(positions[KNOTS_COUNT - 1])]: true};

for await (const line of lines) {
  let direction = line.split(' ')[0] as Direction;
  const iterations = line.split(' ')[1];

  for (let it = 0; it < iterations; it++) {
    positions[0] = moveHead(positions[0], direction);

    for (let knot = 1; knot < KNOTS_COUNT; knot++) {
      if (calculateDistance(positions[knot - 1], positions[knot]) >= MIN_DISTANCE_TO_MOVE_TAIL) {
        positions[knot] = moveTail(positions[knot - 1], positions[knot], direction);

        if (knot + 1 === KNOTS_COUNT) {
          visited[createKey(positions[knot])] = true;
        }
      }
    }
    // printMap(positions);
  }
}

console.log(Object.keys(visited).length);
