import { exec } from "child_process";
import getLines from "../../../helpers/readFile";

const lines = await getLines();

type Workflow = {
  name: string;
  rules: Rule[];
};

type Rule = {
  condition?: string;
  result: string;
};

type Part = {
  x: number;
  m: number;
  a: number;
  s: number;
};

const workflows: Record<string, Workflow> = {};
const parts: Part[] = [];
const REGEX = /(.+){(.+)}/;
const PART_REGEX = /{(.+)}/;
let isWorkflowIo = true;
for (const line of lines) {
  if (line === "") {
    isWorkflowIo = false;
  } else if (isWorkflowIo) {
    const name = REGEX.exec(line)![1];
    const rules = REGEX.exec(line)![2].split(",");
    const workflowRules: Rule[] = [];

    for (const rule of rules) {
      const parts = rule.split(":");
      if (parts.length > 1) {
        const [condition, result] = parts;
        workflowRules.push({
          condition,
          result,
        });
      } else {
        workflowRules.push({
          result: rule,
        });
      }
    }

    workflows[name] = {
      name,
      rules: workflowRules,
    };
  } else {
    const values = PART_REGEX.exec(line)![1];
    // @ts-ignore
    let part: Part = {};
    for (const entry of values.split(",")) {
      const [key, value] = entry.split("=");
      // @ts-ignore
      part[key] = parseInt(value);
    }
    parts.push(part);
  }
}

let sum = 0;
for (const part of parts) {
  let current: Workflow | null = workflows["in"];
  while (current) {
    let header = evalHeader(part);
    let toGo: string = "";
    for (const rule of current.rules) {
      if (rule.condition) {
        const result = eval(header + rule.condition);
        if (result) {
          toGo = rule.result;
          break;
        }
      } else {
        toGo = rule.result;
        break;
      }
    }

    if (toGo) {
      if (toGo === "A") {
        current = null;
        sum += calcSum(part);
      } else if (toGo === "R") {
        current = null;
      } else {
        current = workflows[toGo];
      }
    }
  }
}
console.log(sum);

function evalHeader(part: Part) {
  const { x, m, a, s } = part;
  return `let x=${x}, m=${m}, a=${a}, s=${s};`;
}

function calcSum(part: Part) {
  const { x, m, a, s } = part;
  return x + m + a + s;
}
