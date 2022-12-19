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

const parseInput = (input) => {
  const rucksacks = input.split('\n');
  
  let r = 0;
  let groups = [];
  let group;
  while (r < rucksacks.length) {
    if (r%3 === 0) {
      if (group) groups.push(group);
      group = [];
    }
    group.push(rucksacks[r].split(""));

    r++;
  }
  groups.push(group);

  return groups;
};

// Solution
const resolve = (input) => {
  return input.reduce((previousValue, currentGroup) => {
    const repeatedItem01 = currentGroup[0].filter(item => currentGroup[1].includes(item));
    const repeatedItem02 = currentGroup[0].filter(item => currentGroup[2].includes(item));
    const repeatedItem = repeatedItem01.find(item0 => repeatedItem02.find(item1 => item1 === item0));

    const priority = /^[A-Z]*$/.test(repeatedItem)
      ? repeatedItem.charCodeAt(0) - 38
      : repeatedItem.charCodeAt(0) - 96;
    return previousValue + priority;
  }, 0);
}

const parsedTest = parseInput(testCase);
const test = resolve(parsedTest);
console.log(`The test solution is ${test}`);
console.assert(test === 70, 'Test case failed');

const parsedInput = parseInput(inputCase);
const output = resolve(parsedInput);
console.log(`The solution is ${output}`);
