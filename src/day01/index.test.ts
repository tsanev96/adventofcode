import { describe, test, expect } from "@jest/globals";
import trebuchet1 from "./01_part";
import trebuchet2 from "./02_part";
import { readFileSync } from "fs";
import { convertTxtToArray } from "../utils";

describe("Day 2", () => {
  describe("Part 1", () => {
    test("given example", () => {
      const input = `
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet
    `;
      const inputArr = convertTxtToArray(input);
      const result = trebuchet1(inputArr);
      expect(result).toBe(142);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = trebuchet1(input);
      expect(result).toBe(55488);
    });
  });

  describe("Part 2", () => {
    test("given example", () => {
      const input = `
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
    `;
      const inputArr = convertTxtToArray(input);
      const result = trebuchet2(inputArr);
      expect(result).toBe(281);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = trebuchet2(input);
      expect(result).toBe(55614);
      //
    });
  });
});
