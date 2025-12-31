export function bubbleSortSteps(arr) {
  let a = [...arr];
  let steps = [];
  let comparisons = 0, swaps = 0;

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      comparisons++;
      steps.push({
        type: "compare",
        indices: [j, j + 1],
        stats: { comparisons, swaps }
      });

      if (a[j] > a[j + 1]) {
        swaps++;
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...a],
          stats: { comparisons, swaps }
        });
      }
    }
  }
  return steps;
}
