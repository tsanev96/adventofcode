import { NumbersText } from "./types";

const DEFAULT_NOT_EXISTING_NUMBER = { index: -1, value: 0 };

function findFirstAndLastNumber(result: NumbersText, curr: string, index: number) {
  const isNumber = Number(curr);

  if (!isNumber) { return result }

  const { first } = result;
  const currentNumber = { index, value: isNumber };

  if (first.index > index || first.index === -1) {
    result.first = currentNumber
  }

  result.last = currentNumber

  return result;
}

function getNumbers(text: string) {
  const { first, last } = text.split('').reduce<NumbersText>(findFirstAndLastNumber, {
    first: DEFAULT_NOT_EXISTING_NUMBER,
    last: DEFAULT_NOT_EXISTING_NUMBER
  });

  return parseInt(`${first.value}${last.value}`, 10);
};

function getArrayOfNumbers(lines: string[]) {
  return lines.reduce<number[]>((result, curr) => {
    const numbers = getNumbers(curr);
    result.push(numbers)
    return result;
  }, []);
}

function getArraySum(numbers: number[]) {
  return numbers.reduce((result, curr) => result += curr)
}

function main(input: string) {
  const lines = input.split('\n').map(line => line.trim());
  const numbers = getArrayOfNumbers(lines);
  const result = getArraySum(numbers);
  return result;
}

export default main;

/*
function trebuchet(args: string[]) {
  const input = args[0].split('\n');

  return input.reduce((sum, curr) => {
    const numbers = extractNumbersFromText(curr);
    const calibrationNumber = getCalibrationNumbers(numbers);
    return sum + calibrationNumber
  }, 0)
}

export function getCalibrationNumbers(numbers: number[]) {
  if (numbers.length > 0) {
    const firstNumber = numbers[0];
    const lastNumber = numbers[numbers.length - 1] ?? firstNumber;
    return parseInt(`${firstNumber}${lastNumber}`, 10)
  }

  return 0;
}

export function extractNumbersFromText(text: string) {
  const numbers: number[] = [];

  for (const character of text) {
    const convertedNumber = Number(character);
    if (convertedNumber) {
      numbers.push(convertedNumber);
    }
  }

  return numbers;
}
*/
