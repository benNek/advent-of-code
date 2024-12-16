import colors from "colors";
import {Direction} from "./types.ts";

export function getHashKey(row: number, col: number) {
    return `${row}-${col}`;
}

export const TWO_DIMENSIONAL_MOVEMENTS: number[][] = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0]
]

export const TWO_DIMENSIONAL_MOVEMENTS_DIRECTED: [number, number, Direction][] = [
    [0, -1, Direction.UP],
    [0, 1, Direction.DOWN],
    [-1, 0, Direction.LEFT],
    [1, 0, Direction.RIGHT]
]

export const DIRECTION_TO_MOVEMENT: Record<string, number[]> = {
    '^': [0, -1],
    'v': [0, 1],
    '<': [-1, 0],
    '>': [1, 0]
}

export type Point = {
    x: number;
    y: number;
};

export function printMap(map: string[][], symbolToColorMap: Record<string, colors.Color> = {}) {
    for (let y = 0; y < map.length; y++) {
        let line = "";
        for (let x = 0; x < map[y].length; x++) {
            const symbol = map[y][x];
            if (symbolToColorMap[symbol]) {
                line += symbolToColorMap[symbol](symbol);
            } else {
                line += symbol;
            }
        }
        console.log(line);
    }
}