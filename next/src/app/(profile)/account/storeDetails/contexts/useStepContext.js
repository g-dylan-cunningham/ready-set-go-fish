import { StepContext } from "../contexts/stepContext";
import { useContext } from 'react';

export default function useStepContext() {
  const context = useContext(StepContext);

  if (!context) {
    throw Error('useStepContext must be inside its provider')
  }
  return context;
}