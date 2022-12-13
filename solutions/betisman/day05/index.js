const { assert } = require('console');
const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');
const exampleInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
const expectedResult = 'CMZ';

const getStacks = lines => lines
    .filter(line => line.indexOf('move') < 0)
    .filter(line => line.indexOf('[') > -1)
    .map(line => {
      const chars = line.split('');
      const crates = chars.reduce((acc, char, index) => (index - 1) % 4 === 0 ? [...acc, char] : acc, []);
      return crates;
    })
    .reduce((acc, level, index) => {
      level.forEach((crate, index2) => acc[index2] ? acc[index2].push(crate) : acc.push([crate]));
      return acc;
    }, [])
    .map(s => s.reverse()).map(e => e.filter(ee => ee !== ' '));

const getCommands = lines => lines
  .filter(line => line.indexOf('move') > -1)
  .map(line => {
    const { groups: { amount, from, to } } = line.match(/move (?<amount>\d+) from (?<from>\d+) to (?<to>\d+)/);
    return { amount: parseInt(amount), from: parseInt(from) - 1, to: parseInt(to) - 1 };
  });

const calculatePart = part => text => {
  const lines = text.split('\n');
  
  const sortedStacks = getStacks(lines);
  const commands = getCommands(lines);

  const stacks = sortedStacks;
  commands.forEach(command => {
    const { amount, from, to } = command;
    let toMove = stacks[from].splice(amount * (-1), amount);
    toMove = part === 1 ? toMove.reverse() : toMove;
    toMove.forEach(e => stacks[to].push(e));
  });

  return stacks.map(stack => stack.pop()).join('');
}

const calculatePart1 = calculatePart(1);
const calculatePart2 = calculatePart(2);

assert(calculatePart1(exampleInput) === expectedResult);

const part1Solution = calculatePart1(input);

assert(calculatePart1(input) === 'RTGWZTHLD');
console.log({ part1Solution });
// ----------------------------

const expectedResult2 = 'MCD';

assert(calculatePart2(exampleInput) === expectedResult2);

const part2Solution = calculatePart2(input);

console.log({ part2Solution });