const Controls = ({
  startBubble,
  startMerge,
  startQuick,
  startBinarySearch,
  resetArray,

  pause,
  resume,

  speed,
  setSpeed,
  target,
  setTarget,

  customInput,
  setCustomInput,
  applyCustomArray,

  startInsertion,
  startSelection,
  startHeap,
  startLinearSearch,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">

      {/* SORTING */}
      <button
  onClick={startBubble}
  className="
    btns
  "
>
  Bubble
</button>

      <button onClick={startMerge} className="btns">Merge</button>
      <button onClick={startQuick} className="
  btns">Quick</button>
      <button onClick={startInsertion} className="
    btns">Insertion</button>
      <button onClick={startSelection} className="
    btns">Selection</button>
      <button onClick={startHeap} className="
    btns">Heap</button>

      {/* CUSTOM ARRAY */}
      <input
        type="text"
        placeholder="e.g. 5,3,8,1,2"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        className=" px-4 py-2
    rounded-xl
    bg-gray-900 text-white
    border border-gray-700
    placeholder-gray-400
    outline-none
    transition-all duration-300
    focus:border-purple-500
    focus:ring-2 focus:ring-purple-500
    focus:shadow-lg"
      />

      <button onClick={applyCustomArray} className="
    btns">
        Set Array
      </button>

      {/* SEARCH */}
     <input
  type="number"
  placeholder="Search target"
  value={target}
  onChange={(e) => setTarget(e.target.value)}
  className="
    px-4 py-2
    rounded-xl
    bg-gray-900 text-white
    border border-gray-700
    placeholder-gray-400
    outline-none
    transition-all duration-300
    focus:border-purple-500
    focus:ring-2 focus:ring-purple-500
    focus:shadow-lg"
/>

      <button onClick={startLinearSearch} className="
    btns">
        Linear Search
      </button>

      <button onClick={startBinarySearch} className="
    btns">
        Binary Search
      </button>

      {/* CONTROLS */}
      <button onClick={resetArray} className="
    btns">Reset</button>

      <button onClick={pause} className="
   btns">Pause</button>
    
      <button onClick={resume} className="
    btns">Resume</button>

      {/* SPEED */}
     
      <input
  type="range"
  min="10"
  max="200"
  value={speed}
  onChange={(e) => setSpeed(Number(e.target.value))}
  className="
    w-200 mt-2
    appearance-none
    h-2 rounded-full
    bg-gradient-to-r from-purple-600 to-blue-600
    cursor-pointer
    transition-all duration-300
  "
/>

      
    </div>
  );
};

export default Controls;
