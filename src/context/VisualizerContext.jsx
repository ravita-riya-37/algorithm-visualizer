import { createContext, useContext, useState } from "react";

const VisualizerContext = createContext();

export const VisualizerProvider = ({ children }) => {
  const [originalArray, setOriginalArray] = useState([
    5, 3, 8, 1, 2
  ]);

  const [speed, setSpeed] = useState(200);

  return (
    <VisualizerContext.Provider
      value={{
        originalArray,
        setOriginalArray,
        speed,
        setSpeed
      }}
    >
      {children}
    </VisualizerContext.Provider>
  );
};

export const useVisualizer = () => useContext(VisualizerContext);
