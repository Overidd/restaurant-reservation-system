import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';

export const Card2 = ({
   className,
   children,
   style
}) => {

   return (
      <div
         style={style}
         className={cn(
            // `bg-card shadow-primary`,
            // 'bg-[#fff6] shadow-xl' ,
            // 'bg-sidebar-background text-sidebar-foreground shadow-xl',
            'rounded-2xl backdrop-blur-lg',
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