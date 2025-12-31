import { useState, useRef, useEffect } from "react";
import Bars from "../components/Bars";
import Stats from "../components/Stats";
import ArrayDisplay from "../components/ArrayDisplay";
import { useNavigate } from "react-router-dom";
import { useVisualizer } from "../context/VisualizerContext";
import { sleep } from "../utils/delay";

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

/* ---------------- HELPERS ---------------- */

const SORT_ALGOS = ["bubble", "merge", "quick", "insertion", "selection", "heap"];
const SEARCH_ALGOS = ["linear", "binary"];

const isSortAlgo = (a) => SORT_ALGOS.includes(a);
const isSearchAlgo = (a) => SEARCH_ALGOS.includes(a);

const isSortedArray = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
};

/* ---------------- COMPONENT ---------------- */

const VisualizerComparison = () => {
  const navigate = useNavigate();
  const { originalArray, setOriginalArray, speed } = useVisualizer();

  /* ARRAYS */
  const [arrayLeft, setArrayLeft] = useState([]);
  const [arrayRight, setArrayRight] = useState([]);

  /* VISUAL */
  const [currentLeft, setCurrentLeft] = useState([]);
  const [swapLeft, setSwapLeft] = useState([]);
  const [currentRight, setCurrentRight] = useState([]);
  const [swapRight, setSwapRight] = useState([]);

  /* STATS */
  const [statsLeft, setStatsLeft] = useState({ comparisons: 0, swaps: 0, time: 0 });
  const [statsRight, setStatsRight] = useState({ comparisons: 0, swaps: 0, time: 0 });

  /* CONTROLS */
  const [leftAlgo, setLeftAlgo] = useState("bubble");
  const [rightAlgo, setRightAlgo] = useState("quick");
  const [leftTarget, setLeftTarget] = useState("");
  const [rightTarget, setRightTarget] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [binaryWarning, setBinaryWarning] = useState("");

  /* PAUSE / STOP (SEPARATE) */
  const leftPausedRef = useRef(false);
  const rightPausedRef = useRef(false);
  const leftStopRef = useRef(false);
  const rightStopRef = useRef(false);

  /* SYNC ARRAY */
  useEffect(() => {
    if (!Array.isArray(originalArray)) return;
    setArrayLeft([...originalArray]);
    setArrayRight([...originalArray]);
  }, [originalArray]);

  /* SET ARRAY */
  const applyCustomArray = () => {
    const parsed = customInput
      .split(",")
      .map(n => Number(n.trim()))
      .filter(n => !isNaN(n));

    if (!parsed.length) return;
    setOriginalArray(parsed);
    setCustomInput("");
  };

  /* -------- PLAY STEPS (SAME AS VISUALIZER) -------- */
  const playSteps = async (
    steps,
    setArray,
    setCurrent,
    setSwap,
    setStats,
    pausedRef,
    stopRef
  ) => {
    const start = performance.now();

    for (let step of steps) {
      if (stopRef.current) return;

      while (pausedRef.current) {
        if (stopRef.current) return;
        await sleep(50);
      }

      if (step.type === "compare") {
        setCurrent(step.indices);
      }

      if (step.type === "swap") {
        setArray(step.array);
        setSwap(step.indices);
        setCurrent(step.indices);
      }

      if (step.stats) {
        setStats(step.stats);
      }

      await sleep(600 - speed);
    }

    if (!stopRef.current) {
      const end = performance.now();
      setStats(prev => ({ ...prev, time: (end - start).toFixed(2) }));
      setCurrent([]);
      setSwap([]);
    }
  };

  /* -------- START COMPARISON -------- */
  /* -------- START COMPARISON -------- */
const startComparison = () => {
  setBinaryWarning("");

  leftPausedRef.current = false;
  rightPausedRef.current = false;
  leftStopRef.current = false;
  rightStopRef.current = false;

  setStatsLeft({ comparisons: 0, swaps: 0, time: 0 });
  setStatsRight({ comparisons: 0, swaps: 0, time: 0 });

  let leftSteps = [];
  let rightSteps = [];

  // -------- LEFT --------
  if (isSortAlgo(leftAlgo)) {
    if (!isSortedArray(arrayLeft)) {
      const map = {
        bubble: bubbleSortSteps,
        merge: mergeSortSteps,
        quick: quickSortSteps,
        insertion: insertionSortSteps,
        selection: selectionSortSteps,
        heap: heapSortSteps,
      };
      leftSteps = map[leftAlgo]([...arrayLeft]);
    } // else skip left
  }

  if (isSearchAlgo(leftAlgo)) {
    if (leftAlgo === "binary" && !isSortedArray(arrayLeft)) {
      setBinaryWarning("⚠️ Array must be sorted for Binary Search (Left)");
    } else {
      leftSteps =
        leftAlgo === "linear"
          ? linearSearchSteps(arrayLeft, Number(leftTarget))
          : binarySearchSteps(arrayLeft, Number(leftTarget));
    }
  }

  // -------- RIGHT --------
  if (isSortAlgo(rightAlgo)) {
    if (!isSortedArray(arrayRight)) {
      const map = {
        bubble: bubbleSortSteps,
        merge: mergeSortSteps,
        quick: quickSortSteps,
        insertion: insertionSortSteps,
        selection: selectionSortSteps,
        heap: heapSortSteps,
      };
      rightSteps = map[rightAlgo]([...arrayRight]);
    } // else skip right
  }

  if (isSearchAlgo(rightAlgo)) {
    if (rightAlgo === "binary" && !isSortedArray(arrayRight)) {
      setBinaryWarning("⚠️ Array must be sorted for Binary Search (Right)");
    } else {
      rightSteps =
        rightAlgo === "linear"
          ? linearSearchSteps(arrayRight, Number(rightTarget))
          : binarySearchSteps(arrayRight, Number(rightTarget));
    }
  }

  // -------- PLAY STEPS --------
  if (leftSteps.length > 0) {
    playSteps(
      leftSteps,
      setArrayLeft,
      setCurrentLeft,
      setSwapLeft,
      setStatsLeft,
      leftPausedRef,
      leftStopRef
    );
  }

  if (rightSteps.length > 0) {
    playSteps(
      rightSteps,
      setArrayRight,
      setCurrentRight,
      setSwapRight,
      setStatsRight,
      rightPausedRef,
      rightStopRef
    );
  }
};

  /* RESET */
  const resetComparison = () => {
    leftStopRef.current = true;
    rightStopRef.current = true;
    leftPausedRef.current = false;
    rightPausedRef.current = false;

    setArrayLeft([...originalArray]);
    setArrayRight([...originalArray]);
    setCurrentLeft([]);
    setCurrentRight([]);
    setSwapLeft([]);
    setSwapRight([]);
    setStatsLeft({ comparisons: 0, swaps: 0, time: 0 });
    setStatsRight({ comparisons: 0, swaps: 0, time: 0 });
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-black via-gray-900 to-black text-white">

    {/* ===== HEADER ===== */}
    <h1 className="
      text-4xl font-extrabold text-center mb-8
      bg-clip-text text-transparent
      bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
      drop-shadow-lg
    ">
      Algorithm Comparison Mode
    </h1>

    {/* ===== WARNING ===== */}
    {binaryWarning && (
      <p className="
        text-center text-yellow-300 mb-6
        bg-yellow-900/30 border border-yellow-600
        rounded-xl py-3 px-5
        shadow-md
      ">
        {binaryWarning}
      </p>
    )}
<button  className="px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95" onClick={() => navigate("/")}>Back</button>
    {/* ===== ARRAYS ===== */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      
      <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
        <h2>Original Array</h2>
        <ArrayDisplay title="Original Array" array={originalArray} />
      </div>
      <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
        <h2>Left  Array</h2>
        <ArrayDisplay title="Left Array" array={arrayLeft} />
      </div>
      <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
        <h2>Right Array</h2>
        <ArrayDisplay title="Right Array" array={arrayRight} />
      </div>
    </div>

    {/* ===== CUSTOM INPUT ===== */}
    <div className="flex justify-center items-center gap-3 mb-10">
      <input
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder="5,3,8,1"
        className="
          px-4 py-2 w-56
          rounded-lg
          bg-gray-800 text-white
          border border-gray-600
          focus:outline-none focus:ring-2 focus:ring-purple-500
          transition
        "
      />
      <button className="px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-red-600 to-green-600
    shadow-lg
    transition-all duration-300
    hover:from-green-600 hover:to-red-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">Set Array</button>
    </div>
      {/* -------- ALGORITHM SELECT DROPDOWNS -------- */}
<div className="flex justify-center gap-12 mb-8">

  {/* LEFT DROPDOWN */}
  <div className="bg-gray-900 p-4 rounded-xl shadow-lg w-64">
    <p className="text-center mb-3 font-semibold text-green-400">
      Left Algorithm
    </p>

    <select
      value={leftAlgo}
      onChange={(e) => setLeftAlgo(e.target.value)}
      className="
        w-full
        px-4 py-2
        rounded-lg
        bg-black
        text-white
        border border-green-500
        focus:outline-none
        focus:ring-2 focus:ring-green-500
        cursor-pointer
      "
    >
      <optgroup label="Sorting">
        {SORT_ALGOS.map(algo => (
          <option key={algo} value={algo}>
            {algo.toUpperCase()}
          </option>
        ))}
      </optgroup>

      <optgroup label="Searching">
        {SEARCH_ALGOS.map(algo => (
          <option key={algo} value={algo}>
            {algo.toUpperCase()}
          </option>
        ))}
      </optgroup>
    </select>

    {isSearchAlgo(leftAlgo) && (
      <input
        type="number"
        value={leftTarget}
        onChange={(e) => setLeftTarget(e.target.value)}
        placeholder="Target value"
        className="
          mt-3 w-full px-3 py-2
          rounded-lg text-black
        "
      />
    )}
  </div>

  {/* RIGHT DROPDOWN */}
  <div className="bg-gray-900 p-4 rounded-xl shadow-lg w-64">
    <p className="text-center mb-3 font-semibold text-blue-400">
      Right Algorithm
    </p>

    <select
      value={rightAlgo}
      onChange={(e) => setRightAlgo(e.target.value)}
      className="
        w-full
        px-4 py-2
        rounded-lg
        bg-black
        text-white
        border border-blue-500
        focus:outline-none
        focus:ring-2 focus:ring-blue-500
        cursor-pointer
      "
    >
      <optgroup label="Sorting">
        {SORT_ALGOS.map(algo => (
          <option key={algo} value={algo}>
            {algo.toUpperCase()}
          </option>
        ))}
      </optgroup>

      <optgroup label="Searching">
        {SEARCH_ALGOS.map(algo => (
          <option key={algo} value={algo}>
            {algo.toUpperCase()}
          </option>
        ))}
      </optgroup>
    </select>

    {isSearchAlgo(rightAlgo) && (
      <input
        type="number"
        value={rightTarget}
        onChange={(e) => setRightTarget(e.target.value)}
        placeholder="Target value"
        className="
          mt-3 w-full px-3 py-2
          rounded-lg text-black
        "
      />
    )}
  </div>

</div>


      <div className="flex justify-center gap-4 mb-6">
        <button className="px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95" onClick={startComparison}>Start</button>
        <button className="px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95" onClick={() => {
          leftPausedRef.current = true;
          rightPausedRef.current = true;
        }}>Pause</button>

        <button className="px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95"  onClick={() => {
          leftPausedRef.current = false;
          rightPausedRef.current = false;
        }}>Resume</button>

        <button className="px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95"  onClick={resetComparison}>Reset</button>
        
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Bars array={arrayLeft} currentIndices={currentLeft} swapIndices={swapLeft} />
          <Stats stats={statsLeft} />
        </div>

        <div className="flex-1">
          <Bars array={arrayRight} currentIndices={currentRight} swapIndices={swapRight} />
          <Stats stats={statsRight} />
        </div>
      </div>
    </div>
  );
};

export default VisualizerComparison;
