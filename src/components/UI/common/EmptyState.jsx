import { Plus } from 'lucide-react';
import { Button } from '.';

export const EmptyState = ({
   title,
   description,
   onClick,
   buttonText,
}) => {
   return (
      <div className='text-center py-12'>
         <div className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
         <h3 className='text-lg font-semibold mb-2'>{title}</h3>
         <p className='text-muted-foreground mb-4'>{description}</p>
         <Button onClick={onClick}>
            <Plus className='w-4 h-4 mr-2' />
            {buttonText}
         </Button>
      </div>
   )
}
