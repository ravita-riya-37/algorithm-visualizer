import { BrowserRouter, Routes, Route } from "react-router-dom";
import Visualizer from "./pages/Visualizer";
import Comparison from "./pages/Comparison";
import StepAnalysis from "./pages/StepAnalysis";
import { VisualizerProvider } from "./context/VisualizerContext";

function App() {
  return (
    <VisualizerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Visualizer />} />
          <Route path="/compare" element={<Comparison />} />
          <Route path="/step-analysis" element={<StepAnalysis />} />
        </Routes>
      </BrowserRouter>
    </VisualizerProvider>
  );
}

export default App;
