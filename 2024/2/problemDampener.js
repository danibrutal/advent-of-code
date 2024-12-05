import { reports } from "./input.js";
import { isLevelSafe, isLevelSafeWithProblemDampener } from "./utils.js";

let safeLevels = 0;

// 1 2 7 8 9 unsafe
// 1 3 2 4 5 safe removing 2nd level
// 8 6 4 4 1 safe removing third level, 4
// 3 2 4 5 safe removing 1st level

for (let i = 0; i < reports.length; i++) {
  console.log("-------------level------------");
  if (isLevelSafe(reports[i])) {
    safeLevels++;
  } else {
    const testReport = reports[i];
    for (let j = 0; j < testReport.length; j++) {
      const newReport = [...testReport.slice(0, j), ...testReport.slice(j + 1)];
      if (isLevelSafe(newReport)) {
        safeLevels++;
        break;
      }
    }
  }
}

console.log("safeLevels", safeLevels);
