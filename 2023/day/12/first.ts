import { arrayEquals } from "../../../helpers/arrays";
import getLines from "../../../helpers/readFile";

const lines = await getLines();

let combos = 0;
for (const line of lines) {
  const [records, numbers] = line.split(" ");
  const expectedGroups: number[] = numbers
    .split(",")
    .map((x) => Number.parseInt(x));

  // to put it simply, each question mark can be either damaged or not.
  // lets see if we can brute force it all without any optimizations

  // for each option, create recursion for other values
  traverse(records, expectedGroups);
}
console.log(combos);

function traverse(records: string, expectedGroups: number[]) {
  const nextUnknown = records.indexOf("?");
  if (nextUnknown === -1) {
    if (isValid(records, expectedGroups)) {
      combos++;
    }
    return;
  }

  traverse(
    records.substring(0, nextUnknown) +
      "." +
      records.substring(nextUnknown + 1),
    expectedGroups
  );

  traverse(
    records.substring(0, nextUnknown) +
      "#" +
      records.substring(nextUnknown + 1),
    expectedGroups
  );
}

function isValid(records: string, expectedGroups: number[]) {
  const groups = records
    .split(".")
    .filter((x) => Boolean(x))
    .map((x) => x.length);

  return arrayEquals(groups, expectedGroups);
}
