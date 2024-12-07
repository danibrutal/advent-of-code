const RIGHT = "RIGHT";
const LEFT = "LEFT";
const UP = "UP";
const DOWN = "DOWN";

const OBSTRUCTION = "#";

const isTheGuardLeaving = (maze, i, j, direction) => {
  switch (direction) {
    case UP:
      return i === 0;
    case DOWN:
      return i === maze.length - 1;
    case LEFT:
      return j === 0;
    case RIGHT:
      return j === maze.length - 1;
  }
};

const isObstructionComing = (maze, i, j, direction) => {
  switch (direction) {
    case UP:
      return maze[i - 1][j] === OBSTRUCTION;
    case DOWN:
      return maze[i + 1][j] === OBSTRUCTION;
    case LEFT:
      return maze[i][j - 1] === OBSTRUCTION;
    case RIGHT:
      return maze[i][j + 1] === OBSTRUCTION;
  }
};

const getDirection = (currentDirection) => {
  switch (currentDirection) {
    case UP:
      return RIGHT;
    case DOWN:
      return LEFT;
    case LEFT:
      return UP;
    case RIGHT:
      return DOWN;
  }
};

const countVisited = (maze, startRow, startCol) => {
  let count = 1;
  let direction = UP;
  let i = startRow;
  let j = startCol;

  let alreadyVisited = new Map();

  alreadyVisited.set(`${startRow}-${startCol}`, true);

  do {
    if (isObstructionComing(maze, i, j, direction)) {
      direction = getDirection(direction);
    }

    if (isObstructionComing(maze, i, j, direction)) {
      direction = getDirection(direction);
    }

    switch (direction) {
      case UP:
        i--;
        break;
      case DOWN:
        i++;
        break;
      case LEFT:
        j--;
        break;
      case RIGHT:
        j++;
        break;
    }

    let alreadyVisitedCell = alreadyVisited.get(`${i}-${j}`);

    if (!alreadyVisitedCell) {
      count++;
    }

    alreadyVisited.set(`${i}-${j}`, true);
  } while (!isTheGuardLeaving(maze, i, j, direction));

  return [count, alreadyVisited];
};

const pathHasLoops = (maze, startRow, startCol) => {
  let direction = UP;
  let i = startRow;
  let j = startCol;

  let alreadyVisited = new Map();

  alreadyVisited.set(`${startRow}-${startCol}`, direction);

  do {
    if (isObstructionComing(maze, i, j, direction)) {
      direction = getDirection(direction);
    }

    if (isObstructionComing(maze, i, j, direction)) {
      direction = getDirection(direction);
    }

    switch (direction) {
      case UP:
        i--;
        break;
      case DOWN:
        i++;
        break;
      case LEFT:
        j--;
        break;
      case RIGHT:
        j++;
        break;
    }

    let alreadyVisitedCell = alreadyVisited.get(`${i}-${j}`);

    if (alreadyVisitedCell === direction) {
      // if we end up in the same cell walking in the same direction
      // there are loops
      return true;
    }

    alreadyVisited.set(`${i}-${j}`, direction);
  } while (!isTheGuardLeaving(maze, i, j, direction));

  return false;
};

const canPlaceObstruction = (maze, i, j) => {
  return maze[i][j] === ".";
};

const getGuardStartingPoint = (maze) => {
  for (let [rowIndex, line] of maze.entries()) {
    for (let [colIndex, char] of line.entries()) {
      if (char === "^") {
        return [rowIndex, colIndex];
      }
    }
  }

  return [-1, -1];
};

export {
  countVisited,
  canPlaceObstruction,
  getGuardStartingPoint,
  pathHasLoops,
  OBSTRUCTION,
};
