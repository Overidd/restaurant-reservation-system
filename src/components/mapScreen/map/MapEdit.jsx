import { DialigDeleteTable } from '@/components/UI/dialog';
import { useModalAsync } from '@/hook';
import { typeResource } from '@/ultils';
import { useState } from 'react';
import { ObjectEmpty, ObjectItem, TableEditItem } from '..';

export const MapEdit = ({
   rows,
   columns,
   resources,
   onOpenEditTable,
   onOpenCreateObject,
   selectedResource,
   onDeleteTable,
}) => {
   const { showAsyncModal } = useModalAsync();
   const [selectTable, setSelectTable] = useState(null);

   if (!Array.isArray(resources)) return null;

   const handleDeleteTable = async (table) => {
      setSelectTable(table.id);
      // handleSelectTable(table.id);
      const confirmed = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialigDeleteTable
            onCancel={onCancel}
            onConfirm={onConfirm}
            table={table}
         />
      ));

      if (confirmed) {
         onDeleteTable(table.id);
      }
      setSelectTable(null);
   }

   const paintedBoard = () => {
      const occupiedCells = new Set();

      return Array.from({ length: rows * columns }).map((_, index) => {
         const x = Math.floor(index / columns) + 1;
         const y = (index % columns) + 1;

         const cellKey = `${x}-${y}`;
         if (occupiedCells.has(cellKey)) return null;

         const resource = resources.find(
            (res) => res.positionX === x && res.positionY === y
         );

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
                        <ObjectItem
                           object={resource}
                           selectedObject={selectedResource}
                           highlighted={selectedResource?.id === id}
                        />
                     </div>
                  );

               case typeResource.TABLE:
                  return (
                     <div key={id} style={commonStyle}>
                        <TableEditItem
                           table={resource}
                           onOpenEditTable={onOpenEditTable}
                           onDeleteTable={handleDeleteTable}
                           highlighted={selectedResource?.id === id}
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
                  selectTable === resource?.id 
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