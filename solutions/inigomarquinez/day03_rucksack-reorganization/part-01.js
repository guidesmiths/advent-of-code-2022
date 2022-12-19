const fs = require('fs');

// Personal data set => list of all of the items currently in each rucksack
const inputCase = fs.readFileSync('./input.txt', { encoding:'utf8', flag:'r' });

// Provided test case
const testCase = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const parseInput = (input) => input.split('\n').map(rucksack => {
  const compartmentSize = rucksack.length / 2;
  return [rucksack.substring(0, compartmentSize).split(""), rucksack.substring(compartmentSize).split("")];
});

// Solution
const resolve = (input) => {
  return input.reduce((previousValue, currentRucksack) => {
    const repeatedItem = currentRucksack[0].find(item0 => currentRucksack[1].find(item1 => item1 === item0));
    const priority = /^[A-Z]*$/.test(repeatedItem)
      ? repeatedItem.charCodeAt(0) - 38
      : repeatedItem.charCodeAt(0) - 96;
    return previousValue + priority;
  }, 0);
}

const parsedTest = parseInput(testCase);
const test = resolve(parsedTest);
console.assert(test === 157, 'Test case failed');

const parsedInput = parseInput(inputCase);
const output = resolve(parsedInput);
console.log(`The solution is ${output}`);
