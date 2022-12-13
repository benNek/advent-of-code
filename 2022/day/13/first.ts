import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";

const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");

const isInRightOrder = (first, second) => {
  return compare(first, second) > 0;
}

const isNumber = (obj): boolean => {
  return typeof obj === 'number';
}

const isArray = (obj): boolean => {
  return Array.isArray(obj);
}

const compare = (left, right): number => {
  if (isNumber(left) && isNumber(right)) {
    return right - left;
  }

  let arrayLeft = isArray(left) ? left : [ left ];
  let arrayRight = isArray(right) ? right : [ right ];

  const length = Math.min(arrayLeft.length, arrayRight.length);

  for (let i = 0; i < length; i++) {
    const result = compare(arrayLeft[i], arrayRight[i]);
    if (result !== 0) {
      return result;
    }
  }

  return arrayRight.length - arrayLeft.length;
}

let firstPair;
let secondPair;
let pairIndex = 1;
let sum = 0;
for await (const line of lines) {
  if (line === '') {
    if (isInRightOrder(firstPair, secondPair)) {
      sum += pairIndex;
    }

    firstPair = null;
    secondPair = null;
    pairIndex++;
    continue;
  }

  if (!firstPair) {
    firstPair = JSON.parse(line);
  } else {
    secondPair = JSON.parse(line);
  }
}

if (firstPair && secondPair) {
  if (isInRightOrder(firstPair, secondPair)) {
    sum += pairIndex;
  }
}

console.log(sum);