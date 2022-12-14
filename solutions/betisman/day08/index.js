const { assert } = require('console');
const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');
const exampleInput = `30373
25512
65332
33549
35390`;
const expectedResult = 21;

const transpose = matrix => matrix[0].map((_, i) => matrix.map(row => row[i]));

const isVisibleFromTop = (transposedMatrix, { x, y, height }) => transposedMatrix[x].slice(0, y).every(treeHeight => treeHeight < height);
const isVisibleFromBottom = (transposedMatrix, { x, y, height }) => transposedMatrix[x].slice(y + 1).every(treeHeight => treeHeight < height);
const isVisibleFromLeft = (matrix, { x, y, height }) => matrix[y].slice(0, x).every(treeHeight => treeHeight < height);
const isVisibleFromRight = (matrix, { x, y, height }) => matrix[y].slice(x + 1).every(treeHeight => treeHeight < height);

const isTreeVisible = (matrix, transposedTreeMatrix, { x, y, height }) => {
  if (x === 0 || y === 0 || x === matrix[0].length - 1 || y === matrix.length - 1) return true;
  return isVisibleFromTop(transposedTreeMatrix, { x, y, height })
    || isVisibleFromBottom(transposedTreeMatrix, { x, y, height })
    || isVisibleFromLeft(matrix, { x, y, height })
    || isVisibleFromRight(matrix, { x, y, height });
}

const calculatePart1 = text => {
  const lines = text.split('\n');
  const treeMatrix = lines.map(row => row.split(''));
  const transposedTreeMatrix = transpose(treeMatrix);
  const visibleTrees = treeMatrix.reduce((acc, row, y) => acc + row.reduce((_acc, treeHeight, x) =>
    _acc + (isTreeVisible(treeMatrix, transposedTreeMatrix, { x, y, height: treeHeight }) ? 1 : 0), 0), 0)
  return visibleTrees;
}

assert(calculatePart1(exampleInput) === expectedResult);
const part1Solution = calculatePart1(input);

console.log({ part1Solution });

// -------------------------------

const seenTreesArray = (height, array) => array
  .reduce((acc, treeHeight) => treeHeight < height
    ? { currentVisibility: acc.currentVisibility, seenTrees: acc.seenTrees + 1 * acc.currentVisibility }
    : { currentVisibility: 0, seenTrees: acc.seenTrees + 1 * acc.currentVisibility },
    { currentVisibility: 1, seenTrees: 0 }
  ).seenTrees;

const seenTreesRight = (array, { x, y, height }) => seenTreesArray(height, array.slice(x + 1));
const seenTreesLeft = (array, { x, y, height }) => seenTreesArray(height, array.slice(0, x).reverse());
const seenTreesTop = (transposedArray, { x, y, height }) => seenTreesArray(height, transposedArray.slice(0, y).reverse());
const seenTreesBottom = (transposedArray, { x, y, height }) => seenTreesArray(height, transposedArray.slice(y + 1));

const seenTrees = (matrix, transposedMatrix, { x, y, height }) =>{
  if (x === 0 || y === 0 || x === matrix[0].length - 1 || y === matrix.length - 1) return 0;
  const arr = [
    seenTreesTop(transposedMatrix[x], { y, height }),
    seenTreesBottom(transposedMatrix[x], { y, height }),
    seenTreesRight(matrix[y], { x, height }),
    seenTreesLeft(matrix[y], { x, height }),
  ]
  // console.log('arr', x, y, height, arr)
  return arr.reduce((acc, v) => acc * v, 1);
}

const calculatePart2 = text => {
  const lines = text.split('\n');
  const treeMatrix = lines.map(row => row.split(''));
  const transposedTreeMatrix = transpose(treeMatrix);

  const result = treeMatrix.reduce((acc, row, y) => {
    const seenInRow = row.reduce((_acc, treeHeight, x) => {
      const seenFromTree = seenTrees(treeMatrix, transposedTreeMatrix, { x, y, height: treeHeight });
      return seenFromTree > _acc ? seenFromTree : _acc;
    }, 0);
    return seenInRow > acc ? seenInRow : acc;
  }, 0);
return result;
}

const expectedResult2 = 8;

assert(calculatePart2(exampleInput) === expectedResult2);

const part2Solution = calculatePart2(input);

console.log({ part2Solution });
