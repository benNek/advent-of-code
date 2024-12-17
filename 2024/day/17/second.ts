import getLines from "../../../helpers/readFile.ts";
import {isVisualMode} from "../../../helpers/execution.ts";

const REGISTER_REGEX = /Register (.+): (\d+)/
const PROGRAM_REGEX = /Program: (.+)/


const registers: Record<string, number> = {};

const lines = await getLines();

for (const line of lines) {
    if (!line.trim()) {
        continue;
    }

    if (REGISTER_REGEX.test(line)) {
        const [register, value] = REGISTER_REGEX.exec(line)!.slice(1, 4);
        registers[register] = parseInt(value, 10);
    } else if (PROGRAM_REGEX.test(line)) {
        const [instructions] = PROGRAM_REGEX.exec(line)!.slice(1, 2);


        const target = instructions.split(",").map(x => parseInt(x, 10));
        let a = 1;
        while (true) {
            // console.log(a);
            registers['A'] = a;
            registers['B'] = 0;
            registers['C'] = 0;
            const output = execute(target);

            if (!instructions.endsWith(output.join(","))) {
                a++;
                continue;
            }

            if (instructions === output.join(",")) {
                console.log(a);
                break;
            }

            a *= 8;
        }
    }
}

function execute(instructions: number[]) {
    let output: number[] = [];
    let instructionPointer = 0;
    while (instructionPointer < instructions.length) {
        const instruction = instructions[instructionPointer];
        const operand = instructions[instructionPointer + 1];

        if (instruction === 0) {
            registers['A'] = Math.floor(registers['A'] / Math.pow(2, getComboValue(operand)));
        }
        if (instruction === 1) {
            registers['B'] = (registers['B'] ^ operand) >>> 0;
        }
        if (instruction === 2) {
            registers['B'] = getComboValue(operand) % 8;
        }
        if (instruction === 4) {
            registers['B'] = (registers['B'] ^ registers['C']) >>> 0;
        }
        if (instruction === 5) {
            output.push(getComboValue(operand) % 8);
        }
        if (instruction === 6) {
            registers['B'] = Math.floor(registers['A'] / Math.pow(2, getComboValue(operand)));
        }
        if (instruction === 7) {
            registers['C'] = Math.floor(registers['A'] / Math.pow(2, getComboValue(operand)));
        }

        if (instruction === 3 && registers['A'] !== 0) {
            instructionPointer = operand;
        } else {
            instructionPointer += 2;
        }
    }

    return output;
}

function getComboValue(operand: number) {
    if (operand < 4) {
        return operand;
    } else if (operand === 4) {
        return registers['A'];
    } else if (operand === 5) {
        return registers['B'];
    } else if (operand === 6) {
        return registers['C'];
    }
    throw Error("Operand 7 is not supported for combo")
}

function executeInstruction(instruction: number, operand: number) {

}