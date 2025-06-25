import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';

export const ReservationCard = ({
   className,
   children
}) => {

   return (
      <div
         className={cn(
            `bg-menu gradient-radial-primary`,
            'shadow-primary rounded-2xl backdrop-blur-lg',
            'flex flex-col justify-between overflow-hidden',
            ' p-10',
            className
         )}
      >
         {children}
      </div>
   )
}

ReservationCard.propTypes = {
   className: PropTypes.string,
   children: PropTypes.node
}