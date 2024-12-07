import fs from "fs";

const fileContent = fs.readFileSync("input.txt", "utf8");

let equationLines = fileContent.split("\n").map((line) => {
  const [value, numbers] = line.split(": ");
  return [value, numbers.split(" ")];
});

export { equationLines };
