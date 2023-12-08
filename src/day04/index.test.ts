import { describe, test, expect } from "@jest/globals";
import scratchcards from "./01_part";
import scratchcards2 from "./02_part";
import { readFileSync } from "fs";
import { convertTxtToArray } from "../utils";

describe("Day 4", () => {
  describe("Part 1", () => {
    test("given example", () => {
      const input = `
      Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
      Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
      Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
      Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
      Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
      Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
    `;
      const inputArr = convertTxtToArray(input);
      const result = scratchcards(inputArr);
      expect(result).toBe(13);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = scratchcards(input);
      expect(result).toBe(22897);
    });
  });

  describe("Part 2", () => {
    test("given example", () => {
      const input = `
      Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
      Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
      Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
      Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
      Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
      Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
    `;
      const inputArr = convertTxtToArray(input);
      const result = scratchcards2(inputArr);
      expect(result).toBe(30); // 1 2 4 14
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = scratchcards2(input);
      expect(result).toBe(5095824);
    });
  });
});
