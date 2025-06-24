import { useContext } from 'react';
import { StepFromContext } from '@/doman/context/stepFrom';

export const useStepFormContext = () => {
   const context = useContext(StepFromContext)

   if (!context) {
      throw new Error('StepFromContext must be used within a MultiStepForm');
   }

   return context
}
