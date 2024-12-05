import { lines } from "./input.js";
import { getTotal } from "./utils.js";

let mulTotal = 0;
let finished = false;
let dont = "don't()";
let doer = "do()";

let linesToProcess = lines;

while (!finished) {
  const dontIndex = linesToProcess.indexOf(dont);
  if (dontIndex === -1) {
    mulTotal += getTotal(linesToProcess);
    break;
  }

  const toProcess = linesToProcess.substring(0, dontIndex);
  mulTotal += getTotal(toProcess);

  linesToProcess = linesToProcess.substring(dontIndex + dont.length);
  const doIndex = linesToProcess.indexOf(doer);
  if (doIndex === -1) {
    break;
  }

  linesToProcess = linesToProcess.substring(doIndex + doer.length);
}
console.log(mulTotal);
