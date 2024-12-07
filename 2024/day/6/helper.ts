import {Direction} from "../../../helpers/types.ts";

const OBSTACLE_CHAR = "#";

export function isOutOfMap(map: string[][], row: number, col: number) {
    return row < 0 || row >= map.length || col < 0 || col >= map[row].length;
}

export function canMove(map: string[][], row: number, col: number, direction: Direction) {
    switch (direction) {
        case Direction.UP:
            return map[row - 1]?.[col] !== OBSTACLE_CHAR;
        case Direction.DOWN:
            return map[row + 1]?.[col] !== OBSTACLE_CHAR;
        case Direction.RIGHT:
            return map[row]?.[col + 1] !== OBSTACLE_CHAR;
        case Direction.LEFT:
            return map[row]?.[col - 1] !== OBSTACLE_CHAR;
    }
}

export function rotate(direction: Direction): Direction {
    switch (direction) {
        case Direction.UP:
            return Direction.RIGHT;
        case Direction.RIGHT:
            return Direction.DOWN;
        case Direction.DOWN:
            return Direction.LEFT;
        case Direction.LEFT:
            return Direction.UP;
    }
}

export function move(row: number, col: number, direction: Direction): [number, number] {
    switch (direction) {
        case Direction.UP:
            return [row - 1, col];
        case Direction.DOWN:
            return [row + 1, col];
        case Direction.LEFT:
            return [row, col - 1];
        case Direction.RIGHT:
            return [row, col + 1];
    }
}
