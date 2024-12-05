import { reports } from "./input.js";
import { isLevelSafe } from "./utils.js";

let safeLevels = 0;

for (let i = 0; i < reports.length; i++) {
  if (isLevelSafe(reports[i])) {
    safeLevels++;
  }
}

console.log("safeLevels", safeLevels);
