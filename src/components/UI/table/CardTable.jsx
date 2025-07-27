import { cn } from '@/ultils';
import { CardLoadding } from '../card';

export const CardTable = ({
   className,
   children,
   isLoading,
   columns,
   rows,
   ref,
}) => {
   const colorBorder = 'bg-[#545454]'

   return (
      <div
         ref={ref}
         className={cn(
            'relative rounded-md',
            'w-full h-full p-4',
            'bg-gray-300/10',
            'select-none',
            className
         )}>
         <CardLoadding
            className='w-full h-full flex items-center justify-center relative'
            isLodding={isLoading}
         >
            <div
               className={cn(
                  'w-full h-full',
                  'grid gap-2 items-center justify-center overflow-auto [&::-webkit-scrollbar]:hidden'
               )}
               style={{
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gridTemplateRows: `repeat(${rows}, 1fr)`
               }}
            >
               {children}
            </div>

            {/* Top */}
            <div className='absolute left-0 top-0 h-2 w-full grid grid-cols-[40%_50%] justify-between'>
               <div className={`w-full h-full rounded-br-lg ${colorBorder}`} />
               <div className={`w-full h-full rounded-bl-lg ${colorBorder}`} />
            </div>

            {/* Left */}
            <div className={`absolute top-0 bottom-0 left-0 w-2 h-full ${colorBorder}`} />


            {/* Right */}
            <div className='absolute right-0 top-0 bottom-0 w-2 h-full grid grid-rows-2'>
               <div className={`w-full h-[50%] rounded-bl-md ${colorBorder}`} />
               <div className={`w-full h-full rounded-tl-md ${colorBorder}`} />
            </div>

            {/* Bottom */}
            <div className='absolute left-0 bottom-0 h-2 w-full grid grid-cols-[50%_40%] justify-between'>
               <div className={`w-full h-full rounded-tr-lg ${colorBorder}`} />
               <div className={`w-full h-full rounded-tl-lg ${colorBorder}`} />
            </div>
         </CardLoadding >
      </div>
   )
}
