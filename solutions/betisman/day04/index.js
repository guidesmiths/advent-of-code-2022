const { assert } = require('console');
const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');
const exampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
const expectedResult = 2;

const rangeToArray = range => {
  const [from, to] = range.split('-').map(e => parseInt(e));
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

const isIncluded = (array1, array2) => array1.every(e => array2.includes(e));
const arraysFullIncluded = (array1, array2) => isIncluded(array1, array2) || isIncluded(array2, array1);

const calculatePart1 = text => {
  const lines = text.split('\n');
  return lines.reduce((acc, line) => {
    const ranges = line.split(',');
    const arrays = ranges.map(rangeToArray);
    return arraysFullIncluded(...arrays) ? acc + 1 : acc;
  }, 0);
}


assert(calculatePart1(exampleInput) === expectedResult);

const part1Solution = calculatePart1(input);

console.log({ part1Solution });

// ----------------------------

const overlaps = (array1, array2) => array1.some(e => array2.includes(e));
const arraysOverlaps = (array1, array2) => overlaps(array1, array2) || overlaps(array2, array1);

const calculatePart2 = text => {
  const lines = text.split('\n');
  return lines.reduce((acc, line) => {
    const ranges = line.split(',');
    const arrays = ranges.map(rangeToArray);
    return arraysOverlaps(...arrays) ? acc + 1 : acc;
  }, 0);
}

const expectedResult2 = 4;

assert(calculatePart2(exampleInput) === expectedResult2);

const part2Solution = calculatePart2(input);

console.log({ part2Solution });