/*

The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

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
In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic?

*/

interface NeighbourElement {
  element?: string;
  i: number;
  j: number;
}

interface GearNumbers {
  gear: NeighbourElement;
  number: NeighbourElement;
}

interface Matrix {
  matrix: string[][];
  i: number; // outer array
  j: number; // inner array
}

interface NumbersGear {
  number: { element: number; row: number; startIndex: number };
  gear: { i: number; j: number };
}

function checkElementIfSymbol(args: NeighbourElement) {
  const { element } = args;
  if (element === "*") {
    return {
      isGear: true,
    };
  }

  return {
    isGear: false,
  };
}

function getNeighbourElements(args: Matrix) {
  const { matrix, i, j } = args;
  const leftSide = j - 1;
  const rightSide = j + 1;
  const nextRow = i + 1;
  const previousRow = i - 1;
  const outerArrayLenght = matrix.length;
  const innerArrayLenght = matrix[i].length;

  const elements: NeighbourElement[] = [];

  const addNeighbourElements = ({
    innerIndex,
    getMiddleElement,
  }: {
    innerIndex: number;
    getMiddleElement: boolean;
  }) => {
    if (leftSide >= 0) {
      elements.push({
        element: matrix[innerIndex][leftSide],
        i: innerIndex,
        j: leftSide,
      });
    }

    if (rightSide < innerArrayLenght) {
      elements.push({
        element: matrix[innerIndex][rightSide],
        i: innerIndex,
        j: rightSide,
      });
    }

    if (getMiddleElement) {
      elements.push({
        element: matrix[innerIndex][j],
        i: innerIndex,
        j,
      });
    }
  };

  const isTopArray = previousRow >= 0;
  if (isTopArray) {
    addNeighbourElements({ innerIndex: previousRow, getMiddleElement: true });
  }

  addNeighbourElements({ innerIndex: i, getMiddleElement: false });

  const isBottomArray = nextRow < outerArrayLenght;
  if (isBottomArray) {
    addNeighbourElements({ innerIndex: nextRow, getMiddleElement: true });
  }

  return elements;
}

function checkPartElement(args: Matrix) {
  const { matrix, i, j } = args;
  const gearNumbers: GearNumbers[] = [];

  const element = Number(matrix[i][j]);
  if (!element && element !== 0) {
    return null;
  }

  const allNeighbour = getNeighbourElements(args);

  allNeighbour.forEach((neighbourElement, neighbourElementIndex) => {
    const { isGear } = checkElementIfSymbol(neighbourElement);

    if (isGear) {
      gearNumbers.push({
        gear: {
          i: neighbourElement.i,
          j: neighbourElement.j,
        },
        number: {
          i,
          j,
          element: matrix[i][j],
        },
      });
    }
  });

  return gearNumbers;
}

function getAllNumbersIndexesArray(chars: string[], elementToSplit: string) {
  const allNumbersIndexes: string[] = [];

  let text = "";
  chars.forEach((el, index) => {
    const isNumber = Number(el) || Number(el) === 0;
    if (isNumber && index === chars.length - 1) {
      text += `${index}${elementToSplit}`;
      allNumbersIndexes.push(text);
    } else if (isNumber) {
      text += `${index}${elementToSplit}`;
    } else if (text.length > 0) {
      allNumbersIndexes.push(text);
      text = "";
    }
  });

  return allNumbersIndexes;
}

function getNumberIndexesArray(args: {
  allNumbersIndexes: string[];
  currentNumberIndex: number;
  elementToSplit: string;
}) {
  const { allNumbersIndexes, currentNumberIndex, elementToSplit } = args;
  return allNumbersIndexes.find((el) => {
    const splitted = el.split(elementToSplit);
    return splitted.includes(currentNumberIndex.toString());
  });
}

function getNumber(args: { chars: string[]; currentNumberIndex: number }) {
  const { chars, currentNumberIndex } = args;

  const elementToSplit = "|";
  const allNumbersIndexes = getAllNumbersIndexesArray(chars, elementToSplit);
  const numberIndexes = getNumberIndexesArray({
    allNumbersIndexes,
    currentNumberIndex,
    elementToSplit,
  });

  const splittedNumbersIndexes =
    numberIndexes?.split(elementToSplit).filter((n) => n) ?? [];

  let result = "";
  splittedNumbersIndexes.forEach((numberIndexesdex) => {
    const el = chars[Number(numberIndexesdex)];
    result += el;
  });

  return {
    number: Number(result) || 0,
    numberIndexes,
  };
}

function getGearNumbers(matrix: string[][]) {
  const gearNumbers: GearNumbers[] = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const result = checkPartElement({ matrix, i, j });
      if (result) {
        gearNumbers.push(...result);
      }
    }
  }

  return gearNumbers;
}

function addGearIndexToGearNumbers(args: {
  matrix: string[][];
  gearNumbers: GearNumbers[];
}) {
  const { matrix, gearNumbers } = args;
  const numbersGears: NumbersGear[] = [];
  const numbersGearsJson = [];

  gearNumbers.forEach(({ gear, number: partNumber }) => {
    const { number, numberIndexes } = getNumber({
      chars: matrix[partNumber.i],
      currentNumberIndex: partNumber.j,
    });

    numbersGears.push({
      number: {
        element: number,
        row: partNumber.i,
        startIndex: +numberIndexes[0],
      },
      gear: {
        i: gear.i,
        j: gear.j,
      },
    });

    numbersGears.forEach((el) => {
      numbersGearsJson.push(JSON.stringify(el));
    });
  });

  return [...new Set([...numbersGearsJson])].map((el) =>
    JSON.parse(el)
  ) as NumbersGear[];
}

function getNumbersCorrespondingToGear(gearNumbersIndexes: any[]) {
  const combinedGearNumbers: { gear: { id: string; numbers: number[] } }[] = [];
  const gearIds: string[] = [];

  gearNumbersIndexes.forEach((el) => {
    const gear: string = `${el.gear.i}${el.gear.j}`;

    if (gearIds.includes(gear)) {
      const foundGearIndex = combinedGearNumbers.findIndex(
        (e) => e.gear.id === gear
      );
      combinedGearNumbers[foundGearIndex].gear.numbers.push(el.number.element);
    } else {
      gearIds.push(gear);
      combinedGearNumbers.push({
        gear: {
          id: gear,
          numbers: [el.number.element],
        },
      });
    }
  });

  return combinedGearNumbers;
}

function getMultipliedGearNumbersSum(combinedGearNumbers) {
  let result = 0;
  combinedGearNumbers.forEach(({ gear }) => {
    if (gear.numbers.length >= 2) {
      const multiply = gear.numbers.reduce((prev, curr) => prev * curr);
      result += multiply;
    }
  });
  return result;
}

function gearRatios(args: string[]) {
  const matrix = args.map((el) => el.split(""));

  const gearNumbers = getGearNumbers(matrix);

  const gearNumbersIndexes = addGearIndexToGearNumbers({ gearNumbers, matrix });

  const combinedGearNumbers = getNumbersCorrespondingToGear(gearNumbersIndexes);

  return getMultipliedGearNumbersSum(combinedGearNumbers);
}

export default gearRatios;
