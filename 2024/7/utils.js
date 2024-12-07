const OPERATORS = ["+", "*"];

const calculateResults = (numbers, solutions, accum) => {
  let next = Number(numbers.shift());

  if (numbers.length === 0) {
    solutions.push(next + accum);
    solutions.push(next * accum);
    return;
  }

  calculateResults([...numbers], solutions, next + accum);
  calculateResults(
    [...numbers],
    solutions,
    accum === 0 ? next * 1 : next * accum
  );
};

const calculateResultsWithConcatenation = (numbers, solutions, accum) => {
  let next = Number(numbers.shift());

  if (numbers.length === 0) {
    solutions.push(next + Number(accum));
    solutions.push(next * Number(accum));
    solutions.push(Number(String(accum) + String(next)));
    return;
  }

  calculateResultsWithConcatenation(
    [...numbers],
    solutions,
    next + Number(accum)
  );
  calculateResultsWithConcatenation(
    [...numbers],
    solutions,
    accum === 0 ? next * 1 : next * Number(accum)
  );
  calculateResultsWithConcatenation(
    [...numbers],
    solutions,
    accum === 0 ? next : Number(String(accum) + String(next))
  );
};

const isResultAchievable = (result, numbers) => {
  let solutions = [];
  calculateResultsWithConcatenation([...numbers], solutions, 0);

  return solutions.includes(Number(result));
};

export { isResultAchievable };
