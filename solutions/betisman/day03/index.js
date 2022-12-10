const { assert } = require('console');
const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');
const exampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`
const expectedResult = 157;

const dedupe = array => [...new Set(array)];
const item2Value = char => {
  let value = char.charCodeAt(0) - 96;
  return value > 0 ? value : value + 58;
}

const calculatePart1 = text => {
  const lines = text.split('\n');
  return lines.reduce((_acc, line) => {
    const sack1 = line.slice(0, line.length / 2).split('');
    const sack2 = line.slice(line.length / 2, line.length).split('');
    const found = sack1.reduce((acc, v) => sack2.includes(v) ? [...acc, v] : acc, []);
    const itemFound = dedupe(found)[0];
    const value = item2Value(itemFound);
    return _acc + value;
  }, 0);
}

assert(calculatePart1(exampleInput) === expectedResult);

const part1Solution = calculatePart1(input);

console.log({ part1Solution });


// -------------------------------------------------------------------------

const calculatePart2 = text => {
  const lines = text.split('\n');
  const groups = lines.map((line, index) => {
    if (index % 3 === 0) {
      return lines.slice(index, index + 3);
    }
  }).filter(elem => !!elem);
  return groups.reduce((_acc, group) => {
    const [sack1, sack2, sack3] = group.map(e => e.split(''));
    const found = sack1
      .reduce((acc, v) => sack2.includes(v) ? [...acc, v] : acc, [])
      .reduce((acc, v) => sack3.includes(v) ? [...acc, v] : acc, []);
    const itemFound = dedupe(found)[0];
    const value = item2Value(itemFound);
    return _acc + value;
  }, 0);
}

const expectedResult2 = 70;
assert(calculatePart2(exampleInput) === expectedResult2);

const part2Solution = calculatePart2(input);

console.log({ part2Solution });