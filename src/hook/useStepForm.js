import { useCallback, useState } from 'react';

/**
 * @param {{ stepNames: string[] }} param0 
 * @returns 
 */
export const useStepForm = ({ stepNames }) => {
   const [stateForm, setFormState] = useState({});
   const [currentStepIndex, setCurrentStepIndex] = useState(0);
   const [direction, setDirection] = useState();  //'forward' | 'backward'

   const setStateValue = useCallback((newState) => {
      setFormState((prev) => ({
         ...prev,
         ...newState,
      }));
   }, []);

   const nextStep = useCallback(() => {
      if (currentStepIndex < stepNames.length - 1) {
         setDirection('forward');
         setCurrentStepIndex((prev) => prev + 1);
      }
   }, [currentStepIndex, stepNames.length]);

   const prevStep = useCallback((value) => {
      if (value) {
         setStateValue(value);
      }
      if (currentStepIndex > 0) {
         setDirection('backward');
         setCurrentStepIndex((prev) => prev - 1);
      }
   }, [currentStepIndex, setStateValue]);

   const goToStep = useCallback((index) => {
      if (index >= 0 && index < stepNames.length) {
         setDirection(index > currentStepIndex ? 'forward' : 'backward');
         setCurrentStepIndex(index);
      }
   }, [stepNames.length, currentStepIndex]);

   return {
      currentStepIndex,
      stateForm,
      direction,
      nextStep,
      prevStep,
      goToStep,
   }
}