import { describe, it, expect } from "@jest/globals";
import trebuchet from "./01_part";
import { readFileSync } from "fs";

describe('Day 1, part 1', () => {
  it('Given case', () => {
    const input = `1abc2
                      pqr3stu8vwx
                      a1b2c3d4e5f
                      treb7uchet`;
    expect(trebuchet([input])).toBe(142);
  });

  it("should return 10", () => {
    expect(trebuchet(["dsa2sd"])).toStrictEqual(22)
  })

  it("should return 92", () => {
    expect(trebuchet(["ds9a2sd"])).toStrictEqual(92)
  })

  it('should test real input', () => {
    const data = readFileSync(__dirname + '/input_1.txt', 'utf8');
    const sum = trebuchet([data]);
    expect(sum).toBe(55488);
  });

});
