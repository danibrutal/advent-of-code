import { map } from "./input.js";
import { findAntinodes, isAntena, testOutput } from "./utils.js";

let antinodesSet = new Set();

let allAntenas = [];

for (let [i, lines] of map.entries()) {
  for (let [j, char] of lines.entries()) {
    if (isAntena(char)) {
      allAntenas.push([i, j]);
    }
  }
}

for (let i = 0; i < allAntenas.length - 1; i++) {
  for (let j = i + 1; j < allAntenas.length; j++) {
    findAntinodes(map, [allAntenas[i], allAntenas[j]], antinodesSet);
  }
}

testOutput(map, antinodesSet);
