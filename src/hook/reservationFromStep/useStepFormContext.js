import { useContext } from 'react';

import { StepFromContext } from '@/doman/context/stepFrom';


/**
 * 
 * @returns {{isStepValid:Function,currentStepIndex: number, direction:string,nextStep:Function,prevStep:Function,resetStep:Function, form:{onInputChange:Function, onResetForm:Function, onSubmitForm:Function, onInitialFrom:Function, validateForm:Function, formState: object, formValidation: object}, stateForm: object, stepNames: Array<string>}}
 */
export const useStepFormContext = () => {
   const context = useContext(StepFromContext)
   if (!context) {
      throw new Error('StepFromContext must be used within a MultiStepForm');
   }

   return context.multiStepForm
}