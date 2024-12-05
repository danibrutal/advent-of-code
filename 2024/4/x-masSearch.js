import { lines } from "./input.js";
import { searchMasX } from "./utils.js";

let totalMasX = 0;
let matrixLength = lines.length;

for (let i = 0; i < matrixLength; i++) {
  for (let j = 0; j < matrixLength; j++) {
    if (lines[i][j] === "A") {
      totalMasX += searchMasX(lines, i, j);
    }
  }
}

console.log("totalMasX", totalMasX);
