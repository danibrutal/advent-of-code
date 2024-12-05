const getTotal = (line) => {
  const regexp = /mul\((\d+),(\d+)\)/g;
  let matches = [...line.matchAll(regexp)];
  let total = 0;

  for (let i = 0; i < matches.length; i++) {
    total += Number(matches[i][1]) * Number(matches[i][2]);
  }

  return total;
};

export { getTotal };
