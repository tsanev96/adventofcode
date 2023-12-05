import { describe, test, expect } from "@jest/globals";
import gearRatios from "./01_part";
import { readFileSync } from "fs";
import { convertTxtToArray } from "../utils";

describe("Day 3", () => {
  describe("Part 1", () => {
    test("given example", () => {
      const input = `
      467..114..
      ...*......
      ..35..633.
      ......#...
      617*......
      .....+.58.
      ..592.....
      ......755.
      ...$.*....
      .664.598..
    `;
      const inputArr = convertTxtToArray(input);
      const result = gearRatios(inputArr);
      expect(result).toBe(4361);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = gearRatios(input);
      expect(result).toBe(528819);
    });
  });
});

/*
 [
      [ '4', '6', '7', '|', '|', '1', '1', '4', '|', '|'],
      [ '|', '|', '|', '*', '|', '|', '|', '|', '|', '|'],
      [ '|', '|', '3', '5', '|', '|', '6', '3', '3', '|'],
      [ '|', '|', '|', '|', '|', '|', '#', '|', '|', '|'],
      [ '6', '1', '7', '*', '|', '|', '|', '|', '|', '|'],
      [ '|', '|', '|', '|', '|', '+', '|', '5', '8', '|'],
      [ '|', '|', '5', '9', '2', '|', '|', '|', '|', '|'],
      [ '|', '|', '|', '|', '|', '|', '7', '5', '5', '|'],
      [ '|', '|', '|', '$', '|', '*', '|', '|', '|', '|'],
      [ '|', '6', '6', '4', '|', '5', '9', '8', '|', '|']
    ]
*/
