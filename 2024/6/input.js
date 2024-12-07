import fs from "fs";

const fileContent = fs.readFileSync("input.txt", "utf8");

let maze = fileContent.split("\n").map((line) => Array.from(line));

export { maze };
