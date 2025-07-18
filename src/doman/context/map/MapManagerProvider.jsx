import { MapEditManager, MapStateManager } from '@/components/mapScreen';
import { CardLoadding } from '@/components/UI/card';
import { useGenerateResources, useLoadRestaurantResource, useRestaurantUi, useStateFilterRestaurant } from '@/hook/dashboard';
import { cn } from '@/ultils';
import { Children, isValidElement, useMemo } from 'react';
import { MapManagerContext } from './MapManagerContext';


// 4 render 
export const MapManagerProvider = ({
   className,
   children
}) => {

   const {
      hours,
      restaurants,
      filter: {
         restaurant,
         dateStr,
         hour
      },
   } = useStateFilterRestaurant();

   const {
      tables,
      objects,
      isLoading,
   } = useLoadRestaurantResource({
      restaurants,
      restaurant,
      dateStr,
      hours,
      hour,
   });

   const {
      isEdit,
      isTempResourceChange,
      selectedResource,
      setSelectedResource,
      toggleIsTempResourceChange,
      updateSelectedResource,
   } = useRestaurantUi();

   const {
      resources
   } = useGenerateResources({
      isTempResourceChange,
      selectedResource,
      tables,
      objects
   });

   const mapStateManager = useMemo(() => {
      return Children.toArray(children).filter(child => isValidElement(child) && child.type === MapStateManager)
   }, [children])

   const mapEditManager = useMemo(() => {
      return Children.toArray(children).filter(child => isValidElement(child) && child.type === MapEditManager)
   }, [children])

   const colorBorder = 'bg-[#545454]'

   console.log('render MapManagerProvider');

   return (
      <MapManagerContext.Provider value={{
         isEdit,
         resources,
         selectedResource,
         setSelectedResource,
         toggleIsTempResourceChange,
         updateSelectedResource,
      }}>
         <div className={cn(
            'relative rounded-md overflow-hidden',
            'w-fit h-fit p-4',
            'bg-gray-300/10',
            isEdit && 'z-20',
            className
         )}>
            <CardLoadding
               className='w-full h-full flex items-center justify-center'
               isLodding={isLoading}
            >
               <div
                  className={cn(
                     'w-full h-full',
                     'grid items-center justify-center gap-2 overflow-auto [&::-webkit-scrollbar]:hidden'
                  )}
                  style={{
                     gridTemplateColumns: `repeat(${restaurant.columns}, 1fr)`,
                     gridTemplateRows: `repeat(${restaurant.rows}, 1fr)`,
                  }}
               >
                  {
                     isEdit
                        ? mapEditManager
                        : mapStateManager
                  }
               </div>

               {/* Top */}
               <div className='absolute left-0 top-0 h-2 w-full grid grid-cols-[40%_50%] justify-between'>
                  <div className={`w-full h-full rounded-br-lg ${colorBorder}`} />
                  <div className={`w-full h-full rounded-bl-lg ${colorBorder}`} />
               </div>

               {/* Left */}
               <div className={`absolute top-0 bottom-0 left-0 w-2 h-full ${colorBorder}`} />


               {/* Right */}
               <div className='absolute right-0 top-0 bottom-0 w-2 h-full grid grid-rows-2'>
                  <div className={`w-full h-[50%] rounded-bl-md ${colorBorder}`} />
                  <div className={`w-full h-full rounded-tl-md ${colorBorder}`} />
               </div>

               {/* Bottom */}
               <div className='absolute left-0 bottom-0 h-2 w-full grid grid-cols-[50%_40%] justify-between'>
                  <div className={`w-full h-full rounded-tr-lg ${colorBorder}`} />
                  <div className={`w-full h-full rounded-tl-lg ${colorBorder}`} />
               </div>
            </CardLoadding >
         </div>
      </MapManagerContext.Provider>
   )
}
