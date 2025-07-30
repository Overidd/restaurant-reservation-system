import { DialigDeleteObject, DialigDeleteTable } from '@/components/UI/dialog';
import { useModalAsync } from '@/hook/common';
import { useResource } from '@/hook/dashboard';
import { AdminTableToasts } from '@/toasts';
import { cn, typeResource } from '@/ultils';
import { useMemo, useState } from 'react';
import { ObjectEditItem, ObjectEmpty, TableEditItem } from '..';

export const MapEdit = ({
   restaurant,
   resources = [],
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


   const handleDeleteTable = useMemo(() => async (table) => {
      setSelectResource(table.id);
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
   }, [setSelectResource, showAsyncModal, deleteTable, restaurant?.id]);

   const handleDeleteObject = useMemo(() => async (object) => {
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
   }, [setSelectResource, showAsyncModal, deleteObject, restaurant?.id]);

   const paintedBoard = () => {
      const occupiedCells = new Set();
      const conflictCells = new Set();

      resources.forEach(({ positionX: row, positionY: col, width = 1, height = 1 }) => {
         for (let dr = 0; dr < width; dr++) {
            for (let dc = 0; dc < height; dc++) {
               const key = `${row + dr}.${col + dc}`;
               if (occupiedCells.has(key)) conflictCells.add(key);
               else occupiedCells.add(key);
            }
         }
      });

      return Array.from({ length: restaurant.rows * restaurant.columns }).map((_, index) => {
         const x = Math.floor(index / restaurant.columns) + 1;
         const y = (index % restaurant.columns) + 1;
         const cellKey = `${x}-${y}`;

         if (occupiedCells.has(cellKey)) return;

         // Buscar un recurso que incluya esta celda
         const resource = resources.find((res) => {
            const resX = res.positionX;
            const resY = res.positionY;
            const width = res.width ?? 1;
            const height = res.height ?? 1;

            return (
               resX <= x &&
               resX + height - 1 >= x &&
               resY <= y &&
               resY + width - 1 >= y
            );
         });

         if (resource) {
            const { width = 1, height = 1, id, type, positionX, positionY } = resource;

            // Marcar todas las celdas que ocupa este recurso
            for (let dx = 0; dx < height; dx++) {
               for (let dy = 0; dy < width; dy++) {
                  occupiedCells.add(`${positionX + dx}-${positionY + dy}`);
               }
            }

            let hasConflict = false;
            for (let dr = 0; dr < width; dr++) {
               for (let dc = 0; dc < height; dc++) {
                  if (conflictCells.has(`${x + dr}.${y + dc}`)) {
                     hasConflict = true;
                     break;
                  }
               }
            }
            const commonStyle = {
               width: '100%',
               height: '100%',
               gridColumn: `${positionY} / span ${width}`,
               gridRow: `${positionX} / span ${height}`,
            };

            switch (type) {
               case typeResource.OBJECT:
                  return (
                     <div
                        key={id}
                        style={commonStyle}
                        data-conflict={hasConflict}
                     >
                        <ObjectEditItem
                           object={resource}
                           onDelete={handleDeleteObject}
                           selected={selectedResource}
                           isCursorPreview={resource?.isCursor}
                           hasConflict={hasConflict}
                           highlighted={
                              selectedResource?.id === id ||
                              selectResource === id
                           }
                        />
                     </div>
                  );

               case typeResource.TABLE:
                  return (
                     <div
                        key={id}
                        style={commonStyle}
                        data-conflict={hasConflict}
                     >
                        <TableEditItem
                           table={resource}
                           onOpenEdit={onOpenEditTable}
                           onDelete={handleDeleteTable}
                           isCursorPreview={resource?.isCursor}
                           hasConflict={hasConflict}
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
               key={`${x}-${y}`}
               idTemp={`${x}-${y}`}
               onOpenCreateObject={onOpenCreateObject}
               positionX={x}
               positionY={y}
               isHighlighted={selectResource === resource?.id}
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



// const paintedBoard1 = () => {
//    const occupiedCells = new Set();

//    return Array.from({ length: restaurant.rows * restaurant.columns }).map((_, index) => {
//       const x = Math.floor(index / restaurant.columns) + 1;
//       const y = (index % restaurant.columns) + 1;

//       const cellKey = `${x}-${y}`;
//       if (occupiedCells.has(cellKey)) return null;

//       const resource = resources.find(
//          (res) => res.positionX === x && res.positionY === y
//       );

//       // if (resource?.isCursor) return null;
//       if (resource) {

//          const { width = 1, height = 1, id, type } = resource;

//          // Marcar todas las celdas que ocupa este recurso
//          for (let dx = 0; dx < width; dx++) {
//             for (let dy = 0; dy < height; dy++) {
//                occupiedCells.add(`${x + dx}-${y + dy}`);
//             }
//          }

//          const commonStyle = {
//             width: '100%',
//             height: '100%',
//             gridColumn: `${y} / span ${width}`,
//             gridRow: `${x} / span ${height}`,
//          };


//          switch (type) {
//             case typeResource.OBJECT:
//                return (
//                   <div key={id} style={commonStyle}>
//                      <ObjectEditItem
//                         object={resource}
//                         onDelete={handleDeleteObject}
//                         // onOpenEdit={onOpenEditObject}
//                         selected={selectedResource}
//                         isCursorPreview={resource?.isCursor}
//                         highlighted={
//                            selectedResource?.id === id ||
//                            selectResource === id
//                         }
//                      />
//                   </div>
//                );

//             case typeResource.TABLE:
//                return (
//                   <div key={id} style={commonStyle}>
//                      <TableEditItem
//                         key={id}
//                         table={resource}
//                         onOpenEdit={onOpenEditTable}
//                         onDelete={handleDeleteTable}
//                         isCursorPreview={resource?.isCursor}
//                         highlighted={
//                            selectedResource?.id === id ||
//                            selectResource === id
//                         }
//                      />
//                   </div>
//                );
//          }
//       }

//       return (
//          <ObjectEmpty
//             key={`empty-node-${x}-${y}`}
//             idTemp={`empty-node-${x}-${y}`}
//             onOpenCreateObject={onOpenCreateObject}
//             positionX={x}
//             positionY={y}
//             isHighlighted={
//                selectResource === resource?.id
//             }
//          />
//       );
//    });
// };