import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';

export const Card2 = ({
   className,
   children,
   vairant = 'primary',
   style
}) => {
   return (
      <div
         style={style}
         className={cn(
            vairant === 'secondary' && 'bg-[#fff6] shadow-xl p-10',
            vairant === 'primary' && 'bg-sidebar-background backdrop-blur-lg text-sidebar-foreground shadow-xl',
            'rounded-2xl p-10',
            vairant === 'dashed' && 'p-2 bg-transparent shadow-none px-4 py-3 border-2 border-dashed',
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