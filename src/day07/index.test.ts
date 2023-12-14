import { describe, test, expect } from "@jest/globals";
import main from "./01_part";
import { readFileSync } from "fs";
import { convertTxtToArray } from "../utils";

describe("Day 7", () => {
  describe("Part 1", () => {
    test("given example", () => {
      const input = `
      2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41
    `;

      const test = `
55555 684
33333 22
88888 2
    `;
      const inputArr = convertTxtToArray(input);
      const result = main(inputArr);
      expect(result).toBe(6592);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = main(input);
      expect(result).toBe(250898830);
    });
  });
});
