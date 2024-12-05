import { left, right } from "./input.js";

//console.log(left);

const rightMap = new Map();

for (let i = 0; i < right.length; i++) {
  const count = rightMap.get(right[i]);

  if (count) {
    rightMap.set(right[i], count + 1);
  } else {
    rightMap.set(right[i], 1);
  }
}

let similarityScore = 0;

for (let i = 0; i < left.length; i++) {
  const count = rightMap.get(left[i]);

  if (count) {
    similarityScore += left[i] * count;
  }
}

console.log("similarityScore", similarityScore);
