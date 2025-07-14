import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';
import { UserCard } from '../card';

const colors = {
   available: 'bg-table-avaible',
   busy: 'bg-table-busy',
   selected: 'bg-table-selected',
   blocked: 'bg-table-blocked',
   pending: 'bg-table-pending',
   confirmed: 'bg-table-confirmed',
   notAvailable: 'bg-table-notAvailable',
}

const chairColors = {
   available: 'bg-table-avaible',
   busy: 'bg-table-busy',
   selected: 'bg-table-selected',
   blocked: 'bg-table-blocked',
   pending: 'bg-table-pending',
   confirmed: 'bg-table-confirmed',
   notAvailable: 'bg-table-notAvailable',
}

const tableSizes = {
   small: {
      containerSize: 'w-26 h-23',
      tableSize: 'w-17 h-14',
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

const getChairPositions = (chairCount, size) => {
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

   const availablePositions = basePositions[size] || basePositions.medium

   for (let i = 0; i < Math.min(chairCount, availablePositions.length); i++) {
      positions.push(availablePositions[i])
   }

   return positions
}

export const TableItem = ({
   className,
   onClick,
   name,
   size = 'medium',
   color = 'available',
   user,
   chairs = 2,
   rotation = 0,
   positionX = 1,
   positionY = 1,
   width = 1,
   height = 1,
   isHighlighted = false,
   ...props
}) => {
   const tableConfig = tableSizes[size]
   const chairPositions = getChairPositions(chairs, size)
   return (
      <button
         onClick={onClick}
         className={cn(
            tableConfig.containerSize,
            'relative transition-all duration-300 hover:scale-105 cursor-pointer',
            'mx-auto',
            isHighlighted && 'transition-shadow rounded-2xl shadow-card',
            className,
         )}
         style={{
            // gridColumn: `${positionX} / span ${width}`,
            // gridRow: `${positionY} / span ${height}`,
            transform: `rotate(${rotation}deg)`
         }}
         {...props}
      >
         <div
            className={cn(
               tableConfig.tableSize,
               'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
               'rounded-xl shadow-md transition-all duration-300',
               'hover:shadow-lg z-10 pointer-events-none',
               colors[color],
               size === 'small' && 'rounded-lg',
               size === 'medium' && 'rounded-xl',
               size === 'big' && 'rounded-2xl',
            )}
         >
            <div
               className='relative h-full w-full'
            >
               <span className={cn(
                  'absolute top-2 left-0 right-0',
                  'text-white font-semibold text-sm pointer-events-none',
               )}>
                  {name}
               </span>

               {user && (
                  <UserCard
                     size={size === 'small' ? 'xs' : 'sm'}
                     user={{ ...user }}
                     mustShow={['name']}
                     className={cn(
                        'absolute left-2 bottom-2 z-11 pointer-events-none w-full',
                     )}
                  />
               )}
            </div>
         </div>

         {/* Chairs */}
         {chairPositions.map((position, index) => (
            <div
               key={'position-' + index}
               className={cn(
                  'absolute w-full h-full rounded-md transition-all duration-300',
                  'shadow-sm hover:shadow-md pointer-events-none',
                  chairColors[color],
                  // Chair size variations
                  size === 'small' && 'w-5 h-3',
                  size === 'medium' && 'w-6 h-4',
                  size === 'big' && 'w-7 h-5',
               )}
               style={position}
            />
         ))}

         {/* Status indicator */}
         {/* <div className='absolute top-2 right-2'>
            <div
               className={cn(
                  'w-3 h-3 rounded-full shadow-sm',
                  color === 'available' && 'bg-emerald-500 animate-bounce',
                  color === 'busy' && 'bg-red-500 animate-pulse',
                  color === 'selected' && 'bg-blue-500 animate-bounce',
               )}
            />
         </div> */}
         <div className='absolute inset-0 rounded-xl bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
      </button>
   )
}

TableItem.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
   name: PropTypes.string,
   size: PropTypes.oneOf(['small', 'medium', 'big']),
   color: PropTypes.oneOf(['available', 'busy', 'selected']),
   chairs: PropTypes.number,
}
