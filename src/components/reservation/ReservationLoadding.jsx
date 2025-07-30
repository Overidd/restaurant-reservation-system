import PropTypes from 'prop-types';


export const ReservationLoadding = ({
   className,
   isLodding,
   children
}) => {

   if (isLodding) return (
      // <div className={`w-fit mx-auto ${className}`}>
      //    <LoaderCircle
      //       className='animate-spin'
      //       size={50}
      //       strokeWidth={3}
      //    />
      // </div>
      <div className={`flex items-center justify-center ${className}`}>
         <div className='text-center'>
            <div className='relative mb-8'>

               <div className='w-32 h-6 bg-gradient-to-r from-amber-900 to-amber-800 rounded-full mx-auto mb-2 shadow-lg' />

               <div className='relative flex justify-center items-end space-x-1'>

                  <div className='flame flame-1 w-8 h-16 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full animate-pulse'>
                     <div className='absolute inset-0 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-bounce delay-75' />
                  </div>

                  <div className='flame flame-2 w-10 h-20 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full animate-pulse delay-150'>
                     <div className='absolute inset-0 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-bounce delay-300' />
                  </div>

                  <div className='flame flame-3 w-8 h-16 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full animate-pulse delay-300'>
                     <div className='absolute inset-0 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-bounce delay-500' />
                  </div>

                  <div className='flame flame-4 w-6 h-12 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full animate-pulse delay-500'>
                     <div className='absolute inset-0 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-bounce delay-700' />
                  </div>
               </div>

               <div className='absolute top-0 left-1/2 transform -translate-x-1/2'>
                  <div className='spark spark-1 w-1 h-1 bg-yellow-300 rounded-full animate-ping' />
                  <div className='spark spark-2 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-300' />
                  <div className='spark spark-3 w-1 h-1 bg-red-400 rounded-full animate-ping delay-700' />
               </div>
            </div>

            {/* <div className='text-center space-y-4'>
          <div className='w-64 h-2 bg-gray-700 rounded-full mx-auto mt-6 overflow-hidden'>
            <div className='h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 rounded-full animate-pulse loading-bar' />
          </div>
        </div> */}
         </div>
      </div>
   );

   return children
}

ReservationLoadding.propTypes = {
   className: PropTypes.string,
   isLodding: PropTypes.string,
   children: PropTypes.node,
}