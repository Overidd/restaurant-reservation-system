import { cn } from '@/ultils/cn';
import { Modal } from '@/components/UI/common';
import { useModalReserve } from '@/hook';

import {
   ReservationInfoTable,
   ReservationSelecTable,
   ReservationStepDate,
   ReservationStepHour,
   ReservationStepInfo,
   ReservationHeader,
   ReservationFooter,
   ReservationCard
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
            (value, state, additionalData) => additionalData.location.some((item) => item.name === value),
            'Selecione una ubicación',
            true
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
   const { isOpenModal, closeModal } = useModalReserve()

   return (
      <Modal
         isOpen={isOpenModal}
         onClose={closeModal}
         direction='left'
         preventBackdropClose={true}
         className={cn(
            'relative h-full w-fit',
            'flex flex-row justify-center gap-4',
            '-ml-3',
         )}
      >
         <ReservationCard
            className={cn(
               'transition-all',
               'w-[50rem] 2xl:w-[60rem] h-full mx-auto',
               'flex flex-col justify-between gap-4',
               'rounded-none rounded-r-2xl',
            )}
         >
            <StepFormProvider>
               <StepFormHeader>
                  <StepFromContextProvider>
                     {
                        (state) => (
                           <ReservationHeader
                              {...state}
                           />
                        )
                     }
                  </StepFromContextProvider>
               </StepFormHeader>

               <StepForm name='info'>
                  <ReservationStepInfo
                     schema={schema.info}
                     reasonData={reasonData}
                  />
               </StepForm>

               <StepForm name='date'>
                  <ReservationStepDate />
               </StepForm>

               <StepForm name='hour'>
                  <ReservationStepHour />
               </StepForm>

               <StepForm name='table'>
                  <ReservationSelecTable />
               </StepForm>

               <StepFormFooter>
                  <StepFromContextProvider>
                     {
                        (state) => (
                           <ReservationFooter
                              maxStep={3}
                              {...state}
                           />
                        )
                     }
                  </StepFromContextProvider>
               </StepFormFooter>
            </StepFormProvider>

         </ReservationCard>
         <ReservationInfoTable
            className={cn(
               'w-[20rem] h-[40rem]',
               'absolute bottom-0 -right-[22rem]',
            )}
         />
      </Modal>
   )
}