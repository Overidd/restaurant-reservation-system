import { locationData } from '@/data';

import {
   ReservationStepDate,
   ReservationStepHour,
   ReservationStepInfo
} from '@/components/reservation';

import {
   StepFormProvider,
   StepFromContextProvider
} from '@/doman/context/stepFrom';

import {
   StepForm,
   StepFormFooter,
   StepFormHeader
} from '@/components/UI/stepForm';
import { ChevronLeft } from 'lucide-react';

import {
   Button,
   ProgressBar
} from '@/components/UI/common';

const reasonData = [
   {
      id: 1,
      name: 'Cumpliaños',
   },
   {
      id: 2,
      name: 'Fiesta',
   },
   {
      id: 3,
      name: 'Otros',
   },
]

const schema = {
   info: {
      valid: {
         location: [
            (value) => locationData.some((item) => item.name === value),
            'Selecione una ubicación',
         ],
         reason: [
            (value) => reasonData.some(item => item.name === value),
            'Selecione un motivo',
         ],
         diners: [
            (value) => value > 0,
            'Selecione la cantidad de comensales',
         ]
      },
      initial: {
         location: '',
         reason: '',
         diners: 2
      }
   }
}
export const ReservationScreen = () => {
   return (
      <StepFormProvider
         className={'w-[45rem] h-[37rem] mx-auto space-y-10'}
      >
         <StepFormHeader>
            <StepFromContextProvider>
               {
                  ({ currentStepIndex }) => (
                     <h1>{currentStepIndex}</h1>
                  )
               }
            </StepFromContextProvider>
         </StepFormHeader>

         <StepForm name='info'>
            <ReservationStepInfo
               schema={schema.info}
               locationData={locationData}
               reasonData={reasonData}
            />
         </StepForm>

         <StepForm name='date'>
            <ReservationStepDate />
         </StepForm>

         <StepForm name='hour'>
            <ReservationStepHour />
         </StepForm>

         <StepFormFooter>
            <StepFromContextProvider>
               {
                  ({ prevStep, currentStepIndex }) => (
                     <div className='flex flex-col justify-between gap-4'>
                        <ProgressBar steps={3} currentStep={currentStepIndex} />
                        {currentStepIndex > 0 && (
                           <Button
                              className={'mx-auto w-10 h-10 '}
                              onClick={prevStep}
                           >
                              <ChevronLeft />
                           </Button>
                        )}
                     </div>
                  )
               }
            </StepFromContextProvider>
         </StepFormFooter>

      </StepFormProvider>
   )
}