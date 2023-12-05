import { describe, test, expect } from "@jest/globals";
import cubeCondrum1 from "./01_part";
import cubeCondrum2 from "./02_part";
import { readFileSync } from "fs";
import { convertTxtToArray } from "../utils";

describe("Day 1", () => {
  describe("Part 1", () => {
    test("given example", () => {
      const input = `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
    `;
      const inputArr = convertTxtToArray(input);
      const result = cubeCondrum1(inputArr);
      expect(result).toBe(8);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = cubeCondrum1(input);
      expect(result).toBe(2076);
    });
  });

  describe("Part 2", () => {
    test("given example", () => {
      const input = `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
    `;
      const inputArr = convertTxtToArray(input);
      const result = cubeCondrum2(inputArr);
      expect(result).toBe(2286);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = cubeCondrum2(input);
      expect(result).toBe(70950);
    });
  });
});
