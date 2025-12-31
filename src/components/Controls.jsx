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
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95
  "
>
  Bubble
</button>

      <button onClick={startMerge} className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">Merge</button>
      <button onClick={startQuick} className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">Quick</button>
      <button onClick={startInsertion} className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">Insertion</button>
      <button onClick={startSelection} className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">Selection</button>
      <button onClick={startHeap} className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">Heap</button>

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
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">
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
    focus:shadow-lg
  "
/>

      <button onClick={startLinearSearch} className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">
        Linear Search
      </button>

      <button onClick={startBinarySearch} className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">
        Binary Search
      </button>

      {/* CONTROLS */}
      <button onClick={resetArray} className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">Reset</button>

      <button onClick={pause} className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">Pause</button>
      <button onClick={resume} className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    shadow-lg
    transition-all duration-300
    hover:from-purple-600 hover:to-blue-600
    hover:scale-105 hover:shadow-xl
    active:scale-95">Resume</button>

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
