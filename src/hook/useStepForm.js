import { useCallback, useState } from 'react';

/**
 * @param {{ stepNames: string[] }} param0 
 * @returns 
 */
export const useStepForm = ({ stepNames }) => {
   const [currentStepIndex, setCurrentStepIndex] = useState(0);
   const [direction, setDirection] = useState();  //'forward' | 'backward'

   const nextStep = useCallback(() => {
      if (currentStepIndex < stepNames.length - 1) {
         setDirection('forward');
         setCurrentStepIndex((prev) => prev + 1);
      }
   }, [currentStepIndex, stepNames.length]);

   const prevStep = useCallback(() => {
      if (currentStepIndex > 0) {
         setDirection('backward');
         setCurrentStepIndex((prev) => prev - 1);
      }
   }, [currentStepIndex]);

   const goToStep = useCallback((index) => {
      if (index >= 0 && index < stepNames.length) {
         setDirection(index > currentStepIndex ? 'forward' : 'backward');
         setCurrentStepIndex(index);
      }
   }, [stepNames.length, currentStepIndex]);

   return {
      currentStepIndex,
      direction,
      nextStep,
      prevStep,
      goToStep,
   }
}