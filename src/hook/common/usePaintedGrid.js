import { useMemo } from 'react';


export function usePaintedGrid({
   rows,
   columns,
   resources,
   renderResource,
   renderEmptyCell,
   ignoreResource,
}) {
   return useMemo(() => {
      const occupiedCells = new Set();

      return Array.from({ length: rows * columns }).map((_, index) => {
         const x = Math.floor(index / columns) + 1;
         const y = (index % columns) + 1;
         const cellKey = `${x}-${y}`;

         if (occupiedCells.has(cellKey)) return null;

         const resource = resources.find(
            (res) => res.positionX === x && res.positionY === y
         );

         if (resource && !ignoreResource?.(resource)) {
            const width = resource.width ?? 1;
            const height = resource.height ?? 1;

            for (let dx = 0; dx < width; dx++) {
               for (let dy = 0; dy < height; dy++) {
                  occupiedCells.add(`${x + dx}-${y + dy}`);
               }
            }

            const style = {
               width: '100%',
               height: '100%',
               gridColumn: `${y} / span ${width}`,
               gridRow: `${x} / span ${height}`,
            };

            return renderResource(resource, style);
         }

         return renderEmptyCell(x, y);
      });
   }, [rows, columns, resources, renderResource, renderEmptyCell, ignoreResource]);
}
