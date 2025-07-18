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

export const tableTypeData = [
   {
      id: 'type' + 1,
      name: 'Pequeño',
      size: SIZETABLE.SMALL,
      maxChairs: 4,
      chairs: 2,
      width: 2,
      height: 2,
      rotation: 0,
   },
   {
      id: 'type' + 2,
      name: 'Mediano',
      size: SIZETABLE.MEDIUM,
      maxChairs: 6,
      chairs: 2,
      width: 2,
      height: 2,
      rotation: 0,
   },

   {
      id: 'type' + 3,
      name: 'Grande',
      size: SIZETABLE.BIG,
      maxChairs: 8,
      chairs: 2,
      width: 2,
      height: 2,
      rotation: 0,
   }
]