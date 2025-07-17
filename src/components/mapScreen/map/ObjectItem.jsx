import { cn } from '@/ultils';

export const ObjectItem = ({
   object,
   selectedObject,
}) => {

   return (
      <div
         key={object.id}
         className={cn(
            'object-cover object-center w-full h-full',
            selectedObject?.id === object.id &&
            'transition-shadow rounded-2xl shadow-card'
         )}
         style={{
            gridColumn: `${object.positionX} / span ${object.width}`,
            gridRow: `${object.positiony} / span ${object.height}`,
            backgroundImage: `url(${object.imagen})`,
            rotate: `${object.rotation}deg`,
         }}
      />
   )
}
