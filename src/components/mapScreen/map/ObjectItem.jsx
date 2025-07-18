import { cn } from '@/ultils';

export const ObjectItem = ({
   object,
   selectedObject,
   highlighted = false,
}) => {

   return (
      <div
         className={cn(
            'object-cover object-center w-full h-full',
            highlighted && 'transition-shadow rounded-2xl shadow-card'
         )}
         style={{
            backgroundImage: `url(${object?.imagen})`,
            rotate: `${object.rotation}deg`,
         }}
      />
   );
};
