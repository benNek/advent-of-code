import getLines from "../../../helpers/readFile.ts";
import {memoize} from "../../../helpers/memoize.ts";

// tried many different approaches, with calculating shorest path with bfs and then permutations on possible options.
// this got me close but then i needed to check if it crosses X or out of bounds any time.
// gave up after 4 hours and decided to look for potential solutions on the subreddit.

const PRESS = "A";

const DEPTH = 25;

type Keypad = Record<string, [string, string][]>;

const NUMERIC_KEYPAD: Keypad = {
    "0": [["2", "^"], ["A", ">"]],
    "1": [["2", ">"], ["4", "^"]],
    "2": [["0", "v"], ["1", "<"], ["3", ">"], ["5", "^"]],
    "3": [["2", "<"], ["6", "^"], ["A", "v"]],
    "4": [["1", "v"], ["5", ">"], ["7", "^"]],
    "5": [["2", "v"], ["4", "<"], ["6", ">"], ["8", "^"]],
    "6": [["3", "v"], ["5", "<"], ["9", "^"]],
    "7": [["4", "v"], ["8", ">"]],
    "8": [["5", "v"], ["7", "<"], ["9", ">"]],
    "9": [["6", "v"], ["8", "<"]],
    "A": [["0", "<"], ["3", "^"]],
}

const DIRECTIONAL_KEYPAD: Keypad = {
    "^": [["A", ">"], ["v", "v"]],
    "<": [["v", ">"]],
    "v": [["<", "<"], ["^", "^"], [">", ">"]],
    ">": [["v", "<"], ["A", "^"]],
    "A": [["^", "<"], [">", "v"]],
}

const dp = memoize((code: string, level: number, i: number) => {
    const pad = i === 0 ? NUMERIC_KEYPAD : DIRECTIONAL_KEYPAD;
    let result = 0;

    const target = PRESS + code;
    for (let i = 0; i < target.length - 1; i++) {
        const from = target[i];
        const to = target[i + 1];

        const paths = bfs(from, to, pad);
        if (level === 0) {
            result += Math.min(...paths.map(p => p.length));
        } else {
            result += Math.min(...(paths.map(path => dp(path, level - 1, 1))));
        }
    }

    return result;
});

type Node = {
    key: string;
    path: string;
}

function bfs(from: string, to: string, pad: Keypad) {
    const queue: Node[] = [{key: from, path: ""}];
    let result: string[] = [];
    let shortest = Infinity;
    while (queue.length > 0) {
        const {key, path} = queue.shift()!;
        if (key === to) {
            if (shortest === Infinity) {
                shortest = path.length;
            }
            if (path.length === shortest) {
                result.push(path + PRESS);
            }
            continue;
        }

        if (path.length >= shortest) {
            continue;
        }

        for (const [neighborKey, direction] of pad[key]) {
            queue.push({
                key: neighborKey,
                path: path + direction,
            })
        }

    }
    return result;
}

const lines = await getLines();

let complexity = 0;
for (const code of lines) {
    const result = dp(code, DEPTH, 0);
    console.log(parseInt(code, 10), "*", result, "=", parseInt(code, 10) * result);
    complexity += parseInt(code, 10) * result;
}
console.log(complexity)
