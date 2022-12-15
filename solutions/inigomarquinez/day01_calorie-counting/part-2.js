const fs = require('fs');

const inputCase = fs.readFileSync('./input.txt', { encoding:'utf8', flag:'r' });

const testCase = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const resolve = (input) => {
  const groupByElf = input.split(/\n\s*\n/);
  const elfCaloriesArray = groupByElf.map((elfCalories) =>
    elfCalories.split(/\n/).map(Number).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  );
  const elfCaloriesSortedArray = elfCaloriesArray.sort((a, b) => b - a);
  return elfCaloriesSortedArray.slice(0, 3).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}

const test = resolve(testCase);
console.assert(test === 45000, 'Test case failed');

const output = resolve(inputCase);
console.log(`The solution is ${output}`);
