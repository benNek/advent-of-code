import * as path from "https://deno.land/std/path/mod.ts";
import getLinesDeprecated from "../../../helpers/getLinesDeprecated.ts";
import searchForPacket from "./packetSearch.ts";

const MARKER_REQUIREMENT = 14;

const lines = await getLinesDeprecated(path.dirname(path.fromFileUrl(import.meta.url)), "./input.txt");
let buffer = (await lines.next()).value;

console.log(searchForPacket(buffer, MARKER_REQUIREMENT));