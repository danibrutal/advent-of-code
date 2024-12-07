import { maze } from "./input.js";
import { countVisited } from "./utils.js";

let visited = 0;

for (let [rowIndex, line] of maze.entries()) {
  for (let [colIndex, char] of Array.from(line).entries()) {
    if (char === "^") {
      console.log(`Found ^ at row ${rowIndex}, column ${colIndex}`);

      [visited] = countVisited(maze, rowIndex, colIndex);
    }
  }
}

console.log("visited", visited);
//console.log("maze", maze);
