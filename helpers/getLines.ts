import { readLines } from "https://deno.land/std@0.166.0/io/buffer.ts";
import { SEP } from "https://deno.land/std@0.110.0/path/separator.ts";

export default async function getLines(dirName, fileName): Promise<AsyncIterableIterator<string>> {
  const file = await Deno.open(dirName + SEP + fileName);
  return readLines(file);
}