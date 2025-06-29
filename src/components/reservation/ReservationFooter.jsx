import { cn } from '@/ultils';
import PropTypes from 'prop-types';
import { ChevronLeft } from 'lucide-react';
import { Button, ProgressBar } from '../UI/common';

export const ReservationFooter = ({
   currentStepIndex,
   prevStep,
   maxStep = 3,
   numStep = 3
}) => {

   if (currentStepIndex >= maxStep) return null

   return (
      <div
         hidden={currentStepIndex >= maxStep}
         className='flex flex-col justify-between gap-4'
      >
         <ProgressBar
            steps={numStep}
            currentStep={currentStepIndex}
         />
         <Button
            onClick={prevStep}
            className={cn(
               'mx-auto w-10 h-10',
               currentStepIndex <= 0 && 'opacity-0 pointer-events-none'
            )}
         >
            <ChevronLeft />
         </Button>
      </div>
   )
}

ReservationFooter.propTypes = {
   currentStepIndex: PropTypes.number,
   prevStep: PropTypes.func,
   maxStep: PropTypes.number,
}