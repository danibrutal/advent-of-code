import { left, right } from "./input.js";

const arraySortAsc = (array) => {
  array.sort((a, b) => a - b);
};

arraySortAsc(left);
arraySortAsc(right);

let distances = 0;
for (let i = 0; i < left.length; i++) {
  distances += Math.abs(left[i] - right[i]);
}

console.log("distances", distances.toString());
