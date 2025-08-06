import { cn } from '@/ultils/cn';
import { CalendarClock, ImageUpscale } from 'lucide-react';
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
      tableWidth: 'clamp(40px, 50%, 80px)',
      tableHeight: 'clamp(30px, 70%, 60px)',
      chairWidth: 'clamp(12px, 40%, 24px)',
      chairHeight: 'clamp(8px, 40%, 24px)',
      rounded: 'rounded-lg',
      maxChairs: 4,
      iconWidth: 'clamp(14px, 40%, 24px)',
      iconHeight: 'clamp(14px, 40%, 24px)',
      fontSize: 'clamp(10px, 2.5vw, 12px)',
   },
   medium: {
      tableWidth: 'clamp(60px, 75%, 120px)',
      tableHeight: 'clamp(45px, 60%, 90px)',
      chairWidth: 'clamp(16px, 28%, 32px)',
      chairHeight: 'clamp(16px, 30%, 32px)',
      rounded: 'rounded-xl',
      maxChairs: 6,
      iconWidth: 'clamp(16px, 28%, 32px)',
      iconHeight: 'clamp(16px, 30%, 32px)',
      fontSize: 'clamp(12px, 3vw, 14px)',
   },
   big: {
      tableWidth: 'clamp(76px, 90%, 120px)',
      tableHeight: 'clamp(50px, 70%, 95px)',
      chairWidth: 'clamp(17px, 20%, 40px)',
      chairHeight: 'clamp(17px, 25%, 40px)',
      rounded: 'rounded-2xl',
      maxChairs: 8,
      iconWidth: 'clamp(17px, 20%, 40px)',
      iconHeight: 'clamp(17px, 25%, 40px)',
      fontSize: 'clamp(14px, 3.5vw, 16px)',
   },
}

const getChairPositions = (chairCount, size) => {
   const positions = []
   const basePositions = {
      small: [
         { top: '-20%', left: '50%', transform: 'translateX(-50%)' }, // top
         { bottom: '-20%', left: '50%', transform: 'translateX(-50%)' }, // bottom
         { top: '50%', left: '-20%', transform: 'translateY(-50%)' }, // left
         { top: '50%', right: '-20%', transform: 'translateY(-50%)' }, // right
      ],
      medium: [
         { top: '-15%', left: '30%', transform: 'translateX(-50%)' }, // top-left
         { top: '-15%', right: '30%', transform: 'translateX(50%)' }, // top-right
         { bottom: '-15%', left: '30%', transform: 'translateX(-50%)' }, // bottom-left
         { bottom: '-15%', right: '30%', transform: 'translateX(50%)' }, // bottom-right
         { top: '50%', left: '-15%', transform: 'translateY(-50%)' }, // left
         { top: '50%', right: '-15%', transform: 'translateY(-50%)' }, // right
      ],
      big: [
         { top: '-13%', left: '25%', transform: 'translateX(-50%)' }, // top-left
         { top: '-13%', left: '50%', transform: 'translateX(-50%)' }, // top-center
         { top: '-13%', right: '25%', transform: 'translateX(50%)' }, // top-right
         { bottom: '-13%', left: '25%', transform: 'translateX(-50%)' }, // bottom-left
         { bottom: '-13%', left: '50%', transform: 'translateX(-50%)' }, // bottom-center
         { bottom: '-13%', right: '25%', transform: 'translateX(50%)' }, // bottom-right
         { top: '50%', left: '-10%', transform: 'translateY(-50%)' }, // left
         { top: '50%', right: '-10%', transform: 'translateY(-50%)' }, // right
      ],
   }

   const availablePositions = basePositions[size] || basePositions.medium

   for (let i = 0; i < Math.min(chairCount, availablePositions.length); i++) {
      positions.push(availablePositions[i])
   }

   return positions
}

