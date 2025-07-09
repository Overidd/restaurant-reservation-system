import PropTypes from 'prop-types';

import { Calendar, Clock } from 'lucide-react';

import { cn } from '@/ultils/cn';

const translation = {
   location: 'Localidad',
   reason: 'Motivo',
   diners: 'Personas',
   date: 'Fecha',
   hour: 'Hora'
}

const buildStepArray = ({ info, date, hour, translation, currentStepIndex }) => {
   const dataArray = [];

   if (info && typeof info === 'object') {
      const infoItems = Object.entries(info)
         .map(([key, value]) => ({
            value: value,
            name: [translation[key] ?? key],
            icon: null,
         }))
         .filter(({ name }) => !['Motivo', 'locationId'].includes(name[0]));

      dataArray.push(infoItems);
   }

   if (typeof date === 'string') {
      dataArray.push([
         {
            value: date,
            name: [translation['date'] ?? 'date'],
            icon: <Calendar />,
         },
      ]);
   }

   if (hour !== undefined && hour !== null) {
      dataArray.push([
         {
            value: hour,
            name: [translation['hour'] ?? 'hour'],
            icon: <Clock />,
         },
      ]);
   }
   return dataArray.slice(0, currentStepIndex).flat();
}


export const ReservationHeader = ({ className, date, hour, info, currentStepIndex }) => {
   if (!currentStepIndex) return null;
   const stepsHeader = buildStepArray({ info, date, hour, translation, currentStepIndex });

   return (
      <header
         className={cn(
            'text-white/80 flex flex-wrap gap-4 justify-center',
            className
         )}
      >
         <div className='flex flex-row gap-2'>
            {
               stepsHeader.map(({ value, name, icon }, index) => (
                  <p
                     className='flex flex-row gap-2 border border-accent-foreground/20 rounded-2xl px-2 py-1'
                     key={'step-' + index}
                  >
                     {
                        value
                     }
                     {
                        icon && icon
                     }
                     {
                        !icon && <span>{name}</span>
                     }
                  </p>
               ))
            }
         </div>

         <hr className='basis-[100%] opacity-40' />
      </header>
   )
}

ReservationHeader.propTypes = {
   className: PropTypes.string,
   date: PropTypes.string,
   hour: PropTypes.string,
   info: PropTypes.object
}