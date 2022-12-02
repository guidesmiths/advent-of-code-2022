const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');

const sum = (a, b) => +a + (+b);

const caloriesByElf = input.split('\n\n')
  .map(a => a.split('\n').reduce(sum, 0));

const sortedCaloriesByElf = caloriesByElf.sort((a, b) => a > b ? -1 : 1);

const part1Solution = sortedCaloriesByElf[0];

const part2Solution = sortedCaloriesByElf.slice(0,3).reduce(sum, 0);

console.log({ part1Solution });
console.log({ part2Solution });
