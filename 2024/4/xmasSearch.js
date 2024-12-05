import { lines } from "./input.js";
import { searchXmas } from "./utils.js";

let totalXmas = 0;
let matrixLength = lines.length;

for (let i = 0; i < matrixLength; i++) {
  for (let j = 0; j < matrixLength; j++) {
    if (lines[i][j] === "X") {
      totalXmas += searchXmas(lines, i, j);
    }
  }
}

console.log(totalXmas);
