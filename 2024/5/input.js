import fs from "fs";

// Read the file synchronously
const fileContent = fs.readFileSync("input.txt", "utf8");

let [rulesPart, updatesPart] = fileContent.split("\n\n");

const rules = rulesPart.split("\n");
const updates = updatesPart.split("\n").map((elem) => elem.split(","));

export { rules, updates };
