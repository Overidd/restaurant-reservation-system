import { StepFormProvider, StepFromContextProvider } from '@/doman/context/stepFrom';
import { cn } from '@/ultils/cn';

import {
   ReservationFooter,
   ReservationHeader,
   ReservationSelecTable,
   ReservationStepDate,
   ReservationStepHour,
   ReservationStepInfo,
} from '@/components/reservation';
import {
   Card2
} from '@/components/UI/card';
import {
   Modal
} from '@/components/UI/common';
import {
   StepForm,
   StepFormFooter,
   StepFormHeader
} from '@/components/UI/stepForm';
import { ModalAsyncProvider } from '@/doman/context/dialogAsync';
import { useModalReserve } from '@/hook/reservationFromStep';

export const ReservationPage = () => {
   const {
      isOpenModal,
      closeModal
   } = useModalReserve()

   return (
      <Modal
         isOpen={isOpenModal}
         onClose={closeModal}
         showBtnClose={false}
         direction='left'
         preventBackdropClose={true}
         className={cn(
            'w-full h-full md:w-[50rem] md:2xl:w-[60rem]',
            'md:-ml-3',
         )}
      >
         <Card2
            className={cn(
               'w-full h-full',
               'rounded-none md:rounded-r-2xl',
            )}
         >
            <StepFormProvider
               classNameStepForm={'flex-1 h-full w-full'}
               className={cn(
                  'transition-all overflow-hidden',
                  'flex flex-col gap-3',
                  'w-full h-full',
               )}
            >
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
                  <ReservationStepInfo />
               </StepForm>

               <StepForm name='date'>
                  <ReservationStepDate />
               </StepForm>

               <StepForm name='hour'>
                  <ReservationStepHour />
               </StepForm>

               <StepForm name='table'>
                  <ModalAsyncProvider>
                     <ReservationSelecTable />
                  </ModalAsyncProvider>
               </StepForm>

               <StepFormFooter>
                  <StepFromContextProvider>
                     {
                        (state) => (
                           <ReservationFooter
                              closeModal={closeModal}
                              maxStep={3}
                              numStep={4}
                              {...state}
                           />
                        )
                     }
                  </StepFromContextProvider>
               </StepFormFooter>
            </StepFormProvider>
         </Card2>
      </Modal>

   )
}

export default ReservationPage;