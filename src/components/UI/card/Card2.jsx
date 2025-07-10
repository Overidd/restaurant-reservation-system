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
            vairant === 'secondary' && 'bg-[#fff6] shadow-xl',
            vairant === 'primary' && 'bg-sidebar-background backdrop-blur-lg text-sidebar-foreground shadow-xl',
            'rounded-2xl',
            'overflow-hidden',
            'p-10',
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