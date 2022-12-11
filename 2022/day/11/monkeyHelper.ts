const MONKEY_REGEX = /Monkey (\d+):/;
const ITEMS_REGEX = /Starting items: (.+)/;
const OPERATION_REGEX = /Operation: new = (.+)/;
const NUMBER_REGEX = /(\d+)+/;

export interface Monkey {
  id: number;
  items: number[];
  operation: (old: number) => number;
  test: (worryLevel: number) => number;
  divideBy: number;

  // calculated
  inspections: number,

}

const readLine = async (lines: AsyncIterableIterator<string>) => {
  return (await lines.next()).value;
}

export const parseMonkeys = async (lines: AsyncIterableIterator<string>): Promise<Monkey[]> => {
  const monkeys: Monkey[] = [];

  for await (const line of lines) {
    if (MONKEY_REGEX.test(line)) {
      const id = parseInt(MONKEY_REGEX.exec(line)![1]);
      
      let nextLine = await readLine(lines);
      let items: number[] = ITEMS_REGEX.exec(nextLine)![1].split(', ').map(item => parseInt(item));
  
      nextLine = await readLine(lines);
      const operationStr = OPERATION_REGEX.exec(nextLine)![1];
      const operation = (old: number) => eval(operationStr);
  
      nextLine = await readLine(lines);
      const division = parseInt(NUMBER_REGEX.exec(nextLine)![1]);
  
      nextLine = await readLine(lines);
      const monkeyIfTrue = parseInt(NUMBER_REGEX.exec(nextLine)![1]);
  
      nextLine = await readLine(lines);
      const monkeyIfFalse = parseInt(NUMBER_REGEX.exec(nextLine)![1]);
  
      const test = (oldWorry: number) => oldWorry % division === 0 ? monkeyIfTrue : monkeyIfFalse;
      monkeys.push({
        id,
        items,
        operation,
        test,
        divideBy: division,

        inspections: 0
      });
    }
  }

  return monkeys;
}