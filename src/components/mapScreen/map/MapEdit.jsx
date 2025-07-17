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
            (resource) => resource.positionX === x && resource.positionY === y
         );

         switch (resource?.type) {
            case typeResource.OBJECT:
               for (let i = 0; i < resource.width; i++) {
                  for (let j = 0; j < resource.height; j++) {
                     occupiedCells.add(`${x + i}-${y + j}`);
                  }
               }
               return (
                  <ObjectItem
                     key={resource.id}
                     object={resource}
                     selectedObject={selectedResource}
                  />
               )
            case typeResource.TABLE:
               for (let i = 0; i < resource.width; i++) {
                  for (let j = 0; j < resource.height; j++) {
                     occupiedCells.add(`${x + i}-${y + j}`);
                  }
               }
               return (
                  <TableEditItem
                     key={resource.id}
                     table={resource}
                     onOpenEditTable={onOpenEditTable}
                     onDeleteTable={handleDeleteTable}
                     highlighted={
                        selectedResource?.id === resource?.id
                     }
                  />
               )

            default:
               return (
                  <ObjectEmpty
                     key={`empty-node-${x}-${y}`}
                     idTemp={`empty-node-${x}-${y}`}
                     onOpenCreateObj={onOpenCreateObject}
                     positionX={x}
                     positionY={y}
                     isHighlighted={
                        selectTable === resource?.id ||
                        selectedResource?.id === `empty-node-${x}-${y}`
                     }
                  />
               );
         }
      });
   };

   return (
      <>
         {paintedBoard()}
      </>
   )
}