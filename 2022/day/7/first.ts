import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";
import { Folder, calculateAllDirectoriesSize, traverse } from "./fileSystemHelper.ts";

const MAX_SIZE = 100_000;

const TRAVERSE_REGEX = /\$ cd (.+)/;
const FILE_REGEX = /(\d+) (.+)/;

const INPUT_FILE = "./input.txt";
const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), INPUT_FILE);

let root: Folder | null = null;

let currentDir = root;
for await (const line of lines) {
  if (TRAVERSE_REGEX.test(line)) {
    currentDir = traverse(currentDir, TRAVERSE_REGEX.exec(line)![1]);
    if (root === null) {
      root = currentDir;
    }
  } else if (FILE_REGEX.test(line) && !!currentDir) {
    const matches = FILE_REGEX.exec(line);
    (currentDir as Folder).files.push({
      name: matches![2],
      size: parseInt(matches![1])
    });
  }
}

const directorySizes = calculateAllDirectoriesSize(root);

const accumulatedSize = directorySizes
  .filter(directory => directory.size <= MAX_SIZE)
  .reduce((acc, cur) => acc + cur.size, 0)
console.log(accumulatedSize);