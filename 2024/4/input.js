import fs from "fs";

// Read the file synchronously
const fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.split("\n");

export { lines };
