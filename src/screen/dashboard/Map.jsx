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
                  'w-[50rem] h-[50rem] overflow-hidden mx-auto select-none',
               )}
            >
               <MapStateManager />
               <MapEditManager />
            </MapManagerProvider>
         </ModalAsyncProvider>
      </main>
   )
}