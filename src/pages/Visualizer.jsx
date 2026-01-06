import { useState, useRef, useEffect } from "react";
import Bars from "../components/Bars";
import Controls from "../components/Controls";
import Stats from "../components/Stats";
import ArrayDisplay from "../components/ArrayDisplay";
import { useNavigate } from "react-router-dom";
import { playSteps } from "../utils/playSteps";
import {
  bubbleSortSteps,
  mergeSortSteps,
  quickSortSteps,
  insertionSortSteps,
  selectionSortSteps,
  heapSortSteps,
  linearSearchSteps,
  binarySearchSteps,
} from "../algorithms";

/* CHECK SORTED */
const isSortedArray = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
};

const Visualizer = () => {
  const navigate = useNavigate();

  /* ARRAYS */
  const [originalArray, setOriginalArray] = useState([]);
  const [array, setArray] = useState([]);

  /* VISUAL */
  const [currentIndices, setCurrentIndices] = useState([]);
  const [swapIndices, setSwapIndices] = useState([]);

  /* CONTROLS */
  const [speed, setSpeed] = useState(200);
  const [target, setTarget] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [activeAlgo, setActiveAlgo] = useState(null);

  /* STATS + TIME */
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });
  const [timeTaken, setTimeTaken] = useState(0);
  const startTimeRef = useRef(null);

  /* PAUSE + STOP */
  const isPausedRef = useRef(false);
  const shouldStopRef = useRef(false);

  /* GENERATE ARRAY */
  const generateArray = () => {
    const arr = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100)
    );
    setOriginalArray(arr);
    setArray(arr);
  };

  useEffect(() => {
    generateArray();
  }, []);

  /* RESET */
  const resetArray = () => {
    shouldStopRef.current = true;
    isPausedRef.current = false;

    setArray([...originalArray]);
    setCurrentIndices([]);
    setSwapIndices([]);
    setStats({ comparisons: 0, swaps: 0 });
    setTimeTaken(0);
    setActiveAlgo(null);
  };

  /* CUSTOM ARRAY */
  const applyCustomArray = () => {
    const parsed = customInput
      .split(",")
      .map(n => Number(n.trim()))
      .filter(n => !isNaN(n));

    if (!parsed.length) return;

    shouldStopRef.current = true;
    isPausedRef.current = false;

    setOriginalArray(parsed);
    setArray(parsed);
    setCustomInput("");
    setTimeTaken(0);
  };

  /* PAUSE / RESUME */
  const pause = () => (isPausedRef.current = true);
  const resume = () => (isPausedRef.current = false);

  /* START ALGORITHM */
  const startAlgorithm = (algo) => {
    shouldStopRef.current = false;
    isPausedRef.current = false;

    const isSortingAlgo =
      ["bubble", "insertion", "selection", "merge", "quick", "heap"].includes(algo);

    if (isSortingAlgo && isSortedArray(array)) {
      alert("✅ Array is already sorted");
      return;
    }

    if ((algo === "linear" || algo === "binary") && target === "") {
      alert("⚠️ Please enter target element");
      return;
    }

    if (algo === "binary" && !isSortedArray(array)) {
      alert("⚠️ Array must be sorted for Binary Search");
      return;
    }

    setStats({ comparisons: 0, swaps: 0 });
    setTimeTaken(0);
    setActiveAlgo(algo);
    startTimeRef.current = performance.now();

    let steps = [];

    if (algo === "bubble") steps = bubbleSortSteps(array);
    else if (algo === "merge") steps = mergeSortSteps(array);
    else if (algo === "quick") steps = quickSortSteps(array);
    else if (algo === "insertion") steps = insertionSortSteps(array);
    else if (algo === "selection") steps = selectionSortSteps(array);
    else if (algo === "heap") steps = heapSortSteps(array);
    else if (algo === "linear")
      steps = linearSearchSteps(array, Number(target), isSortedArray(array));
    else if (algo === "binary")
      steps = binarySearchSteps(array, Number(target));

    playSteps({
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
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-8">

      {/* 🔥 PROJECT HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-wide text-green-400">
          Algorithm Visualizer
        </h1>
        <p className="text-gray-400 mt-2">
          Sorting & Searching Algorithms with Live Visualization
        </p>
      </div>

      {/* 🔗 NAVIGATION */}
      <div className="flex justify-center gap-4 mb-6">
        <button className="btns" onClick={() => navigate("/compare",{ state: { array } })}>
          Comparison Mode
        </button>
        <button
          className="btns"
          onClick={() => navigate("/step-analysis", { state: { array } })}
        >
          Step-wise Analysis
        </button>
      </div>

      {/* 📦 ARRAY DISPLAY */}
   
      {/* 🎛 CONTROLS */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg mb-6">
        <Controls
          startBubble={() => startAlgorithm("bubble")}
          startMerge={() => startAlgorithm("merge")}
          startQuick={() => startAlgorithm("quick")}
          startInsertion={() => startAlgorithm("insertion")}
          startSelection={() => startAlgorithm("selection")}
          startHeap={() => startAlgorithm("heap")}
          startLinearSearch={() => startAlgorithm("linear")}
          startBinarySearch={() => startAlgorithm("binary")}
          resetArray={resetArray}
          pause={pause}
          resume={resume}
          speed={speed}
          setSpeed={setSpeed}
          target={target}
          setTarget={setTarget}
          customInput={customInput}
          setCustomInput={setCustomInput}
          applyCustomArray={applyCustomArray}
        />
      </div>
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-xl mb-6">

  {/* 🔹 ORIGINAL ARRAY */}
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-green-400 mb-2 tracking-wide">
      Original Array
    </h2>

    <div className="bg-gray-800 rounded-xl p-4 shadow-inner">
      <ArrayDisplay title="" array={originalArray} />
    </div>
  </div>

  {/* 🔹 CURRENT ARRAY */}
  <div>
    <h2 className="text-lg font-semibold text-blue-400 mb-2 tracking-wide">
      Current Array
    </h2>

    <div className="bg-gray-800 rounded-xl p-4 shadow-inner">
      <ArrayDisplay title="" array={array} />
    </div>
  </div>

</div>



      {/* 📊 VISUAL + STATS */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <Bars
          array={array}
          currentIndices={currentIndices}
          swapIndices={swapIndices}
        />
        <Stats stats={stats} activeAlgo={activeAlgo}/>
      </div>
    </div>
  );
};

export default Visualizer;
