export function selectionSortSteps(arr) {
  let a = [...arr];
  let steps = [];
  let comparisons = 0, swaps = 0;

  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      comparisons++;
      steps.push({
        type: "compare",
        indices: [min, j],
        stats: { comparisons, swaps }
      });

      if (a[j] < a[min]) min = j;
    }

    if (min !== i) {
      swaps++;
      [a[i], a[min]] = [a[min], a[i]];
      steps.push({
        type: "swap",
        indices: [i, min],
        array: [...a],
        stats: { comparisons, swaps }
      });
    }
  }
  return steps;
}
