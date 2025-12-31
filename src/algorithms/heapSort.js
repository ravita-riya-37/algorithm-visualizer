export function heapSortSteps(arr) {
  let a = [...arr];
  let steps = [];
  let comparisons = 0, swaps = 0;
  let n = a.length;

  function heapify(n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n) {
      comparisons++;
      if (a[l] > a[largest]) largest = l;
    }

    if (r < n) {
      comparisons++;
      if (a[r] > a[largest]) largest = r;
    }

    if (largest !== i) {
      swaps++;
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push({
        type: "swap",
        indices: [i, largest],
        array: [...a],
        stats: { comparisons, swaps }
      });
      heapify(n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    swaps++;
    [a[0], a[i]] = [a[i], a[0]];
    steps.push({
      type: "swap",
      indices: [0, i],
      array: [...a],
      stats: { comparisons, swaps }
    });
    heapify(i, 0);
  }
  return steps;
}
