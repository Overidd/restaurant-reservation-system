import { SIZETABLE } from '@/enum';

export const tablesSizeData = [
   {
      id: 'size' + 1,
      value: SIZETABLE.SMALL,
      name: 'Pequeño',
      maxChairs: 4,
      chairs: 4,
   },
   {
      id: 'size' + 2,
      value: SIZETABLE.MEDIUM,
      name: 'Mediano',
      maxChairs: 6,
      chairs: 6
   },
   {
      id: 'size' + 3,
      value: SIZETABLE.BIG,
      name: 'Grande',
      maxChairs: 8,
      chairs: 8
   }
]