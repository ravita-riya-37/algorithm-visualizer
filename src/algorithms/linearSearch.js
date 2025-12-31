export const linearSearchSteps = (arr, target, isSorted = false) => {
  let steps = [];
  let comparisons = 0;

  for (let i = 0; i < arr.length; i++) {
    comparisons++;

    steps.push({
      type: "compare",
      indices: [i],
      stats: { comparisons }
    });

    // FOUND
    if (arr[i] === target) {
      steps.push({
        result: { found: true, index: i },
        stats: { comparisons }
      });
      return steps;
    }

    // OPTIMIZATION FOR SORTED ARRAY
    if (isSorted && arr[i] > target) {
      steps.push({
        result: { found: false },
        stats: { comparisons }
      });
      return steps;
    }
  }

  steps.push({
    result: { found: false },
    stats: { comparisons }
  });

  return steps;
};
