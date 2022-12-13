const { assert } = require('console');
const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');
const exampleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
const expectedResult = 95437;

const createNode = ({ name, type, length, parent }) => ({
  name,
  type,
  length,
  parent,
  children: [],
});

const addNode = (node, { name, type, length }) => node.children.push(createNode({ name, type, length, parent: node }));
const getRootNode = tree => tree;
const findChild = (tree, node, _name) => _name === '/' ? getRootNode(tree) : node.children?.filter(({ name }) => name === _name)[0];

const generateTree = (tree, commands) => {
  let currentNode = tree;
  commands.forEach(([commandLine, ...responses]) => {
    const [command, arguments] = commandLine.split(' ');

    if (command === 'cd') {
      if (arguments === '..') {
        currentNode = currentNode.parent;
      } else {
        currentNode = findChild(tree, currentNode, arguments) || createNode({ name: arguments, type: 'dir' });
      }
    }
    if (command === 'ls') {
      responses.forEach(response => {
        const [size, name] = response.split(' ');
        let node = { name };
        if (size === 'dir') {
          node = { ...node, type: 'dir' };
        } else {
          node = { ...node, type: 'file', length: parseInt(size) };
        }
        addNode(currentNode, node);
      })
    }
  });
  return tree;
};

const getDirsSizes = tree => {
  const dirs = [];
  const files = [];
  const calculateDirSize = tree => {
    if (tree.type === 'file') {
      files.push({ name: tree.name, size: tree.length });
      return tree.length;
    }
    if (tree.type === 'dir') {
      tree.length = tree.children.reduce((acc, child) => acc + calculateDirSize(child), 0);
      dirs.push({ name: tree.name, size: tree.length });
      return tree.length;
    }
  }
  calculateDirSize(tree);
  return { dirs, files };
}

const calculateTree = text => {
  const lines = text.split('\n');
  const commands = text.split('$').map(e => e.trim()).map(e => e.split('\n')).slice(1);

  let tree = createNode({ name: '/', type: 'dir' });

  tree = generateTree(tree, commands);

  return getDirsSizes(tree);
}

const calculatePart1 = text => {
  const { dirs } = calculateTree(text);
  const sortedDirs = dirs.sort((dirA, dirB) => dirA.size > dirB.size ? 1 : -1 );
  return sortedDirs.filter(dir => dir.size <= 100000).reduce((acc, dir) => acc + dir.size, 0);
};

assert(calculatePart1(exampleInput) === expectedResult);

const part1Solution = calculatePart1(input);

console.log({ part1Solution });

// -------------------------------

const getTreeSize = files => files.reduce((acc, file) => acc + file.size, 0);

const FILESYSTEM_SIZE = 70000000;
const NEEDED_SPACE_FREE = 30000000;
const MAX_ALLOCATED_SPACE = FILESYSTEM_SIZE - NEEDED_SPACE_FREE;

const calculatePart2 = text => {
  const { dirs, files } = calculateTree(text);
  const treeSize = getTreeSize(files);
  const minSpaceToFree = treeSize - MAX_ALLOCATED_SPACE;
  const sortedDirs = dirs.sort((dirA, dirB) => dirA.size > dirB.size ? 1 : -1);
  return sortedDirs.filter(dir => dir.size >= minSpaceToFree)[0].size;
};

const expectedResult2 = 24933642;


assert(calculatePart2(exampleInput) === expectedResult2);

const part2Solution = calculatePart2(input);

console.log({ part2Solution });