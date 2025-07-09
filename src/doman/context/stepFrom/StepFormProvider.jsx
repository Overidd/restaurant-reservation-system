import {
   Children,
   isValidElement,
   useMemo
} from 'react';

import PropTypes from 'prop-types';

import { useStepForm } from '@/hook';

import {
   AnimatedStep,
   StepForm,
   StepFormFooter,
   StepFormHeader,
} from '@/components/UI/stepForm';

import { StepFromContext } from './StepFromContext';



export const StepFormProvider = ({
   children,
}) => {
   const steps = useMemo(() => {
      return Children.toArray(children).filter(child => isValidElement(child) && child.type === StepForm)
   }, [children])

   const header = useMemo(() => {
      return Children.toArray(children).find(child => isValidElement(child) && child.type === StepFormHeader)
   }, [children])

   const footer = useMemo(() => {
      return Children.toArray(children).find(child => isValidElement(child) && child.type === StepFormFooter)
   }, [children])

   const stepNames = steps.map((step) => step.props.name);
   const multiStepForm = useStepForm({ stepNames });

   return (
      <StepFromContext.Provider value={{ multiStepForm }}>
         {header}
         {steps.map((step, index) => {
            const isActive = index === multiStepForm.currentStepIndex;
            return (
               <AnimatedStep
                  key={step.props.name}
                  direction={multiStepForm.direction}
                  isActive={isActive}
                  index={index}
                  currentIndex={multiStepForm.currentStepIndex}
               >
                  {step}
               </AnimatedStep>
            );
         })}
         {footer}
      </StepFromContext.Provider>
   )
}

StepFormProvider.propTypes = {
   className: PropTypes.string,
   form: PropTypes.object,
   onSubmit: PropTypes.func,
   children: PropTypes.node,
}