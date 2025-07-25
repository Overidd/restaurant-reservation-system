import { ModalAsyncProvider } from '@/doman/context/dialogAsync'
import { useModalUser } from '@/hook/modals'
import { cn } from '@/ultils'
import { CalendarCheck, CircleUser } from 'lucide-react'
import { HistoryReservationUser, ProfileUser } from '.'
import { Card2 } from '../UI/card'
import { Modal, Tabs, TabsContent, TabsList, TabsTrigger } from '../UI/common'

export const ModalUser = () => {
   const {
      closeModal,
      isOpen,
      paramsRef,
   } = useModalUser()

   if (!isOpen) return null

   return (

      <Modal
         isOpen={isOpen}
         onClose={closeModal}
         direction='center'
         className='w-[90%] md:w-fit'
      >
         <Card2
            className={cn(
               'md:w-[35rem] h-fit md:h-[28rem] overflow-hidden'
            )}
         >
            <Tabs
               defaultValue={paramsRef}
               className='h-full'
            >
               <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger
                     value='profile'
                     className='flex items-center gap-2'
                  >
                     <CircleUser className='h-4 w-4' />
                     Editar Perfil
                  </TabsTrigger>
                  <TabsTrigger
                     value='reservations'
                     className='flex items-center gap-2'
                  >
                     <CalendarCheck className='h-4 w-4' />
                     Tus Reservas
                  </TabsTrigger>
               </TabsList>
               <ModalAsyncProvider>
                  <TabsContent
                     value='profile'
                     className='h-full'
                  >
                     <ProfileUser />
                  </TabsContent>
                  <TabsContent
                     value='reservations'
                     className='h-full'
                  >
                     <HistoryReservationUser />
                  </TabsContent>
               </ModalAsyncProvider>
            </Tabs>
         </Card2>
      </Modal>
   )
}

