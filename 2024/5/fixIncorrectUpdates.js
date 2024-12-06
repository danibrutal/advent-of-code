import { rules, updates } from "./input.js";
import {
  buildMapFromRules,
  isUpdateCorrect,
  middleNumberFrom,
  fixWrongUpdate,
} from "./utils.js";

const map = buildMapFromRules(rules);

let totalFixedMid = 0;
let kapot = 0;

for (let i = 0; i < updates.length; i++) {
  if (!isUpdateCorrect(map, updates[i], false)) {
    let fixedUpdate = fixWrongUpdate(map, [...updates[i]]);
    totalFixedMid += Number(middleNumberFrom(fixedUpdate));

    if (!isUpdateCorrect(map, fixedUpdate, true)) {
      kapot++;
      console.log("something is wrong!");
      console.log("fixed", fixedUpdate);
    }
  }
}

console.log("kapot", kapot);
console.log(totalFixedMid);
