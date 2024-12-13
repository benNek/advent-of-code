export function getHashKey(row: number, col: number) {
    return `${row}-${col}`;
}

export const TWO_DIMENSIONAL_MOVEMENTS: number[][] = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0]
]

export type Point = {
    x: number;
    y: number;
};