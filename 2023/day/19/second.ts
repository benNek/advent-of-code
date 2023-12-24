import { exec } from "child_process";
import getLines from "../../../helpers/readFile";

const lines = await getLines();

type Workflow = {
  name: string;
  rules: Rule[];
};

type Rule = {
  variable?: string;
  operator?: string;
  value?: number;
  next: string;
};

type Range = Record<string, [from: number, to: number]>;

const workflows: Record<string, Workflow> = {};
const REGEX = /(.+){(.+)}/;
for (const line of lines) {
  if (line === "") {
    break;
  }

  const name = REGEX.exec(line)![1];
  const rules = REGEX.exec(line)![2].split(",");
  const workflowRules: Rule[] = [];

  for (const rule of rules) {
    if (rule.includes(":")) {
      const [, variable, operator, value, next] = rule.match(
        /([xmas])([<>=])(\d+):(\w+)/
      )!;
      workflowRules.push({ variable, operator, value: parseInt(value), next });
    } else {
      workflowRules.push({ next: rule });
    }
  }

  workflows[name] = {
    name,
    rules: workflowRules,
  };
}

const range: Range = {
  x: [1, 4000],
  m: [1, 4000],
  a: [1, 4000],
  s: [1, 4000],
};

const validRanges = getValidRanges(workflows, "in", range);
const result = validRanges
  .map((range) =>
    Object.values(range).reduce((acc, [min, max]) => acc * (max - min + 1), 1)
  )
  .reduce((acc: number, v: number) => acc + v, 0);
console.log(result);

function copyRange(range: Range) {
  return JSON.parse(JSON.stringify(range));
}

function getValidRanges(
  workflows: Record<string, Workflow>,
  workflowName: string,
  range: Range
): Range[] {
  if (workflowName === "R") {
    return [];
  }

  if (workflowName === "A") {
    return [copyRange(range)];
  }

  const workflow = workflows[workflowName];

  const ranges: Range[] = [];
  for (const rule of workflow.rules) {
    if (!rule.operator) {
      ranges.push(...getValidRanges(workflows, rule.next, copyRange(range)));
    }

    if (rule.operator === "<") {
      const newRange = copyRange(range);
      newRange[rule.variable!][1] = rule.value! - 1;

      ranges.push(...getValidRanges(workflows, rule.next, newRange));

      range[rule.variable!][0] = rule.value;
    } else if (rule.operator === ">") {
      const newRange = copyRange(range);
      newRange[rule.variable!][0] = rule.value! + 1;

      ranges.push(...getValidRanges(workflows, rule.next, newRange));

      range[rule.variable!][1] = rule.value;
    }
  }

  return ranges;
}
