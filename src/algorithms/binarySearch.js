export const binarySearchSteps = (array, target) => {
  const steps = [];
  let low = 0;
  let high = array.length - 1;
  let comparisons = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;

    steps.push({
      type: "compare",
      indices: [mid],
      stats: { comparisons, swaps: 0 }
    });

    if (array[mid] === target) {
      steps.push({
        result: { found: true, index: mid },
        stats: { comparisons }
      });
      return steps;
    }

    if (array[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  steps.push({
    result: { found: false },
    stats: { comparisons }
  });

  return steps;
};
