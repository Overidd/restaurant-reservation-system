import { MapEditManager, MapStateManager } from '@/components/mapScreen';
import { CardTable } from '@/components/UI/table';
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
      lastParams,
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
      lastParams,
      restaurants,
      restaurant,
      dateStr,
      hours,
      hour,
   });
   console.log(hour);
   const {
      isEdit,
      isTempResourceChange,
      selectedResource,
      tempRestaurant,
   } = useRestaurantUi();

   const {
      resources
   } = useGenerateResources({
      isTempResourceChange,
      selectedResource,
      tables,
      objects
   });

   const editRestaurant = useMemo(() => {
      if (isEdit) return { ...restaurant, ...tempRestaurant };
      return restaurant;
   }, [restaurant, isEdit, tempRestaurant]);

   const mapStateManager = useMemo(() => {
      return Children.toArray(children).filter(child => isValidElement(child) && child.type === MapStateManager)
   }, [children])

   const mapEditManager = useMemo(() => {
      return Children.toArray(children).filter(child => isValidElement(child) && child.type === MapEditManager)
   }, [children])
   return (
      <MapManagerContext.Provider value={{
         isEdit,
         resources,
         restaurant: editRestaurant
      }}>
         <CardTable
            columns={restaurant.columns}
            rows={restaurant.rows}
            isLoading={isLoading}
            className={cn(
               isEdit && 'z-20',
               className
            )}
         >
            {isEdit ? mapEditManager : mapStateManager}
            {/* overlay sólo en modo edición */}
            {/* {isEdit && (
                     <div
                        className={cn(
                           'absolute inset-0 select-none pointer-events-none z-50',
                           'grid items-center justify-center gap-2'
                        )}
                        style={{
                           gridTemplateColumns: `repeat(${restaurant.columns}, 1fr)`,
                           gridTemplateRows: `repeat(${restaurant.rows}, 1fr)`
                        }}
                     >
                        <RenderCursorSelect resource={selectedResource} />
                     </div>
                  )} */}
         </CardTable>
      </MapManagerContext.Provider>
   )
}
