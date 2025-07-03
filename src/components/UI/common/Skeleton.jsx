import { cn } from '@/ultils';

export const Skeleton = ({ className, ...props }) => {
   return (
      <div
         data-slot='skeleton'
         className={cn('bg-gray-200 animate-pulse rounded-md', className)}
         {...props}
      />
   )
}

export const SkeletonLoadding = ({
   className,
   isLodding,
   children
}) => {

   if (isLodding) return (
      <Skeleton
         className={`w-full h-full mx-auto ${className}`}
      />
   );

   return children
}