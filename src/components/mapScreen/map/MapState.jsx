import { DialigCancelReserve } from '@/components/UI/dialog';
import { Object } from '@/components/UI/resource';
import { useModalAsync, usePaintedGrid } from '@/hook';
import { useReservation } from '@/hook/dashboard';
import { AdminTableToasts } from '@/toasts';
import { typeResource } from '@/ultils';
import { useState } from 'react';
import { TableItem } from '..';

export const MapState = ({
   rows,
   columns,
   resources,
   selectedResource,
   onOpenReserveTable,
}) => {
   const { showAsyncModal } = useModalAsync();
   const [highlightedTableIds, setHighlightedTableIds] = useState([]);

   const {
      cancelATablesReservation,
      cancelFullReservation,
      confirmReservation,
      releasedReservation,
   } = useReservation()

   const handleCancelReserve = async (table) => {
      const res = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialigCancelReserve
            table={table}
            onCancel={onCancel}
            onConfirm={onConfirm}
            onCancelATablesReservation={cancelATablesReservation}
            setHighlightedTableIds={setHighlightedTableIds}
         />
      ));

      if (res) {
         AdminTableToasts.cancelFullReservation(
            cancelFullReservation(res?.data)
         )
      }

      setHighlightedTableIds([]);
   }

   const handleConfirmReservation = async (table) => {
      AdminTableToasts.confirmReserve(
         confirmReservation({
            tablesReservation: table.reservation.relatedTables,
            idReservation: table.reservation.idReservation
         })
      );
   }

   const handleReleaseReservation = async (table) => {
      AdminTableToasts.releaseReserve(
         releasedReservation({
            tablesReservation: table.reservation.relatedTables,
            idReservation: table.reservation.idReservation
         })
      );
   }

   const paintedBoard = usePaintedGrid({
      rows: rows,
      columns: columns,
      resources,
      renderResource: (resource, style) => {
         switch (resource.type) {
            case typeResource.TABLE:
               return <div key={resource.id} style={style}>
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
            case typeResource.OBJECT:
               return <div key={resource.id} style={style}>
                  <Object
                     object={resource}
                  // selectedObject={selectedResource}
                  />
               </div>
            default:
               break;
         }
      },
      renderEmptyCell: (x, y) => <div key={`empty-node-${x}-${y}`} />
   })

   return (
      <>
         {paintedBoard}
      </>
   )
}

// const paintedBoard1 = () => {
//    const occupiedCells = new Set();

//    return Array.from({ length: rows * columns }).map((_, index) => {
//       const x = Math.floor(index / columns) + 1;
//       const y = (index % columns) + 1;

//       const cellKey = `${x}-${y}`;
//       if (occupiedCells.has(cellKey)) return null;

//       const resource = resources.find(
//          (res) => res.positionX === x && res.positionY === y
//       );

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
//                      <Object
//                         object={resource}
//                         selectedObject={selectedResource}
//                      />
//                   </div>
//                )
//             case typeResource.TABLE:

//                return (
//                   <div key={id} style={commonStyle}>
//                      <TableItem
//                         key={'table-' + resource.id}
//                         table={resource}
//                         onCancelReserve={handleCancelReserve}
//                         onConfirmReservation={handleConfirmReservation}
//                         onReleasedReservation={handleReleaseReservation}
//                         onOpenReserveTable={onOpenReserveTable}
//                         highlighted={
//                            highlightedTableIds.includes(resource.id) ||
//                            selectedResource?.id === resource.id
//                         }
//                      />
//                   </div>
//                )
//          }
//       }

//       return (
//          <div key={`empty-node-${x}-${y}`} />
//       );
//    });
// };