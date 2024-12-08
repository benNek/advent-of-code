export function getHashKey(row: number, col: number) {
  return `${row}-${col}`;
}

export type Point = {
  x: number;
  y: number;
};