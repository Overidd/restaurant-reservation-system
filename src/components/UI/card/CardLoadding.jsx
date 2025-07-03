import { LoaderCircle } from 'lucide-react';
import PropTypes from 'prop-types';

export const CardLoadding = ({
   className,
   isLodding,
   children
}) => {

   if (isLodding) return (
      <div className={`w-fit mx-auto ${className}`}>
         <LoaderCircle
            className='animate-spin'
            size={50}
            strokeWidth={3}
         />
      </div>
   );

   return children
}

CardLoadding.propTypes = {
   className: PropTypes.string,
   isLodding: PropTypes.string,
   children: PropTypes.node,
}