import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";
import { Folder, calculateAllDirectoriesSize, traverse } from "./fileSystemHelper.ts";

const FILE_SYSTEM_SIZE = 70_000_000;
const NEEDED_UNUSED_SPACE = 30_000_000;

const TRAVERSE_REGEX = /\$ cd (.+)/;
const FILE_REGEX = /(\d+) (.+)/;

const INPUT_FILE = "./input.txt";
const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), INPUT_FILE);

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

const sortedDirectories = directorySizes.sort((a, b) => {
  return a.size - b.size;
})

const usedSpace = sortedDirectories[sortedDirectories.length - 1].size;
const unusedSpace = FILE_SYSTEM_SIZE - usedSpace;

let deletedFolderSize = -1;
for (const directory of sortedDirectories) {
  if (unusedSpace + directory.size >= NEEDED_UNUSED_SPACE) {
    deletedFolderSize = directory.size;
    break;
  }
}

console.log(deletedFolderSize);