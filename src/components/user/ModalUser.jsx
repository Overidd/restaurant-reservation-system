import { ModalAsyncProvider } from '@/doman/context/dialogAsync'
import { useModalUser } from '@/hook/modals'
import { cn } from '@/ultils'
import { CalendarCheck, CircleUser } from 'lucide-react'
import { HistoryReservationUser, ProfileUser } from '.'
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
         className='w-[90%]'
      >
         <Tabs
            defaultValue={paramsRef}
            className={cn(
               'p-4 px-4 rounded-lg overflow-hidden',
               'md:w-[40rem] h-[40rem] bg-sidebar-background rounded-2xl'
            )}
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
                  className='space-y-6 mt-6'
               >
                  <ProfileUser />
               </TabsContent>
               <TabsContent
                  value='reservations'
                  className='h-full overflow-y-auto [&::-webkit-scrollbar]:hidden'
               >
                  <HistoryReservationUser />
               </TabsContent>
            </ModalAsyncProvider>
         </Tabs>
      </Modal>
   )
}

