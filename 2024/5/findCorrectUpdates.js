import { rules, updates } from "./input.js";
import {
  buildMapFromRules,
  isUpdateCorrect,
  middleNumberFrom,
} from "./utils.js";

const map = buildMapFromRules(rules);

let totalCorrectMid = 0;

for (let i = 0; i < updates.length; i++) {
  if (isUpdateCorrect(map, updates[i])) {
    totalCorrectMid += Number(middleNumberFrom(updates[i]));
  }
}

console.log(totalCorrectMid);
