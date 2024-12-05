import fs from "fs";

// Read the file synchronously
const fileContent = fs.readFileSync("input.txt", "utf8");

// Split the file content into lines
const lines = fileContent.split("\n");

const reports = [];

// Process each line
lines.forEach((line) => {
  const levels = line.split(" ");

  reports.push(levels);
});

export { reports };
