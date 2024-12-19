import getLines from "../../../helpers/readFile.ts";
import {memoize} from "../../../helpers/memoize.ts";

const lines = await getLines();

const patterns = lines[0].split(", ");

const traverse = memoize((patterns: string[], input: string) => {
    if (input.length === 0) {
        return 1;
    }

    let options = 0;
    for (const pattern of patterns) {
        if (input.startsWith(pattern)) {
            options += traverse(patterns, input.slice(pattern.length));
        }
    }

    return options;
})

let possible = 0;
for (let i = 2; i < lines.length; i++) {
    const input = lines[i];
    const options = traverse(patterns, input)
    if (options > 0) {
        possible++;
    }
    // console.log(input, options);
}

console.log("Possible combinations", possible);

