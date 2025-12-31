const Bars = ({ array, currentIndices = [], swapIndices = [] }) => {
  return (
    <div className="flex items-end justify-center h-80 gap-2 bg-gray-900 p-4 rounded-xl shadow-inner">
      {array.map((value, idx) => {
        let bgColor = "bg-blue-500";

        if (currentIndices.includes(idx)) bgColor = "bg-yellow-400";
        if (swapIndices.includes(idx)) bgColor = "bg-red-500";

        return (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-xs text-gray-300 mb-1">
              {value}
            </span>

            <div
              className={`${bgColor} w-4 rounded-t-lg transition-all duration-300 shadow-lg`}
              style={{ height: `${value * 2}px` }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Bars;
