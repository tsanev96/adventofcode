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
import { extractNumbersFromText, getCalibrationNumbers } from "./01_part";

function convertTextToNumber(text: string) {
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

  let textToConvert = text;

  for (const [key, value] of Object.entries(digits)) {
    const a = new RegExp(key, "g");
    textToConvert = textToConvert.replace(a, `${key}${value}${key}`);
  }

  return textToConvert;
}

function trebuchet(input: string[]) {
  let sum = 0;

  for (const text of input) {
    const newText = convertTextToNumber(text);
    const numbers = extractNumbersFromText(newText);
    const calibrationNumber = getCalibrationNumbers(numbers);
    sum += calibrationNumber;
  }

  return sum;
}

export default trebuchet;
