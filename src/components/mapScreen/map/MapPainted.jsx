import { typeResource } from '@/ultils';

// interface Resource {
//   id: string;
//   type: string;
//   positionX: number;
//   positionY: number;
//   width: number;
//   height: number;
//   [key: string]: any;
// }

// interface PaintedBoardParams {
//   rows: number;
//   columns: number;
//   resources: Resource[];
//   selectedResource?: Resource | null;
//   selectTable?: string | null;

//   onOpenEditTable?: (table: Resource) => void;
//   handleDeleteTable?: (id: string) => void;
//   onOpenCreateObject?: (positionX: number, positionY: number) => void;

//   components: {
//     ObjectItem: React.ComponentType<any>;
//     TableEditItem: React.ComponentType<any>;
//     ObjectEmpty: React.ComponentType<any>;
//   };
// }

export const MapPainted = ({
   rows,
   columns,
   resources,
   selectedResource,
   selectTable,

   onOpenEditTable,
   handleDeleteTable,
   onOpenCreateObject,

   components: { ObjectItem, TableEditItem, ObjectEmpty },
}) => {
   const occupiedCells = new Set();

   return Array.from({ length: rows * columns }).map((_, index) => {
      const x = Math.floor(index / columns) + 1;
      const y = (index % columns) + 1;

      const cellKey = `${x}-${y}`;
      if (occupiedCells.has(cellKey)) return null;

      const resource = resources.find(
         (r) => r.positionX === x && r.positionY === y
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
            );

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
                  highlighted={selectedResource?.id === resource?.id}
               />
            );

         default:
            return (
               <ObjectEmpty
                  key={`empty-node-${x}-${y}`}
                  idTemp={`empty-node-${x}-${y}`}
                  onOpenCreateObj={onOpenCreateObject}
                  positionX={x}
                  positionY={y}
                  isHighlighted={
                     selectTable === resource?.id || selectedResource?.id === `empty-node-${x}-${y}`
                  }
               />
            );
      }
   });
};
