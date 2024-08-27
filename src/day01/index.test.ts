import { describe, it, expect } from "@jest/globals";
import main from "./01_part";
import main2 from './02_part';
import { readFileSync } from "fs";

describe('Day 1, part 1', () => {
  test('Given case', () => {
    const input = `1abc2
                      pqr3stu8vwx
                      a1b2c3d4e5f
                      treb7uchet`;
    expect(main(input)).toBe(142);
  });

  test("should return 10", () => {
    expect(main("dsa2sd")).toStrictEqual(22)
  })

  test("should return 92", () => {
    expect(main("ds9a2sd")).toStrictEqual(92)
  })

  test('should test real input', () => {
    const data = readFileSync(__dirname + '/input.txt', 'utf8');
    const sum = main(data);
    expect(sum).toBe(55488);
  });

});

describe("Day 2, part 2", () => {
  test("Given case", () => {
    const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
    expect(main2(input)).toBeUndefined();
  })

})