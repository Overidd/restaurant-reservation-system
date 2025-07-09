import { Popover } from '.';

export const ColorStatus = ({
   className,
   data = []
}) => {
   return (
      <div className={`${className}`}>
         {
            data.map(({ name, color }, index) => (
               <div key={index} className={'space-x-2'}>
                  <Popover
                     trigger='hover'
                     contentClassName='z-50'
                     content={
                        <p className="bg-primary-foreground text-sm p-2">
                           {name}
                        </p>
                     }
                  >
                     <div
                        className={`w-6 h-6 rounded-full cursor-pointer inline-block align-middle ${color}`}
                     />

                  </Popover>
               </div>
            ))
         }

      </div>
   )
}
