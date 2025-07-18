import { cn, typeResource } from '@/ultils';
import { Plus } from 'lucide-react';
import { Button } from '../../UI/common';

export const ObjectEmpty = ({
   onOpenCreateObject,
   className,
   positionX,
   positionY,
   idTemp = '',
   isHighlighted = false
}) => {

   const handleOpenCreateObj = () => {
      if (!positionX || !positionY) return

      onOpenCreateObject({
         type: typeResource.OBJECT,
         idTemp: idTemp,
         id: idTemp,
         positionX,
         positionY,
      })
   }

   return (
      <div
         className={cn(
            'w-full h-full mx-auto p-4',
            isHighlighted && 'transition-shadow rounded-2xl shadow-card',
            className,
         )}
      >
         <Button
            className={'w-full h-full'}
            onClick={handleOpenCreateObj} //
         >
            <Plus />
         </Button>
      </div>
   )
}