import fs from "fs";

const DIRECTIONS = ["--", "|", "/", "\\"];

const isAntena = (char) => {
  return /^[a-zA-Z0-9]$/.test(char);
};

const isSuitableLocationForAntinode = (char) => {
  return char === "." || isAntena(char);
};

const getPairInDirection = (map, x, y, direction) => {
  let distance = 0;
  let found = false;
  do {
    distance++;

    switch (direction) {
      case "--":
        if (isAntena(map?.[x + distance]?.[y])) {
          found = [x + distance, y];
        } else if (isAntena(map?.[x - distance]?.[y])) {
          found = [x - distance, y];
        }
        break;
      case "|":
        if (isAntena(map[x]?.[y + distance])) {
          found = [x, y + distance];
        } else if (isAntena(map?.[x]?.[y - distance])) {
          found = [x, y - distance];
        }
        break;
      case "/":
        if (isAntena(map?.[x + distance]?.[y + distance])) {
          found = [x + distance, y + distance];
        } else if (isAntena(map?.[x - distance]?.[y - distance])) {
          found = [x - distance, y - distance];
        }
        break;
      case "\\":
        if (isAntena(map?.[x - distance]?.[y - distance])) {
          found = [x - distance, y - distance];
        } else if (isAntena(map?.[x + distance]?.[y + distance])) {
          found = [x + distance, y + distance];
        }

        break;
    }
  } while (distance < map.length / 2 && !found);

  return found ? [[x, y], found] : [];
};

const findPairs = (map, x, y) => {
  const pairs = [];
  for (let direction of DIRECTIONS) {
    let pair = getPairInDirection(map, x, y, direction);
    if (pair.length) {
      pairs.push(pair);
    }
  }

  return pairs;
};

const locationsAreWithinBounds = (map, loc1, loc2) => {
  const length = map.length;
  let loc1Within =
    loc1[0] >= 0 && loc1[0] < length && loc1[1] >= 0 && loc1[1] < length;

  let loc2Within =
    loc2[0] >= 0 && loc2[0] < length && loc2[1] >= 0 && loc2[1] < length;

  return loc1Within || loc2Within;
};

const findAntinodes = (map, antenaPair, antinodesSet) => {
  let [antena1, antena2] = antenaPair;
  let distanceX = Math.abs(antena1[0] - antena2[0]);
  let distanceY = Math.abs(antena1[1] - antena2[1]);

  let originalDistanceX = distanceX;
  let originalDistanceY = distanceY;

  const isSameFrequency =
    map[antena1[0]][antena1[1]] === map[antena2[0]][antena2[1]];

  let loc1, loc2;
  let count = 1;

  do {
    // same y
    if (antena1[0] === antena2[0]) {
      // sort by y
      [antena1, antena2] = [antena1, antena2].toSorted((a, b) => {
        return a[1] - b[1];
      });

      loc1 = [antena1[0], antena1[1] - distanceY];
      loc2 = [antena2[0], antena2[1] + distanceY];
    } else if (antena1[1] === antena2[1]) {
      // sort by x
      [antena1, antena2] = [antena1, antena2].toSorted((a, b) => {
        return a[0] - b[0];
      });

      loc1 = [antena1[0] - distanceX, antena1[1]];
      loc2 = [antena2[0] + distanceX, antena2[1]];
    } else if (antena1[0] !== antena2[0] && antena1[1] !== antena2[1]) {
      // sort by y
      [antena1, antena2] = [antena1, antena2].toSorted((a, b) => {
        return a[1] - b[1];
      });

      //
      let possibleXLoc1 =
        antena1[0] > antena2[0]
          ? antena1[0] + distanceX
          : antena1[0] - distanceX;

      let possibleXLoc2 =
        antena1[0] > antena2[0]
          ? antena2[0] - distanceX
          : antena2[0] + distanceX;

      loc1 = [possibleXLoc1, antena1[1] - distanceY];
      loc2 = [possibleXLoc2, antena2[1] + distanceY];
    }

    if (isSameFrequency) {
      if (isSuitableLocationForAntinode(map?.[loc1[0]]?.[loc1[1]])) {
        antinodesSet.add(`${loc1[0]}-${loc1[1]}`);
      }

      if (isSuitableLocationForAntinode(map?.[loc2[0]]?.[loc2[1]])) {
        antinodesSet.add(`${loc2[0]}-${loc2[1]}`);
      }

      antinodesSet.add(`${antena1[0]}-${antena1[1]}`);
      antinodesSet.add(`${antena2[0]}-${antena2[1]}`);
    }

    count++;
    distanceX = originalDistanceX * count;
    distanceY = originalDistanceY * count;
  } while (locationsAreWithinBounds(map, loc1, loc2));
};

const testOutput = (map, foundSet) => {
  for (const item of foundSet.keys()) {
    const [x, y] = item.split("-");

    if (!isAntena(map[x][y])) {
      map[x][y] = "#";
    }
  }

  // Convert the array to a string
  const arrayToString = map.map((row) => row.join("")).join("\n");

  // Write to a file
  fs.writeFile("output.txt", arrayToString, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File written successfully.");
    }
  });
};
export { isAntena, findPairs, findAntinodes, testOutput };
