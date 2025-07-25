import PropTypes from 'prop-types';

import { ChevronLeft } from 'lucide-react';


import { Button, ProgressBar } from '../UI/common';

export const ReservationFooter = ({
   currentStepIndex,
   prevStep,
   maxStep = 3,
   numStep = 3,
   closeModal,
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
         <div className='w-fit mx-auto space-x-4'>
            {
               !currentStepIndex <= 0 &&
               <Button
                  className={'align-middle'}
                  onClick={prevStep}
               >
                  <ChevronLeft />
               </Button>
            }
            <Button
               className={'align-middle'}
               onClick={closeModal}
            >
               Cerrar
            </Button>
         </div>
      </div>
   )
}

ReservationFooter.propTypes = {
   currentStepIndex: PropTypes.number,
   prevStep: PropTypes.func,
   maxStep: PropTypes.number,
}