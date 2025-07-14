import { Tooltip, TooltipContent, TooltipTrigger } from '.';

export const ColorStatus = ({
   className,
   data = []
}) => {
   return (
      <div className={`${className}`}>
         {
            data.map(({ name, color }, index) => (
               <div key={index} className={'space-x-2'}>
                  <Tooltip trigger='hover'>
                     <TooltipTrigger>
                        <div
                           className={`w-6 h-6 rounded-full cursor-pointer inline-block align-middle ${color}`}
                        />
                     </TooltipTrigger>
                     <TooltipContent className={'text-inherit'}>
                        {name}
                     </TooltipContent>
                  </Tooltip>
               </div>
            ))
         }

      </div >
   )
}
