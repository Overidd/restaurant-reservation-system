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
                        />
                     </div>
                  )
               case typeResource.TABLE:

                  return (
                     <div key={id} style={commonStyle}>
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
                     </div>
                  )
            }
         }

         return (
            <div key={`empty-node-${x}-${y}`} />
         );
      });
   };

   return (
      <>
         {paintedBoard()}
      </>
   )
}
