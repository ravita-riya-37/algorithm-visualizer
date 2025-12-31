export function mergeSortSteps(arr) {
  let a = [...arr];
  let steps = [];
  let comparisons = 0, swaps = 0;

  function mergeSort(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    mergeSort(l, m);
    mergeSort(m + 1, r);
    merge(l, m, r);
  }

  function merge(l, m, r) {
    let left = a.slice(l, m + 1);
    let right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      comparisons++;
      steps.push({
        type: "compare",
        indices: [k],
        stats: { comparisons, swaps }
      });

      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
        swaps++;
      }

      steps.push({
        type: "swap",
        array: [...a],
        indices: [k - 1],
        stats: { comparisons, swaps }
      });
    }

    while (i < left.length) {
      a[k++] = left[i++];
      swaps++;
      steps.push({
        type: "swap",
        array: [...a],
        indices: [k - 1],
        stats: { comparisons, swaps }
      });
    }

    while (j < right.length) {
      a[k++] = right[j++];
      swaps++;
      steps.push({
        type: "swap",
        array: [...a],
        indices: [k - 1],
        stats: { comparisons, swaps }
      });
    }
  }

  mergeSort(0, a.length - 1);
  return steps;
}
