/*

--- Day 3: Gear Ratios ---
You and the Elf eventually reach a gondola lift station; he says the gondola lift will take 
you up to the water source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. 
"Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll 
still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody
 can figure out which one. If you can add up all the part numbers in the engine schematic, 
 it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. 
There are lots of numbers and symbols you don't really understand, but apparently any 
number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. 
(Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114.....*........35..633.......#...617*...........+.58...592...........755....$.*.....664.598..

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

[4, 6, 7, ., ., 1, 1, 4, ., .]
[., ., ., *, ., ., ., ., ., .]
[., ., 3, 5, ., ., 6, 3, 3, .]

имаш 2д Array
всеки символ е индекс
когато срещнеш число
трябва да провериш дали в съседство
има
символ
а символа може да бъде отгоре, диагонал, отдолу, острани

In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). 
Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?

*/
interface Matrix {
  matrix: string[][];
  i: number; // outer array
  j: number; // inner array
}

function checkElementIfSymbol(element: string) {
  if (!Number(element) && Number(element) !== 0 && element !== ".") {
    return true;
  }

  return false;
}

function getNeighbourElements(args: Matrix) {
  const { matrix, i, j } = args;
  const leftSide = j - 1;
  const rightSide = j + 1;
  const nextRow = i + 1;
  const previousRow = i - 1;
  const outerArrayLenght = matrix.length;
  const innerArrayLenght = matrix[i].length;

  const elements: string[] = [];

  const addNeighbourElements = ({
    innerIndex,
    getMiddleElement,
  }: {
    innerIndex: number;
    getMiddleElement: boolean;
  }) => {
    if (leftSide >= 0) {
      elements.push(matrix[innerIndex][leftSide]);
    }

    if (rightSide < innerArrayLenght) {
      elements.push(matrix[innerIndex][rightSide]);
    }

    if (getMiddleElement) {
      elements.push(matrix[innerIndex][j]);
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

  const element = Number(matrix[i][j]);
  if (!element && element !== 0) {
    return false;
  }

  const allNeighbour = getNeighbourElements(args);

  let isPart = false;
  allNeighbour.forEach((el) => {
    if (checkElementIfSymbol(el)) {
      isPart = true;
      return;
    }
  });

  return isPart;
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

function gearRatios(args: string[]) {
  const matrix = args.map((el) => el.split(""));

  let sum = 0;
  // outer array
  for (let i = 0; i < matrix.length; i++) {
    const replacatedAddedNumbers: string[] = [];
    // inner array
    for (let j = 0; j < matrix[i].length; j++) {
      const result = checkPartElement({ matrix, i, j });
      if (result) {
        const { number, numberIndexes } = getNumber({
          chars: matrix[i],
          currentNumberIndex: j,
        });

        if (!replacatedAddedNumbers.includes(numberIndexes) && number !== 0) {
          sum += number;
          replacatedAddedNumbers.push(numberIndexes);
        }
      }
    }
  }

  return sum;
}

/*
         [1][1]
    i - 1, j - 1

    i-1, j-1   i-1, j   i-1, j+1
    [0][0]     [0][1]    [0][2]

    i, j-1   element   i, j+1
    [1][0]    [1][1]    [1][2]

    i+1, j-1  i+1,j  i+1,j+1
    [2][0]   [2][1]   [2][2]
    */
/*
 [
      [ '4', '6', '7', '|', '|', '1', '1', '4', '|', '|'],      
      [ '|', 'THIS', '|', '*', '|', '|', '|', '|', '|', '|'],              
      [ '|', '|', '3', '5', '|', '|', '6', '3', '3', '|'],
      [ '|', '|', '|', '|', '|', '|', '#', '|', '|', '|'],
      [ '6', '1', '7', '*', '|', '|', '|', '|', '|', '|'],
      [ '|', '|', '|', '|', '|', '+', '|', '5', '8', '|'],
      [ '|', '|', '5', '9', '2', '|', '|', '|', '|', '|'],
      [ '|', '|', '|', '|', '|', '|', '7', '5', '5', '|'],
      [ '|', '|', '|', '$', '|', '*', '|', '|', '|', '|'],
      [ '|', '6', '6', '4', '|', '5', '9', '8', '|', '|']
    ]
    '


   
*/

export default gearRatios;
