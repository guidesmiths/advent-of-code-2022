const fs = require('fs');

const translate = {
  'A': 1, // rock
  'B': 2, // paper
  'C': 3,  // scissors
  'X': 1, // rock
  'Y': 2, // paper
  'Z': 3  // scissors
}

const inputCase = fs.readFileSync('./input.txt', { encoding:'utf8', flag:'r' });

const testCase = `A Y
B X
C Z`;

const parseInput = (input) => input.split('\n').map(row => row.split(' ')).map(value => ([translate[value[0]], translate[value[1]]]));

const resolve = (input) => {
  const score = input.reduce((previousValue, currentValue) => {
    console.log('currentValue :>> ', currentValue);
    let roundScore = currentValue[1];

    if (currentValue[1] === 3 && currentValue[0] === 1) roundScore += 0
    else if (currentValue[1] === 1 && currentValue[0] === 3) roundScore += 6
    else if (currentValue[1] > currentValue[0]) roundScore += 6;
    else if (currentValue[1] < currentValue[0]) roundScore += 0;
    else roundScore += 3;

    return previousValue + roundScore;
  }, 0);

  return score;
}

// const parsedTest = parseInput(testCase);
// const test = resolve(parsedTest);
// console.assert(test === 15, 'Test case failed');

const parsedInput = parseInput(inputCase);
const output = resolve(parsedInput);
console.log(`The solution is ${output}`);
