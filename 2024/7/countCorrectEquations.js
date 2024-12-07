import { equationLines } from "./input.js";
import { isResultAchievable } from "./utils.js";

let total = 0;

for (let [result, numbers] of equationLines) {
  if (isResultAchievable(result, numbers)) {
    total += Number(result);
  }
}

console.log(total);
