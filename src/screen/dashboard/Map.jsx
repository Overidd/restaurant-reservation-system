import { ModalAsyncProvider } from '@/doman/context/dialogAsync';
import { MapManagerProvider } from '@/doman/context/map';
import { cn } from '@/ultils';

import {
   BackdropEdit,
   MapEditManager,
   MapStateManager,
   TableAutoFilter,
} from '@/components/mapScreen';

export const MapScreen = () => {
   return (
      <main
         className={cn(
            'mt-5 flex flex-col items-center gap-5'
         )}
      >
         <TableAutoFilter />

         <BackdropEdit />

         <ModalAsyncProvider>
            <MapManagerProvider
               className={cn(
                  'overflow-hidden mx-auto select-none',
                  'md:w-[44rem] md:h-[40rem]',
                  '2xl:w-[48rem] 2xl:h-[44rem]',
               )}
            >
               <MapStateManager />
               <MapEditManager />
            </MapManagerProvider>
         </ModalAsyncProvider>
      </main>
   )
}