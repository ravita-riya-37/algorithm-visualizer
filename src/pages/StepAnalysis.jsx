import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Bars from "../components/Bars";
import ArrayDisplay from "../components/ArrayDisplay";
import useStepManager from "../hooks/useStepManager";

import {
  bubbleSortSteps,
  insertionSortSteps,
  selectionSortSteps,
  mergeSortSteps,
  heapSortSteps,
  linearSearchSteps,
  binarySearchSteps,
} from "../algorithms";

/* ---------------- HELPERS ---------------- */

const SORT_ALGOS = ["bubble", "insertion", "selection", "merge", "heap"];
const SEARCH_ALGOS = ["linear", "binary"];

const isSortedArray = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
};

/* ---------------- COMPONENT ---------------- */

const StepAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialArray = location.state?.array || [];

  /* ARRAYS */
  const [originalArray, setOriginalArray] = useState(initialArray);
  const [displayArray, setDisplayArray] = useState(initialArray);

  /* ALGO + INPUT */
  const [selectedAlgo, setSelectedAlgo] = useState("bubble");
  const [target, setTarget] = useState("");
  const [customInput, setCustomInput] = useState("");

  /* VISUAL */
  const [currentIndices, setCurrentIndices] = useState([]);

  /* STATS */
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const {
    currentStep,
    currentStepIndex,
    nextStep,
    prevStep,
    setNewSteps,
    resetSteps,
    steps,
  } = useStepManager([]);

  /* APPLY STEP */
  useEffect(() => {
    if (!currentStep) return;

    // reset visual per step
    setCurrentIndices([]);

    if (currentStep.type === "compare") {
      setComparisons(currentStep.stats?.comparisons || comparisons + 1);
    }

    if (currentStep.type === "swap" || currentStep.type === "overwrite") {
      setDisplayArray(currentStep.array);
      setSwaps(currentStep.stats?.swaps || swaps + 1);
    }

    if (currentStep.indices) {
      setCurrentIndices(currentStep.indices);
    }
  }, [currentStep]);

  /* SET CUSTOM ARRAY */
  const applyCustomArray = () => {
    const parsed = customInput
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));

    if (!parsed.length) return;

    setOriginalArray(parsed);
    setDisplayArray(parsed);
    setCustomInput("");

    resetSteps();
    setCurrentIndices([]);
    setComparisons(0);
    setSwaps(0);
  };

  /* RESET */
  const resetAll = () => {
    resetSteps();
    setDisplayArray(originalArray);
    setCurrentIndices([]);
    setComparisons(0);
    setSwaps(0);
  };

  /* START */
  const startAlgo = () => {
    let generatedSteps = [];

    resetSteps();
    setComparisons(0);
    setSwaps(0);
    setCurrentIndices([]);

    /* -------- SORTING -------- */
    if (SORT_ALGOS.includes(selectedAlgo)) {
      const map = {
        bubble: bubbleSortSteps,
        insertion: insertionSortSteps,
        selection: selectionSortSteps,
        merge: mergeSortSteps,
        heap: heapSortSteps,
      };

      generatedSteps = map[selectedAlgo]([...displayArray]);
      setNewSteps(generatedSteps);
      return;
    }

    /* -------- SEARCHING -------- */
    if (SEARCH_ALGOS.includes(selectedAlgo)) {
      if (target === "") {
        alert("⚠️ Enter target value");
        return;
      }

      if (selectedAlgo === "binary" && !isSortedArray(displayArray)) {
        alert("⚠️ Array must be sorted for Binary Search");
        return;
      }

      if (selectedAlgo === "linear") {
        generatedSteps = linearSearchSteps(
          displayArray,
          Number(target)
        );
      }

      if (selectedAlgo === "binary") {
        generatedSteps = binarySearchSteps(
          displayArray,
          Number(target)
        );
      }

      setNewSteps(generatedSteps);
    }
  };

  
   return (
  <div className="min-h-screen px-6 py-8
    bg-gradient-to-br from-black via-gray-900 to-black
    text-white
  ">

    {/* ===== HEADER ===== */}
    <h1 className="
      text-4xl font-extrabold text-center mb-8
      bg-clip-text text-transparent
      bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500
      drop-shadow-lg
    ">
      Step-wise Analysis
    </h1>

    {/* ===== ARRAY INPUT ===== */}
    <div className="flex justify-center items-center gap-3 mb-10">
      <input
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder="5,3,8,1"
        className="
          w-56 px-4 py-2 rounded-lg
          bg-gray-800 text-white
          border border-gray-600
          focus:outline-none focus:ring-2 focus:ring-green-500
          transition
        "
      />
      <button className=" px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95" onClick={applyCustomArray}>
        Set Array
      </button>
    </div>

    {/* ===== ARRAYS ===== */}
    <button onClick={() => navigate(-1)} className=" px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">
        Back
      </button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
        <h1>Original Array</h1>
        <ArrayDisplay title="Original Array" array={originalArray} />
      </div>

      <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
        <h1>Current Array </h1>
        <ArrayDisplay title="Current Step Array" array={displayArray} />
      </div>
    </div>

    {/* ===== ALGORITHM SELECT ===== */}
    <div className="flex justify-center mb-10">
      <div className="bg-gray-900 p-5 rounded-2xl shadow-xl w-80">

        <p className="text-center mb-4 font-semibold text-green-400 tracking-wide">
          Select Algorithm
        </p>

        <select
          value={selectedAlgo}
          onChange={(e) => {
            const algo = e.target.value;
            setSelectedAlgo(algo);

            if (algo === "binary") {
              alert("⚠️ Make sure array is sorted");
            }
          }}
          className="
            w-full px-4 py-2 rounded-lg
            bg-black text-white
            border border-green-500
            focus:outline-none focus:ring-2 focus:ring-green-500
            cursor-pointer
          "
        >
          <optgroup label="Sorting">
            {SORT_ALGOS.map((a) => (
              <option key={a} value={a}>
                {a.toUpperCase()}
              </option>
            ))}
          </optgroup>

          <optgroup label="Searching">
            {SEARCH_ALGOS.map((a) => (
              <option key={a} value={a}>
                {a.toUpperCase()}
              </option>
            ))}
          </optgroup>
        </select>

        {SEARCH_ALGOS.includes(selectedAlgo) && (
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Target value"
            className="
              mt-4 w-full px-4 py-2 rounded-lg
              bg-gray-800 text-white
              border border-gray-600
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />
        )}
      </div>
    </div>

    {/* ===== CONTROLS ===== */}
    <div className="flex justify-center flex-wrap gap-4 mb-10">
      <button
        onClick={startAlgo}
        disabled={SEARCH_ALGOS.includes(selectedAlgo) && target === ""}
        className=" px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95"
      >
        Start
      </button>

      <button onClick={prevStep} className=" px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">
        Previous
      </button>

      <button onClick={nextStep} className=" px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">
        Next
      </button>

      <button onClick={resetAll} className=" px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">
        Reset
      </button>

      
    </div>

    {/* ===== VISUAL ===== */}
    <div className="bg-gray-900 rounded-2xl p-6 shadow-xl mb-6">
      <Bars
        array={displayArray}
        currentIndices={currentIndices}
        swapIndices={currentIndices}
      />
    </div>

    {/* ===== STATS ===== */}
    <div className="
      text-center mt-6
      bg-gray-900 rounded-xl p-4 shadow-lg
    ">
      <p className="text-lg font-semibold text-cyan-400 mb-1">
        Step {currentStepIndex + 1} / {steps.length}
      </p>

      <p className="text-gray-300">
        🔍 Comparisons: <span className="font-semibold">{comparisons}</span>
      </p>

      <p className="text-gray-300">
        🔁 Swaps / Overwrites: <span className="font-semibold">{swaps}</span>
      </p>
    </div>
  </div>
);
}
export default StepAnalysis;
