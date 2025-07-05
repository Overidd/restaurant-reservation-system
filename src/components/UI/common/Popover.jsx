import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@/ultils/cn'

export const Popover = ({ ...props }) => {
  return <PopoverPrimitive.Root data-slot='popover' {...props} />;
}

export const PopoverTrigger = ({ ...props }) => {
  return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />;
}

export const PopoverContent = ({
  className,
  align = 'center',
  sideOffset = 4,
  onInteractOutside,
  ...props
}) => {
  return (
    (<PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot='popover-content'
        align={align}
        sideOffset={sideOffset}
        onInteractOutside={onInteractOutside}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md shadow-md outline-hidden',
          className
        )}
        {...props} />
    </PopoverPrimitive.Portal>)
  );
}

export const PopoverAnchor = ({ ...props }) => {
  return <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} />;
}