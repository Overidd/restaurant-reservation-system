import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';

const colors = {
   available: 'bg-table-avaible',
   busy: 'bg-table-busy',
   selected: 'bg-table-selected',
}

const chairColors = {
   available: 'bg-table-avaible',
   busy: 'bg-table-busy',
   selected: 'bg-table-selected',
}

const tableTypes = {
   small: {
      containerSize: 'w-25 h-20',
      tableSize: 'w-16 h-12',
      maxChairs: 4,
   },
   medium: {
      containerSize: 'w-30 h-25',
      tableSize: 'w-22 h-16',
      maxChairs: 6,
   },
   big: {
      containerSize: 'w-35 h-29',
      tableSize: 'w-28 h-20',
      maxChairs: 8,
   },
}

const getChairPositions = (chairCount, type) => {
   const positions = []

   const basePositions = {
      small: [
         { top: '10%', left: '50%', transform: 'translateX(-50%)' }, // top
         { bottom: '10%', left: '50%', transform: 'translateX(-50%)' }, // bottom
         { top: '50%', left: '10%', transform: 'translateY(-50%)' }, // left
         { top: '50%', right: '10%', transform: 'translateY(-50%)' }, // right
      ],
      medium: [
         { top: '8%', left: '30%', transform: 'translateX(-50%)' }, // top-left
         { top: '8%', right: '30%', transform: 'translateX(50%)' }, // top-right
         { bottom: '8%', left: '30%', transform: 'translateX(-50%)' }, // bottom-left
         { bottom: '8%', right: '30%', transform: 'translateX(50%)' }, // bottom-right
         { top: '50%', left: '5%', transform: 'translateY(-50%)' }, // left
         { top: '50%', right: '5%', transform: 'translateY(-50%)' }, // right
      ],
      big: [
         { top: '5%', left: '25%', transform: 'translateX(-50%)' }, // top-left
         { top: '5%', left: '50%', transform: 'translateX(-50%)' }, // top-center
         { top: '5%', right: '25%', transform: 'translateX(50%)' }, // top-right
         { bottom: '5%', left: '25%', transform: 'translateX(-50%)' }, // bottom-left
         { bottom: '5%', left: '50%', transform: 'translateX(-50%)' }, // bottom-center
         { bottom: '5%', right: '25%', transform: 'translateX(50%)' }, // bottom-right
         { top: '50%', left: '3%', transform: 'translateY(-50%)' }, // left
         { top: '50%', right: '3%', transform: 'translateY(-50%)' }, // right
      ],
   }

   const availablePositions = basePositions[type] || basePositions.medium

   for (let i = 0; i < Math.min(chairCount, availablePositions.length); i++) {
      positions.push(availablePositions[i])
   }

   return positions
}

export const TableItem = ({
   className,
   style,
   onClick,
   name,
   type = 'medium',
   color = 'available',
   chairs = 2
}) => {
   const tableConfig = tableTypes[type]
   const chairPositions = getChairPositions(chairs, type)

   return (
      <div
         onClick={onClick}
         style={style}
         className={cn(
            tableConfig.containerSize,
            'relative transition-all duration-300 hover:scale-105 cursor-pointer',
            'mx-auto',
            // 'rounded-xl shadow-lg',
            // 'border-2 border-amber-200 hover:border-amber-300',
            className,
         )}
      >
         {/* Table name label */}
         {/* {name && (
            <div className='absolute -top-2 left-1/2 transform -translate-x-1/2 z-10'>
               <span className='bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm border'>
                  {name}
               </span>
            </div>
         )} */}

         {/* Table surface */}
         <div
            className={cn(
               tableConfig.tableSize,
               'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
               'rounded-xl shadow-md transition-all duration-300',
               'hover:shadow-lg z-10 pointer-events-none',
               colors[color],
               // Different shapes based on type
               type === 'small' && 'rounded-lg',
               type === 'medium' && 'rounded-xl',
               type === 'big' && 'rounded-2xl',
            )}
         >
            {/* Table surface pattern */}
            {/* <div className='absolute inset-1 rounded-lg bg-white bg-opacity-20'></div> */}

            {/* Capacity indicator */}
            <div className='absolute inset-0 flex items-center justify-center'>
               <span className='text-white font-semibold text-sm pointer-events-none'>
                  {name}
               </span>
            </div>
         </div>

         {/* Chairs */}
         {chairPositions.map((position, index) => (
            <div
               key={index}
               className={cn(
                  'absolute w-full h-full rounded-md transition-all duration-300',
                  'shadow-sm hover:shadow-md pointer-events-none',
                  chairColors[color],
                  // Chair size variations
                  type === 'small' && 'w-5 h-3',
                  type === 'medium' && 'w-6 h-4',
                  type === 'big' && 'w-7 h-5',
               )}
               style={position}
            >
               {/* Chair back */}
               {/* <div className='absolute -top-1 left-0 right-0 h-2 bg-current rounded-t-md opacity-60'></div> */}
            </div>
         ))}

         {/* Status indicator */}
         {/* <div className='absolute top-2 right-2'>
            <div
               className={cn(
                  'w-3 h-3 rounded-full border-2 border-white shadow-sm',
                  color === 'available' && 'bg-emerald-500',
                  color === 'busy' && 'bg-red-500 animate-pulse',
                  color === 'selected' && 'bg-blue-500 animate-bounce',
               )}
            ></div>
         </div> */}

         {/* Hover effect overlay */}
         <div className='absolute inset-0 rounded-xl bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
      </div>
   )
}

TableItem.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
   name: PropTypes.string,
   type: PropTypes.oneOf(['small', 'medium', 'big']),
   color: PropTypes.oneOf(['available', 'busy', 'selected']),
   chairs: PropTypes.number,
}
