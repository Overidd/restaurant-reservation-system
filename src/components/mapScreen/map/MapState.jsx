import { DialigCancelReserve } from '@/components/UI/dialog';
import { useModalAsync } from '@/hook';
import { AdminTableToasts } from '@/toasts';
import { typeResource } from '@/ultils';
import { useState } from 'react';
import { ObjectItem, TableItem } from '..';

export const MapState = ({
   rows,
   columns,
   resources,
   onCancelFullReservation,
   onCancelATablesReservation,
   onConfirmReservation,
   onReleasedReservation,
   selectedResource,
   onOpenReserveTable,
}) => {

   const { showAsyncModal } = useModalAsync();
   const [highlightedTableIds, setHighlightedTableIds] = useState([]);

   const handleCancelReserve = async (table) => {
      const res = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialigCancelReserve
            table={table}
            onCancel={onCancel}
            onConfirm={onConfirm}
            onCancelATablesReservation={onCancelATablesReservation}
            setHighlightedTableIds={setHighlightedTableIds}
         />
      ));

      if (res) {
         AdminTableToasts.cancelFullReservation(
            onCancelFullReservation(res?.data)
         )
      }

      setHighlightedTableIds([]);
   }

   const handleConfirmReservation = async (table) => {
      AdminTableToasts.confirmReserve(
         onConfirmReservation({
            idTable: table.id,
            idReservation: table.reservation.idReservation
         })
      );
   }

   const handleReleaseReservation = async (table) => {
      AdminTableToasts.releaseReserve(
         onReleasedReservation({
            idTable: table.id,
            idReservation: table.reservation.idReservation
         })
      );
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
                  <TableItem
                     key={'table-' + resource.id}
                     table={resource}
                     onCancelReserve={handleCancelReserve}
                     onConfirmReservation={handleConfirmReservation}
                     onReleasedReservation={handleReleaseReservation}
                     onOpenReserveTable={onOpenReserveTable}
                     highlighted={
                        highlightedTableIds.includes(resource.id) ||
                        selectedResource?.id === resource.id
                     }
                  />
               )

            default:
               return (
                  <div key={`empty-node-${x}-${y}`} />
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
