import fs from "fs";

// Read the file synchronously
const fileContent = fs.readFileSync("input.txt", "utf8");

// Split the file content into lines
const lines = fileContent.split("\n");

const left = [];
const right = [];

// Process each line
lines.forEach((line) => {
  const parts = line.split("   ");

  const [newLeft, newRight] = parts;

  left.push(Number(newLeft));
  right.push(Number(newRight));
});

export { left, right };
