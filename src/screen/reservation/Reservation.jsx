import { locationData } from '@/data';
import { cn } from '@/ultils/cn';

import {
   ReservationInfoTable,
   ReservationSelecTable,
   ReservationStepDate,
   ReservationStepHour,
   ReservationStepInfo,
   ReservationHeader
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
   Modal,
   ProgressBar
} from '@/components/UI/common';
import { useState } from 'react';
import { useReserve } from '@/hook';

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
   const { existSelectedTable } = useReserve()
   const [isOpen, setIsOpen] = useState(false)

   const isActive = existSelectedTable();

   const handleOnClose = () => {
      setIsOpen(false)
   }

   return (
      <>
         <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white py-3 px-4 rounded-lg"
         >
            Modal Normal
         </button>
         <Modal
            isOpen={isOpen}
            onClose={handleOnClose}
            preventBackdropClose={true}
            className='flex flex-row justify-center gap-4 relative'
         >
            <StepFormProvider
               className={cn(
                  'w-[55rem] h-[37rem] mx-auto space-y-10 transition-all',
                  isActive && '-translate-x-[11rem]'
               )}
            >
               <StepFormHeader>
                  <StepFromContextProvider>
                     {
                        ({ currentStepIndex, stateForm }) => (
                           <ReservationHeader
                              currentStepIndex={currentStepIndex}
                              {...stateForm}
                           />
                        )
                     }
                  </StepFromContextProvider>
               </StepFormHeader>

               <StepForm name='info'>
                  <ReservationStepInfo
                     name={'info'}
                     schema={schema.info}
                     locationData={locationData}
                     reasonData={reasonData}
                  />
               </StepForm>

               <StepForm name='date'>
                  <ReservationStepDate
                     name={'date'}
                  />
               </StepForm>

               <StepForm name='hour'>
                  <ReservationStepHour
                     name={'hour'}
                  />
               </StepForm>

               <StepForm name='table'>
                  <ReservationSelecTable
                     name={'table'}
                  />
               </StepForm>

               <StepFormFooter>
                  <StepFromContextProvider>
                     {
                        ({ prevStep, currentStepIndex }) => (
                           <div
                              className='flex flex-col justify-between gap-4'
                              hidden={currentStepIndex >= 2}
                           >
                              <ProgressBar steps={3} currentStep={currentStepIndex} />
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
                  </StepFromContextProvider>
               </StepFormFooter>
            </StepFormProvider>

            <ReservationInfoTable
               className={cn(
                  'w-[20rem]'
               )}
            />
         </Modal>
      </>

   )
}