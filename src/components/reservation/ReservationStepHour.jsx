import { cn } from '@/ultils/cn';
import { ReservationTitle } from '.';
import { Button } from '../UI/common';
import { Label } from '../UI/from';

const hoursData = [
   {
      id: 1,
      hour: '12:00',
   },
   {
      id: 2,
      hour: '13:00',
   },
   {
      id: 3,
      hour: '14:00',
   },
   {
      id: 4,
      hour: '15:00',
   },
]



export const ReservationStepHour = ({ className }) => {
   return (
      <section
         className={cn(
            'w-[50%] h-full mx-auto text-center space-y-10',
            className
         )}
      >
         <Label>
            <ReservationTitle
               className={'mx-auto'}
               title={'Selecionar'}
               subtitle={'Fecha'}
            />
         </Label>

         <div className='grid grid-cols-4 gap-5'>
            {
               hoursData.map((hour) => (
                  <Button
                     type='button'
                     key={hour.id}
                  >
                     {hour.hour}
                  </Button>
               ))
            }
         </div>

      </section>
   )
}