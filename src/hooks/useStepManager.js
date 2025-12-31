import { useState } from "react";

export default function useStepManager(stepsArray) {
  const [steps, setSteps] = useState(stepsArray || []); // all steps
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // current step

  // Go to next step
  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // Go to previous step
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Get current step data
  const currentStep = steps[currentStepIndex] || null;

  // Reset steps
  const resetSteps = () => {
    setCurrentStepIndex(0);
  };

  // Set new steps (for new algorithm or array)
  const setNewSteps = (newSteps) => {
    setSteps(newSteps);
    setCurrentStepIndex(0);
  };

  return {
    steps,
    currentStep,
    currentStepIndex,
    nextStep,
    prevStep,
    resetSteps,
    setNewSteps,
  };
}
