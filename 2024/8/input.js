import fs from "fs";

const fileContent = fs.readFileSync("input.txt", "utf8");

let map = fileContent.split("\n").map((line) => Array.from(line));

export { map };
