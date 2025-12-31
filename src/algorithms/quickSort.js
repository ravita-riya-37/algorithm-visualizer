export function quickSortSteps(arr) {
  let a = [...arr];
  let steps = [];
  let comparisons = 0, swaps = 0;

  function quick(l, r) {
    if (l >= r) return;
    let p = partition(l, r);
    quick(l, p - 1);
    quick(p + 1, r);
  }

  function partition(l, r) {
    let pivot = a[r];
    let i = l;

    for (let j = l; j < r; j++) {
      comparisons++;
      steps.push({
        type: "compare",
        indices: [j, r],
        stats: { comparisons, swaps }
      });

      if (a[j] < pivot) {
        swaps++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({
          type: "swap",
          indices: [i, j],
          array: [...a],
          stats: { comparisons, swaps }
        });
        i++;
      }
    }
    swaps++;
    [a[i], a[r]] = [a[r], a[i]];
    steps.push({
      type: "swap",
      indices: [i, r],
      array: [...a],
      stats: { comparisons, swaps }
    });
    return i;
  }

  quick(0, a.length - 1);
  return steps;
}
