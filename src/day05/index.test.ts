import { describe, test, expect } from "@jest/globals";
import main from "./01_part";
import { readFileSync } from "fs";
import { convertTxtToArray } from "../utils";

describe("Day 5", () => {
  describe("Part 1", () => {
    test("given example", () => {
      const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;
      const splittedInput = input.split("\n\n");
      const result = main(splittedInput);
      expect(result).toBe(35);
    });

    test("real input", () => {
      const txt = readFileSync(__dirname + "/input.txt", "utf-8");
      const input = txt.split("\n\n");
      const result = main(input);
      expect(result).toBe(226172555);
    });
  });
});
