import { useCallback, useState } from 'react';

/**
 * @param {{ stepNames: string[] }} param0 
 * @returns 
 */
export const useStepForm = ({ stepNames }) => {
   const [stateForm, setFormState] = useState({});
   const [currentStepIndex, setCurrentStepIndex] = useState(0);
   const [direction, setDirection] = useState();  //'forward' | 'backward'

   const setStateValue = useCallback(({ value, name }) => {
      setFormState((prev) => ({
         ...prev,
         [name]: value
      }));
   }, []);

   const nextStep = useCallback((data) => {
      if (data) {
         setStateValue(data);
      }

      if (currentStepIndex < stepNames.length - 1) {
         setDirection('forward');
         setCurrentStepIndex((prev) => prev + 1);
      }
   }, [currentStepIndex, stepNames.length, setStateValue]);

   const prevStep = useCallback(() => {

      if (currentStepIndex > 0) {
         setDirection('backward');
         setCurrentStepIndex((prev) => prev - 1);
      }
   }, [currentStepIndex,]);

   const goToStep = useCallback((index) => {
      if (index >= 0 && index < stepNames.length) {
         setDirection(index > currentStepIndex ? 'forward' : 'backward');
         setCurrentStepIndex(index);
      }
   }, [stepNames.length, currentStepIndex]);

   // Custom functions
   console.log(stepNames)

   return {
      currentStepIndex,
      stateForm,
      direction,
      nextStep,
      prevStep,
      goToStep,
      stepNames,
      setStateValue,
   }
}