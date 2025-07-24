import { usePaintedGrid } from '@/hook';
import { typeResource } from '@/ultils';
import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';
import { CardTable, Table } from '.';
import { Object } from '../resource';

export const TableList = ({
   rows,
   columns,
   className,
   onChangeTable,
   isLoading = false,
   tables = []
}) => {

   // if (!Array.isArray(tables)) return null;

   const paintedBoard = usePaintedGrid({
      rows: rows,
      columns: columns,
      resources: tables,
      renderResource: (resource, style) => {
         switch (resource.type) {
            case typeResource.TABLE:
               return <div key={resource.id} style={style}>
                  <Table
                     onClick={() => onChangeTable(resource)}
                     color={resource.status}
                     size={resource?.size}
                     chairs={resource?.chairs}
                     name={resource?.name}
                     rotation={resource?.rotation}
                  />
               </div>
            case typeResource.OBJECT:
               return <div key={resource.id} style={style}>
                  <Object
                     object={resource}
                  />
               </div>
            default:
               break;
         }
      },
      renderEmptyCell: (x, y) => <div key={`empty-node-${x}-${y}`} />
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

TableList.propTypes = {
   className: PropTypes.string,
   onChangeTable: PropTypes.func,
   selectedTables: PropTypes.array,
   dataTables: PropTypes.array,
   rows: PropTypes.number,
   columns: PropTypes.number
};