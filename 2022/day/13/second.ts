import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";

const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");

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


const items: any[] = [];
for await (const line of lines) {
  if (line !== '') {
    items.push(JSON.parse(line));
  }
}

const firstDivider = [[2]];
const secondDivider = [[6]];
items.push(firstDivider);
items.push(secondDivider);

// console.log(compare(items[0], items[1]))
const sorted = items.sort((a, b) => compare(b, a));

const decoderKey = (items.indexOf(firstDivider) + 1) * (items.indexOf(secondDivider) + 1);
console.log(decoderKey);
