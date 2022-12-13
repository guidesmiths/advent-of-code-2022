const { assert } = require('console');
const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');
const exampleInputs = [
  { input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', expectedResult: 7 },
  { input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expectedResult: 5 },
  { input: 'nppdvjthqldpwncqszvftbrmjlhg', expectedResult: 6 },
  { input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expectedResult: 10 },
  { input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expectedResult: 11 },
];

const dedupe = array => [...new Set(array)];
const calculatePart = lengthOfMarker => text => {
  const signal = text.split('');

  let index = 0;
  return signal.reduce((acc, char, index) => {
    if (acc) return acc;
    const window = signal.slice(index, index + lengthOfMarker);
    const deduped = dedupe(window);
    if (deduped.length === lengthOfMarker) return text.indexOf(window.join('')) + lengthOfMarker;
    return acc;
  }, undefined);
}

const calculatePart1 = calculatePart(4);

exampleInputs.forEach(example => assert(calculatePart1(example.input) === example.expectedResult));

const part1Solution = calculatePart1(input);

console.log({ part1Solution });
// ----------------------------
const exampleInputs2 = [
  { input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', expectedResult: 19 },
  { input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expectedResult: 23 },
  { input: 'nppdvjthqldpwncqszvftbrmjlhg', expectedResult: 23 },
  { input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expectedResult: 29 },
  { input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expectedResult: 26 },
];

const calculatePart2 = calculatePart(14);

exampleInputs2.forEach(example => assert(calculatePart2(example.input) === example.expectedResult));

const part2Solution = calculatePart2(input);

console.log({ part2Solution });
