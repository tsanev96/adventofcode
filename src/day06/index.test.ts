import { describe, test, expect } from "@jest/globals";
import boatRace from "./01_part";
import boatRace2 from "./02_part";
import { readFileSync } from "fs";
import { convertTxtToArray } from "../utils";

describe("Day 6", () => {
  describe("Part 1", () => {
    test("given example", () => {
      const input = `
      Time:      7  15   30
      Distance:  9  40  200
    `;
      const inputArr = convertTxtToArray(input);
      const result = boatRace(inputArr);
      expect(result).toBe(288);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = boatRace(input);
      expect(result).toBe(1710720);
    });
  });

  describe("Part 2", () => {
    test("given example", () => {
      const input = `
      Time:      7  15   30
      Distance:  9  40  200
    `;
      const inputArr = convertTxtToArray(input);
      const result = boatRace2(inputArr);
      expect(result).toBe(71503);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = boatRace2(input);
      expect(result).toBe(35349468);
    });
  });
});
