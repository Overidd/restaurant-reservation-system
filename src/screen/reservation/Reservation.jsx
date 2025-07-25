import { StepFormProvider, StepFromContextProvider } from '@/doman/context/stepFrom';
import { useModalReserve } from '@/hook';
import { cn } from '@/ultils/cn';

import {
   ReservationFooter,
   ReservationHeader,
   ReservationInfoTable,
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

const reasonData = [
   {
      id: 1,
      name: 'Cumpleaños',
   },
   {
      id: 2,
      name: 'Fiesta',
   },
   {
      id: 3,
      name: 'Aniversario',
   },
   {
      id: 4,
      name: 'Otros',
   }
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
         overlayClassName='overflow-y-auto md:overflow-hidden'
         className={cn(
            // 'relative w-fit',
            'md:-ml-3 m-0 p-0',
         )}
      >
         <Card2
            className={cn(
               'w-dvw md:w-[50rem] md:2xl:w-[60rem] h-dvh',
               'rounded-none md:rounded-r-2xl',
            )}
         >
            <StepFormProvider
               classNameStepForm={'flex-1 h-full w-full'}
               className={cn(
                  'transition-all',
                  'w-full h-full',
                  'flex flex-col gap-3',
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
         <ReservationInfoTable
            className={cn(
               'w-dvw md:w-[20rem] md:h-[32rem]',
               'md:absolute md:bottom-0 md:-right-[22rem]',
            )}
         />
      </Modal>
   )
}