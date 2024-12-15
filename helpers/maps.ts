import colors from "colors";

export function getHashKey(row: number, col: number) {
    return `${row}-${col}`;
}

export const TWO_DIMENSIONAL_MOVEMENTS: number[][] = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0]
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