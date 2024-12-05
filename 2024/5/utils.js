const buildMapFromRules = (rules) => {
  const c = new Map();
  for (const rule of rules) {
    const [first, second] = rule.split("|");

    if (c.has(first)) {
      let existing = c.get(first);
      c.set(first, [...existing, second]);
    } else {
      c.set(first, [second]);
    }
  }

  return c;
};

const isUpdateCorrect = (map, updates) => {
  const alreadyProcessed = [];

  for (let update of updates) {
    const shouldBeSecond = map.get(update);
    if (!shouldBeSecond) {
      alreadyProcessed.push(update);
      continue;
    }

    let found = alreadyProcessed.filter((elem) =>
      shouldBeSecond.includes(elem)
    );

    if (found.length > 0) {
      return false;
    }

    alreadyProcessed.push(update);
  }

  return true;
};

const middleNumberFrom = (arr) => {
  const middleIndex = Math.floor(arr.length / 2);
  return arr[middleIndex];
};

export { buildMapFromRules, isUpdateCorrect, middleNumberFrom };
