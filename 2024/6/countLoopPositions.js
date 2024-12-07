import { maze } from "./input.js";
import {
  canPlaceObstruction,
  getGuardStartingPoint,
  pathHasLoops,
  OBSTRUCTION,
  countVisited,
} from "./utils.js";

let positionsWithLoops = 0;

const [x, y] = getGuardStartingPoint(maze);

const [visited, pathPoints] = countVisited(maze, x, y);

for (let i = 0; i < maze.length; i++) {
  for (let j = 0; j < maze.length; j++) {
    if (canPlaceObstruction(maze, i, j) && pathPoints.get(`${i}-${j}`)) {
      let before = maze[i][j];
      maze[i][j] = OBSTRUCTION;
      if (pathHasLoops(maze, x, y)) {
        positionsWithLoops++;
      }
      maze[i][j] = before;
    }
  }
}

console.log("loop positions", positionsWithLoops);
