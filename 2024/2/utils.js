const isSafeStep = (isAscending, levels, i, j) => {
  let diff = 0;
  if (isAscending) {
    diff = levels[j] - levels[i];
  } else {
    diff = levels[i] - levels[j];
  }

  return diff > 0 && diff <= 3;
};

export const isLevelSafe = (levels) => {
  const isAscending = levels[levels.length - 1] - levels[0] > 0;

  for (let i = 0; i < levels.length - 1; i++) {
    if (!isSafeStep(isAscending, levels, i, i + 1)) {
      return false;
    }
  }

  return true;
};

// 1 2 7 8 9 unsafe
// 1 3 2 4 5 safe removing 2nd level
// 8 6 4 4 1 safe removing third level, 4
// 3 2 4 5 safe removing 1st level
export const isLevelSafeWithProblemDampener = (levels) => {
  const isAscending = levels[levels.length - 1] - levels[0] > 0;
  let unsafeLevels = 0;

  for (let i = 0; i < levels.length - 1; i++) {
    if (isSafeStep(isAscending, levels, i, i + 1)) {
      continue;
    }

    console.log("unsafe territory", levels[i], levels[i + 1]);

    // unsafe
    if (unsafeLevels > 0) {
      return false;
    }

    // it's the first one
    if (i === 0) {
      unsafeLevels = 1;
      continue;
    }

    // it's the last one
    if (i === levels.length - 2 && unsafeLevels === 0) {
      continue;
    }

    // in the middle
    // 1 2 7 8 9 unsafe
    // 1 3 2 4 5 safe removing 2nd
    if (!isSafeStep(isAscending, levels, i - 1, i + 1)) {
      return false;
    }
    unsafeLevels++;
  }

  return true;
};
