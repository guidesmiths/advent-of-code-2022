const fs = require('fs');

// Personal data set => big list of the section assignments for each pair
const inputCase = fs.readFileSync('./input.txt', { encoding:'utf8', flag:'r' });

// Provided test case
const testCase = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`


// This can vary based on the problem
const parseInput = (input) => input.split('\n').map(row => row.split(",").map(group => group.split("-").map(Number)));

// Solution
const resolve = (input) => input.reduce((previousValue, currentValue) => {
  const min0 = currentValue[0][0];
  const max0 = currentValue[0][1];
  const min1 = currentValue[1][0];
  const max1 = currentValue[1][1];

  const sections0 = Array.from({length: max0 - min0 + 1}, (x, i) => i + min0);
  const sections1 = Array.from({length: max1 - min1 + 1}, (x, i) => i + min1);

  const overlap = sections0.find(item0 => sections1.find(item1 => item1 === item0));

  if (overlap) return previousValue + 1;
  return previousValue;
}, 0);

const parsedTest = parseInput(testCase);
console.log('parsedTest :>> ', parsedTest);
const test = resolve(parsedTest);
console.log(`The test solution is ${test}`);
console.assert(test === 4, 'Test case failed');

const parsedInput = parseInput(inputCase);
const output = resolve(parsedInput);
console.log(`The solution is ${output}`);
