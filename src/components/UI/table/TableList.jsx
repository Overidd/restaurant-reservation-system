import { usePaintedGrid } from '@/hook/common';
import { typeResource } from '@/ultils';
import { ResourceObject } from '../resource';
import { CardTable, ResourceTable } from '.';
import { cn } from '@/ultils/cn';

export const TableList = ({
   rows,
   columns,
   className,
   onSelectTables,
   onCurrentTable,
   isLoading = false,
   resources = []
}) => {
   const paintedBoard = usePaintedGrid({
      rows: rows,
      columns: columns,
      resources: resources,
      renderResource: (resource, style) => {
         switch (resource.type) {
            case typeResource.TABLE:
               return <div
                  key={resource.id}
                  style={style}
               >
                  <ResourceTable
                     color={resource.status}
                     size={resource?.size}
                     chairs={resource?.chairs}
                     name={resource?.name}
                     rotation={resource?.rotation}
                     onClick={() =>
                        onSelectTables(resource)
                     }
                     onPreview={(e) => {
                        e.stopPropagation();
                        onCurrentTable(resource);
                     }}
                  />
               </div>
            case typeResource.OBJECT:
               return <div
                  key={resource.id}
                  style={style}
               >
                  <ResourceObject
                     object={resource}
                  />
               </div>
            default:
               break;
         }
      },
      renderEmptyCell: (x, y) =>
         <div key={`empty-node-${x}-${y}`} />
   })

   return (
      <CardTable
         columns={columns}
         rows={rows}
         isLoading={isLoading}
         className={cn(
            className
         )}
      >
         {paintedBoard}

      </CardTable>
   );
};