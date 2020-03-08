export const saveResult = currentResult => {
  try {
    let results = loadResults();
    if (!results) {
      results = [];
    }

    results.push(currentResult);
    const serializedResult = JSON.stringify(results);

    localStorage.setItem("results", serializedResult);
  } catch (err) {}
};

export const loadResults = () => {
  try {
    const serializedResult = localStorage.getItem("results");
    if (serializedResult === null) {
      return undefined;
    }
    return JSON.parse(serializedResult);
  } catch (err) {
    return undefined;
  }
};

export const clearResults = () => {
  localStorage.removeItem("results");
};
