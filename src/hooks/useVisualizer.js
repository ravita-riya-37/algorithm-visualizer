import { useState } from "react";
import { generateArray } from "../utils/generateArray";

export const useVisualizer = () => {
  const [array, setArray] = useState(generateArray());
  const [speed, setSpeed] = useState(50);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });
  const [originalArray, setOriginalArray] = useState(generateArray());

  const resetArray = () => {
  const newArr = generateArray();
  setArray(newArr);
  setOriginalArray(newArr);
  setStats({ comparisons: 0, swaps: 0 });
};


  return {
  array,
  setArray,
  originalArray,
  setOriginalArray,
  speed,
  setSpeed,
  stats,
  setStats,
  resetArray
};

};

