import { describe, test, expect } from "@jest/globals";
import main from "./01_part";
import main2 from "./02_part";
import { readFileSync } from "fs";
import { convertTxtToArray } from "../utils";

describe("Day 7", () => {
  describe("Part 1", () => {
    test("given example", () => {
      const input = `
      32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
    `;

      const inputArr = convertTxtToArray(input);
      const result = main(inputArr);
      expect(result).toBe(6440);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = main(input);
      expect(result).toBe(250898830);
    });
  });

  describe("Part 1", () => {
    test("given example", () => {
      const input = `
      32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
      `;
      const inputArr = convertTxtToArray(input);
      const result = main2(inputArr);
      expect(result).toBe(5905);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = main2(input);
      expect(result).toBe(252127335);
    });
  });
});
