import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';

export const Card2 = ({
   className,
   children,
   vairant = 'primary',
   style,
   onClick = null
}) => {
   return (
      <div
         style={style}
         onClick={onClick}
         tabIndex={0}
         role='button'
         onKeyDown={(e) => e.key === 'Enter' && onClick && onClick()}
         className={cn(
            vairant === 'secondary' && 'bg-[#fff6] shadow-xl p-10',
            vairant === 'primary' && 'bg-sidebar-background backdrop-blur-lg text-sidebar-foreground shadow-xl',
            vairant === 'dashed' && 'p-2 bg-transparent shadow-none px-4 py-3 border-2 border-dashed',
            'rounded-2xl p-5 md:p-10',
            className
         )}
      >
         {children}
      </div>
   )
}

Card2.propTypes = {
   className: PropTypes.string,
   children: PropTypes.node
}