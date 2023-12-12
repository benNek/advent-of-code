import { memoize } from "../../../helpers/memoize";
import getLines from "../../../helpers/readFile";

const lines = await getLines();

const traverse = memoize((records: string, groups: number[]): number => {
  if (records.length === 0) {
    if (groups.length === 0) {
      return 1;
    }
    return 0;
  }

  // we cannot afford any more damaged records
  if (groups.length === 0) {
    for (let i = 0; i < records.length; i++) {
      if (records[i] === "#") {
        return 0;
      }
    }
    return 1;
  }

  // we cannot cover all the groups anymore
  const sum = groups.reduce((prev, curr) => prev + curr, 0);
  if (records.length < sum + groups.length - 1) {
    return 0;
  }

  if (records[0] === ".") {
    return traverse(records.substring(1), groups);
  }
  if (records[0] === "#") {
    let [group, ...remainingGroups] = groups;

    for (let i = 0; i < group; i++) {
      if (records[i] === ".") {
        return 0;
      }
    }

    if (records[group] === "#") {
      return 0;
    }

    return traverse(records.substring(group + 1), remainingGroups);
  }

  // try both optoins
  return (
    traverse("." + records.substring(1), groups) +
    traverse("#" + records.substring(1), groups)
  );
});

let combos = 0;
for (const line of lines) {
  const [records, numbers] = line.split(" ");
  const expectedGroups: number[] = numbers
    .split(",")
    .map((x) => Number.parseInt(x));

  // well the same simple solution doesnt work anymore.
  // we need some caching a.k.a dynamic programming
  // also for cache key to work, we need more granular arguments

  const options = traverse(Array(5).fill(records).join("?"), [
    ...expectedGroups,
    ...expectedGroups,
    ...expectedGroups,
    ...expectedGroups,
    ...expectedGroups,
  ]);
  combos += options;
}
console.log("final:", combos);
