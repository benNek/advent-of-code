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
const beacons: Set<String> = new Set();
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
  beacons.add(`${beacon.x};${beacon.y}`);
}

let y = 2000000;
const occupiedBlock = new Set();
readings.forEach(reading => {
  const distance = Math.abs(y - reading.sensor.y);
  if (distance <= reading.radius) {
    for (let x = reading.sensor.x - (reading.radius - distance); x <= reading.sensor.x + (reading.radius - distance); x++) {
      if (!beacons.has(`${x};${y}`)) {
        occupiedBlock.add(x);
      }
    }
  }
});

console.log(occupiedBlock.size);