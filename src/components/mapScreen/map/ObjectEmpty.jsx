import { cn } from '@/ultils';
import { Plus } from 'lucide-react';
import { Button } from '../../UI/common';

export const ObjectEmpty = ({
   onOpenCreateObj,
   className,
   positionX,
   positionY,
   idTemp = '',
   isHighlighted = false
}) => {

   const handleOpenCreateObj = () => {
      if (!positionX || !positionY) return

      onOpenCreateObj({
         positionX,
         positionY,
         id: idTemp
      })
   }

   return (
      <div
         className={cn(
            'w-fit mx-auto p-4',
            isHighlighted && 'transition-shadow rounded-2xl shadow-card',
            className,
         )}
      >
         <Button
            onClick={handleOpenCreateObj} //
         >
            <Plus />
         </Button>
      </div>
   )
}