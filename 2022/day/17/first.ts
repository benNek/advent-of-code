import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";

const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");
const jet = (await lines.next()).value;

enum Direction {
  LEFT, RIGHT, BOTTOM
}

interface Shape {
  paint: () => void;
  cleanUp: () => void;
  move: (direction: Direction) => void;
}

const map

const shapes: Shape[] = [
  // ####
  {
    paint: () => {

    },
    cleanUp: () => {

    },
    move: (direction: Direction) => {

    },
  }
]