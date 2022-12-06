import * as path from "https://deno.land/std/path/mod.ts";
import getLines from "../../../helpers/getLines.ts";
import searchForPacket from "./packetSearch.ts";

const MARKER_REQUIREMENT = 4;

const lines = await getLines(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");
let buffer = (await lines.next()).value;

console.log(searchForPacket(buffer, MARKER_REQUIREMENT));