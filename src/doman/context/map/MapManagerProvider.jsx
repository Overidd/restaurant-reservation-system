import { MapEditManager, MapStateManager } from '@/components/mapPage';
import { CardTable } from '@/components/UI/table';
import { useGenerateResources, useLoadMapResource, useRestaurantUi, useStateFilterRestaurant } from '@/hook/dashboard';
import { cn } from '@/ultils';
import { Children, isValidElement, useMemo, useRef } from 'react';
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
   } = useLoadMapResource({
      lastParams,
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

   const cardTableRef = useRef(null);

   return (
      <MapManagerContext.Provider value={{
         isEdit,
         resources,
         cardTableRef,
         restaurant: editRestaurant,
      }}>
         <CardTable
            ref={cardTableRef}
            columns={editRestaurant.columns}
            rows={editRestaurant.rows}
            isLoading={isLoading}
            className={cn(
               isEdit && 'z-20',
               className
            )}
         >
            {isEdit
               ? mapEditManager
               : mapStateManager
            }
         </CardTable>
      </MapManagerContext.Provider>
   )
}


{/* overlay sólo en modo edición */ }
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