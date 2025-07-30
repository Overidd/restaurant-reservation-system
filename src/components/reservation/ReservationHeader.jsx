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
   const steps = [];
   if (info && typeof info === 'object') {
      const excludedKeys = ['Motivo', 'restaurantId', 'location'];
      const infoItems = Object.entries(info)
         .map(([key, value]) => {
            let label = translation[key] ?? key;

            if (key === 'restaurant') {
               label = ''
            };

            if (key === 'diners') {
               label = Number(value) > 1 ? 'Personas' : 'Persona';
            }

            return {
               value,
               name: [label],
               icon: null,
            };
         })
         .filter(Boolean)
         .filter(({ name }) => !excludedKeys.includes(name[0]));

      steps.push(infoItems);
   }

   if (typeof date === 'string') {
      steps.push([
         {
            value: date,
            name: [translation['date'] ?? 'date'],
            icon: <Calendar />,
         },
      ]);
   }

   if (hour !== undefined && hour !== null) {
      steps.push([
         {
            value: hour,
            name: [translation['hour'] ?? 'hour'],
            icon: <Clock />,
         },
      ]);
   }

   return steps.slice(0, currentStepIndex).flat();
};

export const ReservationHeader = ({ className, date, hour: { name }, info, currentStepIndex }) => {

   if (!currentStepIndex) return null;
   const stepsHeader = buildStepArray({ info, date, hour: name, translation, currentStepIndex });

   return (
      <header
         className={cn(
            'text-primary-foreground flex flex-wrap gap-4 justify-center',
            className
         )}
      >
         <div className='flex flex-wrap gap-2'>
            {
               stepsHeader.map(({ value, name, icon }, index) => (
                  <p
                     key={'step-' + index}
                     className={cn(
                        'border border-accent-foreground/20 rounded-2xl',
                        'flex flex-row gap-2 items-center',
                        'text-sm md:text-base',
                        'px-2 py-1'
                     )}
                  >
                     {
                        value
                     }
                     {
                        icon && icon
                     }
                     {
                        !icon && <span>{name && name}</span>
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