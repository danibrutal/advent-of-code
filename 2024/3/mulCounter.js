import { lines } from "./input.js";
import { getTotal } from "./utils.js";

let mulTotal = 0;

for (let line of lines) {
  mulTotal += getTotal(line);
}

console.log(mulTotal);
