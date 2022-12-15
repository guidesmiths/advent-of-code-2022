const fs = require('fs');

const translate = {
  'A': 1, // rock
  'B': 2, // paper
  'C': 3,  // scissors
  'X': 1, // rock
  'Y': 2, // paper
  'Z': 3  // scissors
}

const scores = {
  'X': 0, // loss
  'Y': 3, // draw
  'Z': 6  // win
}


const inputCase = fs.readFileSync('./input.txt', { encoding:'utf8', flag:'r' });

const testCase = `A Y
B X
C Z`;

const parseInput = (input) => input.split('\n').map(row => row.split(' '));

const resolve = (input) => {
  const score = input.reduce((previousValue, currentValue) => {
    let roundScore = scores[currentValue[1]];

    switch (currentValue[1]) {
      case 'X': // loss
        if (currentValue[0] === 'A') roundScore += 3;
        else if (currentValue[0] === 'B') roundScore += 1;
        else if (currentValue[0] === 'C') roundScore += 2;
        break;
      case 'Y': // draw
        roundScore += translate[currentValue[0]];
        break;
      case 'Z': // win
        if (currentValue[0] === 'A') roundScore += 2;
        else if (currentValue[0] === 'B') roundScore += 3;
        else if (currentValue[0] === 'C') roundScore += 1;
        break;
    }

    return previousValue + roundScore;
  }, 0);

  return score;
}

const parsedTest = parseInput(testCase);
const test = resolve(parsedTest);
console.assert(test === 15, 'Test case failed');

const parsedInput = parseInput(inputCase);

const output = resolve(parsedInput);
console.log(`The solution is ${output}`);

// Solution = 15337