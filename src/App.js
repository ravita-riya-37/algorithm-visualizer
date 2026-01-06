import { BrowserRouter, Routes, Route } from "react-router-dom";
import Visualizer from "./pages/Visualizer";
import Comparison from "./pages/Comparison";
import StepAnalysis from "./pages/StepAnalysis";


function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Visualizer />} />
          <Route path="/compare" element={<Comparison />} />
          <Route path="/step-analysis" element={<StepAnalysis />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
