import { describe, test, expect } from "@jest/globals";
import main from "./01_part";
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
      const result = main(inputArr);
      expect(result).toBe(288);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = convertTxtToArray(txt);
      const result = main(input);
      expect(result).toBe(1710720);
    });
  });
});
