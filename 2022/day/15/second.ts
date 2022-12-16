// adapted from https://www.reddit.com/r/adventofcode/comments/zmcn64/comment/j0b90nr/?utm_source=reddit&utm_medium=web2x&context=3
import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const INPUT_REGEX = /Sensor at x=(-?\d+)\, y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;

interface Point {
  x: number,
  y: number,
}

interface Reading {
  sensor: Point,
  beacon: Point,
  radius: number,
}

const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");

const calculateDistance = ({x: x1, y: y1}: Point, {x: x2, y: y2}: Point) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const readings: Reading[] = [];
for await (const line of lines) {
  const input = INPUT_REGEX.exec(line)!;

  const sensor: Point = {
    x: parseInt(input[1]),
    y: parseInt(input[2])
  };
  const beacon: Point = {
    x: parseInt(input[3]),
    y: parseInt(input[4])
  }
  const radius = calculateDistance(sensor, beacon);

  readings.push({ sensor, beacon, radius });
}

const aCoffs: Set<number> = new Set();
const bCoffs: Set<number> = new Set();
readings.forEach(reading => {
  aCoffs.add(reading.sensor.y - reading.sensor.x + reading.radius + 1);
  aCoffs.add(reading.sensor.y - reading.sensor.x - reading.radius - 1);
  bCoffs.add(reading.sensor.x + reading.sensor.y + reading.radius + 1);
  bCoffs.add(reading.sensor.x + reading.sensor.y - reading.radius - 1);
});

const max = 4_000_000;
for (const a of aCoffs) {
  for (const b of bCoffs) {
    const point: Point = {
      x: Math.floor((b - a) / 2),
      y: Math.floor((a + b) / 2)
    };
    if (point.x > 0 && point.x < max && point.y > 0 && point.y < max) {
      if (readings.every(r => calculateDistance(point, r.sensor) > r.radius)) {
        console.log(max * point.x + point.y);
      }
    }
  }
}
