import { algorithmInfo } from "../utils/algorithmInfo";

const formatTime = (time = 0) => {
  const totalMs = Math.floor(time); // 🔴 IMPORTANT FIX

  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const milliseconds = totalMs % 1000;

  return `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(3, "0")}`;
};

const Stats = ({ stats, activeAlgo }) => {
  return (
    <div className="
      mt-6 p-6
      bg-gradient-to-br from-gray-900 to-black
      rounded-2xl shadow-xl
      text-white
    ">
      <h2 className="text-xl font-bold mb-4 text-purple-400 tracking-wide">
        Live Statistics
      </h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-gray-400">Comparisons</p>
          <p className="text-lg font-semibold text-green-400">
            {stats.comparisons}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-gray-400">Swaps</p>
          <p className="text-lg font-semibold text-blue-400">
            {stats.swaps}
          </p>
        </div>
      </div>

      <div className="mt-4 bg-gray-800 rounded-lg p-3 text-sm">
        <p className="text-gray-400">Time Taken</p>
        <p className="font-mono text-purple-300">
          {formatTime(stats?.time)}
        </p>
      </div>

      {activeAlgo && (
        <>
          <hr className="my-5 border-gray-700" />

          <h2 className="text-lg font-bold text-yellow-400">
            {algorithmInfo[activeAlgo]?.name}
          </h2>

          <div className="mt-3">
            <p className="font-semibold text-gray-300 mb-1">
              Time Complexity
            </p>

            <ul className="ml-5 list-disc text-sm text-gray-400 space-y-1">
              <li>
                Best:{" "}
                <span className="text-green-400">
                  {algorithmInfo[activeAlgo]?.time.best}
                </span>
              </li>
              <li>
                Average:{" "}
                <span className="text-yellow-400">
                  {algorithmInfo[activeAlgo]?.time.average}
                </span>
              </li>
              <li>
                Worst:{" "}
                <span className="text-red-400">
                  {algorithmInfo[activeAlgo]?.time.worst}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-3 text-sm">
            <span className="font-semibold text-gray-300">
              Space Complexity:
            </span>{" "}
            <span className="text-blue-400">
              {algorithmInfo[activeAlgo]?.space}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;
