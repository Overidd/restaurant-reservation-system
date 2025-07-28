import { cn, typeResource } from '@/ultils';
import { Plus } from 'lucide-react';
import { Button } from '../../UI/common';

export const ObjectEmpty = ({
   onOpenCreateObject,
   className,
   style,
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
         style={style}
         className={cn(
            'w-full h-full',
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