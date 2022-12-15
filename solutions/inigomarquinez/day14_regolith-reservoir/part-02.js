const fs = require('fs');

const Element = {
  ROCK: '#',
  AIR: '.',
  SAND: 'o',
  SOURCE: '+',
};

// Personal data set => two-dimensional vertical slice of the cave
const inputCase = fs.readFileSync('./input.txt', { encoding:'utf8', flag:'r' });

// Provided test case
const testCase = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

// This can vary based on the problem
const parseInput = (input) => {
  const paths = input
    .split('\n')
    .map(path => path.split(' -> ').map(coordinates => coordinates.split(',').map(Number)));

  // Get grid size
  let minX, maxX, maxY;
  paths.forEach((path, pathIndex) => {
    path.forEach(coordinates => {

      if (pathIndex === 0) {
        minX = maxX = coordinates[0];
        maxY = coordinates[1];
      }
      else {
        if (coordinates[0] < minX) minX = coordinates[0];
        else if (coordinates[0] > maxX) maxX = coordinates[0];
        if (coordinates[1] > maxY) maxY = coordinates[1];
      }
    })
  });

  // Add floor with extra spaces at both sides
  maxY += 2;
  minX -= 1000;
  maxX += 1000;

  // Initialize grid
  let grid = [];
  let row = 0;
  while (row <= maxY) {
    let column = minX;
    grid[row] = [];
    while (column <= maxX) {
      grid[row][column] = row === maxY ? Element.ROCK : Element.AIR;
      column++;
    }
    row++;
  }
  // grid[0][500] = Element.SOURCE;

  // Fill grid
  paths.forEach(path => {
    path.forEach((coordinates, coordinatesIndex, coordinatesArray) => {
      if (coordinatesIndex > 0) {
        const prevCoordinates = coordinatesArray[coordinatesIndex-1];
        if (coordinates[0] === prevCoordinates[0]) {
          let it = Math.min(coordinates[1], prevCoordinates[1]);
          const maxIt = Math.max(coordinates[1], prevCoordinates[1]);
          while (it <= maxIt) {
            grid[it][coordinates[0]] = Element.ROCK;
            it++;
          }
        } else {
          let it = Math.min(coordinates[0], prevCoordinates[0]);
          const maxIt = Math.max(coordinates[0], prevCoordinates[0]);
          while (it <= maxIt) {
            grid[coordinates[1]][it] = Element.ROCK;
            it++;
          }
        }
      }
    });
  });

  console.debug('INITIAL GRID:')
  console.table(grid);
  console.debug('minX', minX, 'maxX', maxX, 'maxY', maxY);

  return grid;
};

const whatsNext = (grid, currentRow, currentCol, nextRow, nextCol, attempt) => {
  // console.debug(grid[nextRow]?.[nextCol], 'found at', nextRow, nextCol);

  switch (grid[nextRow]?.[nextCol]) {
    case Element.AIR:
      return whatsNext(grid, nextRow, nextCol, nextRow + 1, nextCol, 0);

    case Element.ROCK:
    case Element.SAND:
      if (attempt === 0) {
        return whatsNext(grid, currentRow, currentCol, nextRow, currentCol - 1, attempt + 1);
      } else if (attempt === 1) {
        return whatsNext(grid, currentRow, currentCol, nextRow, currentCol + 1, attempt + 1);
      } else {
        // console.debug('Sand comes to rest at', currentRow, currentCol);
        return [currentRow, currentCol];
      }

    default:
      // console.debug('Sand falls to abyss at');
      return null;
  }
}

// Solution
const resolve = (input) => {
  let loop = 0;
  let finalPosition = whatsNext(input, 0, 500, 0, 500, 1);
  // console.debug('finalPosition :>> ', finalPosition);

  while (finalPosition[0] !== 0 || finalPosition[1] !== 500) {
    input[finalPosition[0]][finalPosition[1]] = Element.SAND;
    // console.table(input);
    loop++;
    finalPosition = whatsNext(input, 0, 500, 1, 500, 0);
    // console.log('finalPosition :>> ', finalPosition);
  }

  console.debug('FINAL GRID:')
  console.table(input);
  return loop + 1;
}

// const parsedTest = parseInput(testCase);
// const test = resolve(parsedTest);
// console.log(`The test solution is ${test}`);
// console.assert(test === 93, 'Test case failed');

const parsedInput = parseInput(inputCase);
const output = resolve(parsedInput);
console.log(`The solution is ${output}`);
