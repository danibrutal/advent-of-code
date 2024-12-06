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

const isUpdateCorrect = (map, updates, debug) => {
  const alreadyProcessed = [];

  if (!updates) return false;

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
      if (debug) {
        console.log("problem", found, update, updates);
      }

      return false;
    }

    alreadyProcessed.push(update);
  }

  return true;
};

const reshuffleUpdate = (wrongUpdate, pageNumber, prevIndex, newIndex) => {
  const [removed] = wrongUpdate.splice(prevIndex, 1);

  // Insert the removed element (or pageNumber) at newIndex
  wrongUpdate.splice(newIndex, 0, pageNumber);

  return wrongUpdate;
};

const checkPageNumber = (rulesMap, i, wrongUpdate) => {
  let count = i;
  let pageNumber = wrongUpdate[count];
  let tmpIndex = -1;
  let hasChanged = false;
  while (count < wrongUpdate.length - 1) {
    let shouldGoAfter = rulesMap.get(wrongUpdate[count + 1]);
    if (!shouldGoAfter) {
      count++;
      continue;
    }

    if (shouldGoAfter.includes(pageNumber)) {
      tmpIndex = count + 1;
    }
    count++;
  }

  if (tmpIndex !== -1) {
    wrongUpdate = reshuffleUpdate(wrongUpdate, pageNumber, i, tmpIndex);
    hasChanged = true;
  }

  return [wrongUpdate, hasChanged];
};

const fixWrongUpdate = (rulesMap, wrongUpdate) => {
  let fixed = [];
  let thereAreChanges = false;

  do {
    let count = 0;
    thereAreChanges = false;
    while (count < wrongUpdate.length - 1) {
      let hasChanged = false;
      [wrongUpdate, hasChanged] = checkPageNumber(rulesMap, count, wrongUpdate);
      count++;

      if (hasChanged) {
        thereAreChanges = true;
      }
    }
  } while (thereAreChanges);

  fixed = wrongUpdate;

  return fixed;
};

const middleNumberFrom = (arr) => {
  const middleIndex = Math.floor(arr.length / 2);
  return arr[middleIndex];
};

export { buildMapFromRules, isUpdateCorrect, middleNumberFrom, fixWrongUpdate };
