import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';
import { useStepForm } from '@/hook';
import { StepFromContext } from './StepFromContext';
import {
   isValidElement,
   Children,
   useMemo
} from 'react';
import {
   AnimatedStep,
   StepFormHeader,
   StepFormFooter,
   StepForm,
} from '@/components/UI/stepForm';

export const StepFormProvider = ({
   className,
   children
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
         <div
            className={cn(
               className
            )}
         >
            {header}
            <div className='relative transition-transform duration-500'>
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
            </div>
            {footer}
         </div>
      </StepFromContext.Provider>
   )
}

StepFormProvider.propTypes = {
   className: PropTypes.string,
   form: PropTypes.object,
   onSubmit: PropTypes.func,
   children: PropTypes.node,
}