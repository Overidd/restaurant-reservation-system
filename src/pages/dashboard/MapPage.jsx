import { ModalAsyncProvider } from '@/doman/context/dialogAsync';
import { MapManagerProvider } from '@/doman/context/map';
import { cn } from '@/ultils';

import {
   BackdropEdit,
   MapEditManager,
   MapStateManager,
   TableAutoFilter,
   TableStats,
} from '@/components/mapPage';

export const MapScreen = () => {
   return (
      <main
         className={cn(
            'w-fit mx-auto',
            'mt-5 grid grid-cols-1 md:grid-cols-[auto_auto] gap-5'
         )}
      >
         <BackdropEdit
         />

         <TableStats
            className={'md:row-span-2 md:col-span-1 md:w-65 w-[90%] mx-auto !p-4'}
         />

         <TableAutoFilter
            className={'md:col-span-1 w-fit mx-auto !p-4'}
         />

         <ModalAsyncProvider>
            <MapManagerProvider
               className={cn(
                  'md:w-[44rem] md:h-[40rem]',
                  '2xl:w-[48rem] 2xl:h-[44rem]',
                  'mr-auto',
               )}
            >
               <MapStateManager />
               <MapEditManager />
            </MapManagerProvider>
         </ModalAsyncProvider>
      </main>
   )
}

export default MapScreen;