// interface TableItemProps {
//    className?: string
//    onClick?: () => void
//    name?: string
//    size?: 'small' | 'medium' | 'big'
//    color?: keyof typeof colors
//    user?: any
//    chairs?: number
//    rotation?: number
//    isHighlighted?: boolean
//    [key: string]: any
// }

export const Table = ({
   className,
   onClick,
   name,
   size = 'medium',
   color = 'available',
   user,
   chairs = 2,
   rotation = 0,
   isHighlighted = false,
   hasConflict = false,
   isCursorPreview = false,
   isBlockedTemp = false,
   onPreview = null,
   ...props
}) => {
   const tableConfig = tableSizes[size]
   const chairPositions = getChairPositions(chairs, size)

   return (
      <button
         tabIndex={0}
         onClick={onClick}
         className={cn(
            'relative w-full h-full min-w-[60px] min-h-[60px] ',
            'transition-all duration-300 hover:scale-105 cursor-pointer',
            isHighlighted && 'transition-shadow rounded-2xl shadow-card bg-background',
            isCursorPreview && 'opacity-60',
            hasConflict && 'bg-red-500/30',
            className,
         )}
         style={{
            transform: `rotate(${rotation}deg)`,
            // containerType: 'inline-size',
         }}
         {...props}
      >
         <div
            className={cn(
               'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
               'shadow-none',
               tableConfig?.rounded,
            )}
            style={{
               width: tableConfig?.tableWidth,
               height: tableConfig?.tableHeight,
            }}
         >
            {chairPositions.map((position, index) => (
               <div
                  key={`chair-${index}`}
                  className={cn(
                     'absolute rounded-md transition-all duration-300',
                     'bg-amber-950 pointer-events-none',
                     chairColors[color],
                  )}
                  style={{
                     width: tableConfig?.chairWidth,
                     height: tableConfig?.chairHeight,
                     ...position,
                  }}
               />
            ))}

            <div className={cn(
               'transition-all duration-300',
               'shadow-lg overflow-hidden',
               'relative h-full w-full',
               colors[color],
               tableConfig?.rounded
            )}>
               <span
                  className={cn(
                     'absolute top-1 left-0 right-0 text-center',
                     'text-white font-semibold pointer-events-none',
                     'leading-tight',
                  )}
                  style={{
                     fontSize: tableConfig?.fontSize,
                  }}
               >
                  {name}
               </span>

               {user && user.name && (
                  <UserCard
                     size={size === 'small' ? 'xs' : 'sm'}
                     user={user}
                     mustShow={['name']}
                     className={cn(
                        'pointer-events-none overflow-hidden w-full',
                        'absolute left-1 bottom-1 text-primary-foreground',
                     )}
                  />
               )}
               {
                  isBlockedTemp && (
                     <span
                        className={cn(
                           'absolute bottom-1 left-1 text-center',
                           'text-white font-semibold pointer-events-none',
                           'leading-tight',
                        )}
                        style={{
                           fontSize: tableConfig?.fontSize,
                        }}
                     >
                        <CalendarClock />
                     </span>
                  )
               }
               {onPreview && (
                  <div
                     role='button'
                     tabIndex={0}
                     onKeyDown={(e) => e.key === 'Enter' && onPreview && onPreview()}
                     onClick={onPreview}
                     className={cn(
                        'absolute bottom-2 left-2 cursor-sw-resize',
                     )}
                  >
                     <ImageUpscale
                        style={{
                           width: tableConfig?.iconWidth,
                           height: tableConfig?.iconHeight,
                        }}
                     />
                  </div>
               )}
            </div>
         </div>
      </button>
   )
}

Table.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
   name: PropTypes.string,
   size: PropTypes.oneOf(['small', 'medium', 'big']),
   color: PropTypes.oneOf(['available', 'busy', 'selected', 'blocked', 'pending', 'confirmed', 'notAvailable']),
   chairs: PropTypes.number,
   user: PropTypes.object,
   rotation: PropTypes.number,
   isHighlighted: PropTypes.bool,
}