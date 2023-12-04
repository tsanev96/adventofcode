/*
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:
["two1nine","eightwothree","abcone2threexyz","xtwone3four","4nineeightseven2","zoneight234","7pqrstsixteen"]
two1nine 29
eightwothree 83
abcone2threexyz 13
xtwone3four 24
4nineeightseven2 42
zoneight234 14
7pqrstsixteen 76
In this example, the calibration values are , , 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?
*/
import input from "./input";

function trebuchet(input: string[]) {
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const text = input[i];
    const newText = test(text);
    const numbers = extractNumbersFromText(newText);
    const calibrationNumber = getCalibrationNumbers(numbers);
    sum += calibrationNumber;
  }
  return sum;
}

function test(text: string) {
  const digits = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  let convertedText = text;
  for (const [key, value] of Object.entries(digits)) {
    const a = new RegExp(key, "g");
    convertedText = convertedText.replace(a, `${key}${value}${key}`);
  }
  return convertedText;
}

function getCalibrationNumbers(numbers: number[]) {
  const firstNumber = numbers[0];

  if (numbers.length >= 2) {
    return concatTwoNumbers(firstNumber, numbers[numbers.length - 1]);
  } else if (numbers.length === 1) {
    return concatTwoNumbers(firstNumber, firstNumber);
  }
  return 0;
}

function concatTwoNumbers(num1: number, num2: number) {
  return Number(String(num1) + String(num2));
}

function extractNumbersFromText(text: string) {
  const numbers: number[] = [];

  for (let i = 0; i < text.length; i++) {
    const convertedNumber = Number(text[i]);
    if (convertedNumber) {
      numbers.push(convertedNumber);
    }
  }

  return numbers;
}

const result = trebuchet(input);
console.log(result); // 55614
