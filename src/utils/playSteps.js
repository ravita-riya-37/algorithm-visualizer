export const playSteps = async ({
  steps,
  setArray,
  setCurrentIndices,
  setSwapIndices,
  setStats,
  setTimeTaken,
  startTimeRef,
  isPausedRef,
  shouldStopRef,
  speed
}) => {

  // ⏱️ start time (same as old code logic)
  startTimeRef.current = performance.now();

  for (let step of steps) {

    if (shouldStopRef.current) return;

    while (isPausedRef.current) {
      if (shouldStopRef.current) return;
      await new Promise(r => setTimeout(r, 50));
    }

    if (step.type === "compare") {
      setCurrentIndices(step.indices);
    }
    
    if (step.type === "swap") {
      setArray(step.array);
      setSwapIndices(step.indices);
      setCurrentIndices(step.indices);
    }

    if (step.stats) {
      setStats(step.stats);
    }

    const delay = 600 - speed;
    await new Promise(r => setTimeout(r, delay));
  }

  // ⏱️ end time & calculation (same result as old code)
  if (!shouldStopRef.current) {
    const end = performance.now();
    setTimeTaken((end - startTimeRef.current).toFixed(2));
    setCurrentIndices([]);
    setSwapIndices([]);
  }
};
