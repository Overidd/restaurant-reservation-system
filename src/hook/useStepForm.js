import { useCallback, useState } from 'react';

/**
 * @param {{ stepNames: string[], schema: any, form: {onInputChange: Function, onResetForm: Function, onSubmitForm: Function, onInitialFrom: Function, validateForm: Function } }} param0 
 * @returns 
 */
export const useStepForm = ({ stepNames, schema, form }) => {
   const [currentStepIndex, setCurrentStepIndex] = useState(0);
   const [direction, setDirection] = useState();  //'forward' | 'backward'

   // Validamos el paso actual
   const isStepValid = useCallback(() => {
      const currentStepName = stepNames[currentStepIndex];
      const currentStepSchema = schema[currentStepName];
      if (!currentStepSchema) return;

      form.onInitialFrom(currentStepSchema);
      return form.validateForm()

   }, [currentStepIndex, stepNames, schema, form]);


   const nextStep = useCallback((e) => {
      e.preventDefault();

      const isValid = isStepValid();

      if (!isValid) return;

      if (isValid && currentStepIndex < stepNames.length - 1) {
         setDirection('forward');
         setCurrentStepIndex((prev) => prev + 1);
      }
   }, [currentStepIndex, isStepValid, stepNames.length]);

   const prevStep = useCallback((e) => {
      e.preventDefault();
      if (currentStepIndex > 0) {
         setDirection('backward');
         setCurrentStepIndex((prev) => prev - 1);
      }
   }, [currentStepIndex]);

   const goToStep = useCallback((index) => {
      if (index >= 0 && index < stepNames.length && isStepValid()) {
         setDirection(index > currentStepIndex ? 'forward' : 'backward');
         setCurrentStepIndex(index);
      }
   }, [isStepValid, stepNames.length, currentStepIndex]);

   return {
      currentStepIndex,
      direction,
      nextStep,
      prevStep,
      goToStep,
      form,
   }
}
