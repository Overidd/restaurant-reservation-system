import { DialigDeleteObject, DialigDeleteTable } from '@/components/UI/dialog';
import { useModalAsync } from '@/hook';
import { useResource } from '@/hook/dashboard';
import { AdminTableToasts } from '@/toasts';
import { cn, typeResource } from '@/ultils';
import { useState } from 'react';
import { ObjectEditItem, ObjectEmpty, TableEditItem } from '..';

export const MapEdit = ({
   restaurant,
   resources,
   onOpenEditTable,
   onOpenCreateObject,
   selectedResource,
}) => {

   const { showAsyncModal } = useModalAsync();
   const [selectResource, setSelectResource] = useState(null);

   const {
      deleteTable,
      deleteObject,
   } = useResource();

   if (!Array.isArray(resources)) return null;

   const handleDeleteTable = async (table) => {
      setSelectResource(table.id);
      // handleSelectTable(table.id);
      const confirmed = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialigDeleteTable
            onCancel={onCancel}
            onConfirm={onConfirm}
            table={table}
         />
      ));

      if (confirmed) {
         AdminTableToasts.deleteTable(
            deleteTable({
               table,
               idTable: table?.id,
               idRestaurant: restaurant?.id
            })
         )
      }
      setSelectResource(null);
   }

   const handleDeleteObject = async (object) => {
      setSelectResource(object.id);
      const confirmed = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialigDeleteObject
            onCancel={onCancel}
            onConfirm={onConfirm}
            object={object}
         />
      ));

      if (confirmed) {
         AdminTableToasts.deleteObject(
            deleteObject({
               object,
               idObject: object?.id,
               idRestaurant: restaurant?.id
            })
         )
      }
      setSelectResource(null);
   }

   const paintedBoard = () => {
      const occupiedCells = new Set();

      return Array.from({ length: restaurant.rows * restaurant.columns }).map((_, index) => {
         const x = Math.floor(index / restaurant.columns) + 1;
         const y = (index % restaurant.columns) + 1;

         const cellKey = `${x}-${y}`;
         if (occupiedCells.has(cellKey)) return null;

         const resource = resources.find(
            (res) => res.positionX === x && res.positionY === y
         );

         // if (resource?.isCursor) return null;
         if (resource) {

            const { width = 1, height = 1, id, type } = resource;

            // Marcar todas las celdas que ocupa este recurso
            for (let dx = 0; dx < width; dx++) {
               for (let dy = 0; dy < height; dy++) {
                  occupiedCells.add(`${x + dx}-${y + dy}`);
               }
            }

            const commonStyle = {
               width: '100%',
               height: '100%',
               gridColumn: `${y} / span ${width}`,
               gridRow: `${x} / span ${height}`,
            };


            switch (type) {
               case typeResource.OBJECT:
                  return (
                     <div key={id} style={commonStyle}>
                        <ObjectEditItem
                           object={resource}
                           onDelete={handleDeleteObject}
                           // onOpenEdit={onOpenEditObject}
                           selected={selectedResource}
                           isCursorPreview={resource?.isCursor}
                           highlighted={
                              selectedResource?.id === id ||
                              selectResource === id
                           }
                        />
                     </div>
                  );

               case typeResource.TABLE:
                  return (
                     <div key={id} style={commonStyle}>
                        <TableEditItem
                           key={id}
                           table={resource}
                           onOpenEdit={onOpenEditTable}
                           onDelete={handleDeleteTable}
                           isCursorPreview={resource?.isCursor}
                           highlighted={
                              selectedResource?.id === id ||
                              selectResource === id
                           }
                        />
                     </div>
                  );
            }
         }

         return (
            <ObjectEmpty
               key={`empty-node-${x}-${y}`}
               idTemp={`empty-node-${x}-${y}`}
               onOpenCreateObject={onOpenCreateObject}
               positionX={x}
               positionY={y}
               isHighlighted={
                  selectResource === resource?.id
               }
            />
         );
      });
   };


   return (
      <>
         {paintedBoard()}
      </>
   )
}


export const RenderCursorSelect = ({ resource }) => {
   if (!resource || !resource?.isCursor) return null;

   const {
      positionX,
      positionY,
      width = 1,
      height = 1,
      rotation,
      type,
      id
   } = resource;

   return (
      <div
         key={id}
         style={{
            gridColumn: `${positionY} / span ${width}`,
            gridRow: `${positionX} / span ${height}`,
            transform: `rotate(${rotation}deg)`
         }}
         className={cn(
            'relative w-full h-full',
            'border-2 border-dashed border-primary rounded-2xl'
         )}
      >
         {/* Componente fantasma */}
         {type === typeResource.TABLE ? (
            <TableEditItem
               table={resource}
               isCursorPreview
               onOpenEditTable={() => { }}
               onDeleteTable={() => { }}
               highlighted={false}
               className="opacity-60"
            />
         ) : (
            <ObjectEditItem
               object={resource}
               isCursorPreview
               highlighted={false}
               className="opacity-60"
            />
         )}

         {/* Overlay para efecto translúcido opcional */}
         <div className="absolute inset-0 bg-background/60 rounded-2xl pointer-events-none" />
      </div>
   );
};
