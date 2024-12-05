const XMAS = "XMAS";
const MAS = "MAS";
const SAM = "SAM";

const searchXmas = (matrix, i, j) => {
  let totalWords = 0;
  totalWords += searchWord(matrix, i, j, "LEFT");
  totalWords += searchWord(matrix, i, j, "RIGHT");
  totalWords += searchWord(matrix, i, j, "UP");
  totalWords += searchWord(matrix, i, j, "DOWN");
  totalWords += searchWord(matrix, i, j, "DIAGONAL_UP_LEFT");
  totalWords += searchWord(matrix, i, j, "DIAGONAL_UP_RIGHT");
  totalWords += searchWord(matrix, i, j, "DIAGONAL_DOWN_LEFT");
  totalWords += searchWord(matrix, i, j, "DIAGONAL_DOWN_RIGHT");

  return totalWords;
};

const searchWord = (matrix, i, j, direction) => {
  let count = 0;

  while (count < XMAS.length) {
    if (matrix?.[i]?.[j] !== XMAS[count]) {
      return 0;
    }

    switch (direction) {
      case "LEFT":
        j--;
        break;
      case "RIGHT":
        j++;
        break;
      case "UP":
        i--;
        break;
      case "DOWN":
        i++;
        break;
      case "DIAGONAL_UP_LEFT":
        i--;
        j--;
        break;
      case "DIAGONAL_UP_RIGHT":
        i--;
        j++;
        break;
      case "DIAGONAL_DOWN_LEFT":
        i++;
        j--;
        break;
      case "DIAGONAL_DOWN_RIGHT":
        i++;
        j++;
        break;
    }

    count++;
  }

  return 1;
};

// M S
//  A
// M S
const searchMasX = (matrix, i, j) => {
  let topLeftBottomRight =
    matrix?.[i - 1]?.[j - 1] + matrix?.[i]?.[j] + matrix?.[i + 1]?.[j + 1];
  let topRightBottomLeft =
    matrix?.[i - 1]?.[j + 1] + matrix?.[i]?.[j] + matrix?.[i + 1]?.[j - 1];

  if (
    (topLeftBottomRight === MAS || topLeftBottomRight === SAM) &&
    (topRightBottomLeft === MAS || topRightBottomLeft === SAM)
  ) {
    return 1;
  }
  return 0;
};
export { searchXmas, searchMasX };
