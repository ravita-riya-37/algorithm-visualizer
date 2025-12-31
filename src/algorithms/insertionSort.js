export function insertionSortSteps(arr) {
  let a = [...arr];
  let steps = [];
  let comparisons = 0, swaps = 0;

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    while (j >= 0 && a[j] > key) {
      comparisons++;
      a[j + 1] = a[j];
      swaps++;

      steps.push({
        type: "swap",
        indices: [j, j + 1],
        array: [...a],
        stats: { comparisons, swaps }
      });
      j--;
    }
    a[j + 1] = key;
  }
  return steps;
}
