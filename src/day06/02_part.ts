/*

--- Part Two ---
As the race is about to start, you realize the piece of paper with race times and record distances you got earlier actually just has very bad kerning. There's really only one race - ignore the spaces between the numbers on each line.

So, the example from before:

Time:      7  15   30
Distance:  9  40  200
...now instead means this:

Time:      71530
Distance:  940200
Now, you have to figure out how many ways there are to win this single race. In this example, the race lasts for 71530 milliseconds and the record distance you need to beat is 940200 millimeters. You could hold the button anywhere from 14 to 71516 milliseconds and beat the record, a total of 71503 ways!

*/
interface SingleBoat {
  time: number;
  recordDistance: number;
}

function breakTxtInput(args: string[]) {
  const time = +args[0]
    .split(" ")
    .filter((n) => n !== "" && !Number.isNaN(Number(n)))
    .join("");
  const recordDistance = +args[1]
    .split(" ")
    .filter((n) => n !== "" && !Number.isNaN(Number(n)))
    .join("");

  return {
    time,
    recordDistance,
  };
}

function createBoat({ time, recordDistance }: SingleBoat) {
  return {
    time,
    recordDistance,
  };
}

function getCountToBeatRecord(boat: SingleBoat) {
  const waysToBeatRecord: number[] = [];
  const { time, recordDistance } = boat;
  let recordBeatCount = 0;
  for (let timeHold = 0; timeHold <= time; timeHold++) {
    const traveledDistance = timeHold * (time - timeHold);
    if (traveledDistance > recordDistance) {
      recordBeatCount++;
    }
  }

  waysToBeatRecord.push(recordBeatCount);

  return waysToBeatRecord;
}

function getMultiplyOfWaysToBeatRecord(numbers: number[]) {
  return numbers.reduce((prev, curr) => prev * curr, 1);
}

function boatRaces(args: string[]) {
  const { time, recordDistance } = breakTxtInput(args);

  const boat = createBoat({ time, recordDistance });

  const arrWaysToBeatRecord = getCountToBeatRecord(boat);

  return getMultiplyOfWaysToBeatRecord(arrWaysToBeatRecord);
}

export default boatRaces;
