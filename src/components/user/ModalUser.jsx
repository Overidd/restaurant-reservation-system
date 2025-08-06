import { ModalAsyncProvider } from '@/doman/context/dialogAsync'
import { useModalUser } from '@/hook/modals'
import { cn } from '@/ultils'
import { CalendarCheck, CalendarX2, CircleUser } from 'lucide-react'
import { HistoryReservationActive, HistoryReservationCancel, ProfileUser } from '.'
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
               'md:w-[38rem] h-fit md:h-[28rem] overflow-hidden'
            )}
         >
            <Tabs
               defaultValue={paramsRef}
               className='h-full'
            >
               <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger
                     value='profile'
                     className='flex items-center gap-2'
                  >
                     <CircleUser className='h-4 w-4' />
                     <span className='hidden md:inline-block'>
                        Editar Perfil
                     </span>
                  </TabsTrigger>
                  <TabsTrigger
                     value='reservationsActive'
                     className='flex items-center gap-2'
                  >
                     <CalendarCheck className='h-4 w-4' />
                     <span className='hidden md:inline-block'>
                        Reservas activas
                     </span>
                  </TabsTrigger>
                  <TabsTrigger
                     value='reservationsaCancel'
                     className='flex items-center gap-2'
                  >
                     <CalendarX2 className='h-4 w-4' />
                     <span className='hidden md:inline-block'>
                        Reservas canceladas
                     </span>
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
                     value='reservationsActive'
                     className='h-full'
                  >
                     <HistoryReservationActive />
                  </TabsContent>
                  <TabsContent
                     value='reservationsaCancel'
                     className='h-full'
                  >
                     <HistoryReservationCancel />
                  </TabsContent>
               </ModalAsyncProvider>
            </Tabs>
         </Card2>
      </Modal>
   )
}

