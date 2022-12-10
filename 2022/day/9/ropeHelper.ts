export enum Direction {
  LEFT = 'L',
  RIGHT = 'R',
  UP = 'U',
  DOWN = 'D',
};

export interface Point {
  x: number;
  y: number;
}

export const createKey = (point: Point) => `${point.x};${point.y}`;

export const calculateDistance = (point1: Point, point2: Point) => Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));

export const areInLine = (point1: Point, point2: Point) => point1.x === point2.x || point1.y === point2.y;

export const moveHead = (point: Point, direction: Direction): Point => {
  switch (direction) {
    case Direction.RIGHT:
      return {
        x: point.x + 1,
        y: point.y
      };
    case Direction.LEFT:
      return {
        x: point.x - 1,
        y: point.y
      };
    case Direction.UP:
      return {
        x: point.x,
        y: point.y + 1
      };
    case Direction.DOWN:
      return {
        x: point.x,
        y: point.y - 1
      };
    default:
      throw Error("Unknown head direction " + direction);
  }
};

export const moveTail = (head: Point, tail: Point): Point => {
  let x = tail.x;
  let y = tail.y;

  // cases:
  // --->
  if (areInLine(tail, head)) {
    if (tail.y === head.y) {
      x += tail.x > head.x ? -1 : 1;
    } else {
      y += tail.y > head.y ? -1 : 1;
    }
  } else {
    x += head.x < tail.x ? -1 : 1;
    y += head.y < tail.y ? -1 : 1;
  }

  return { x, y }
}

const PRINT_OFFSET = 2;

export const printMap = (positions: Point[]) => {
  const minX = Math.min(...positions.map(position => position.x));
  const maxX = Math.max(...positions.map(position => position.x));
  const minY = Math.min(...positions.map(position => position.y));
  const maxY = Math.max(...positions.map(position => position.y));

  const getSymbol = (x: number, y: number): string => {
    for (let knot = 0; knot < positions.length; knot++) {
      if (positions[knot].x === x && positions[knot].y === y) {
        return knot === 0 ? 'H' : knot.toString();
      }
    }
    return '.';
  };

  for (let y = maxY + PRINT_OFFSET; y >= minY - PRINT_OFFSET; y--) {
    let str = '';
    for (let x = minX - PRINT_OFFSET; x <= maxX + PRINT_OFFSET; x++) {
      str += getSymbol(x, y) + " ";
    }
    console.log(str);
  }
}