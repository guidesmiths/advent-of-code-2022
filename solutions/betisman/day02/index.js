const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DRAW = 'DRAW';
const LOSE = 'LOSE';
const WIN = 'WIN';

const elfPlays = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
}

const myPlays = {
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
}

const points = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
}

const logic = {
  ROCK:     { ROCK: DRAW, PAPER: LOSE,  SCISSORS: WIN   },
  PAPER:    { ROCK: WIN,  PAPER: DRAW,  SCISSORS: LOSE  },
  SCISSORS: { ROCK: LOSE, PAPER: WIN,   SCISSORS: DRAW  },
}

const calculateWin = (a, b) => logic[a][b];

const combats = input.split('\n').map(s => {
  const [elfPlay, myPlay] = s.split(' ');
  return { elfPlay: elfPlays[elfPlay], myPlay: myPlays[myPlay] };
});

const calculateCombatPoints = ({ elfPlay, myPlay }) => {
  const chosenPlayPoints = points[myPlay];
  const resultPoints = points[calculateWin(myPlay, elfPlay)];
  return chosenPlayPoints + resultPoints;
}

const part1Solution = combats.map(calculateCombatPoints).reduce((acc, v) => acc + v, 0);

console.log({ part1Solution })

const reverseLogic = {
  ROCK: { DRAW: ROCK, WIN: PAPER, LOSE: SCISSORS },
  PAPER: { LOSE: ROCK, DRAW: PAPER, WIN: SCISSORS },
  SCISSORS: { WIN: ROCK, LOSE: PAPER, DRAW: SCISSORS },
}

const expectedResults = {
  X: LOSE,
  Y: DRAW,
  Z: WIN,
}

const calculatePlay = (elfPlay, expectedResult) => reverseLogic[elfPlay][expectedResult];

const combats2 = input.split('\n').map(s => {
  const [elfPlay, expectedResult] = s.split(' ');
  return { elfPlay: elfPlays[elfPlay], expectedResult: expectedResults[expectedResult] };
});

const calculateCombatPoints2 = ({ elfPlay, expectedResult }) => {
  const chosenPlayPoints = points[calculatePlay(elfPlay, expectedResult)];
  const resultPoints = points[expectedResult];
  return chosenPlayPoints + resultPoints;
}

const part2Solution = combats2.map(calculateCombatPoints2).reduce((acc, v) => acc + v, 0);

console.log({ part2Solution });
