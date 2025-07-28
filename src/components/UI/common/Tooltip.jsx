import { cn } from '@/ultils/cn';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export const TooltipProvider = ({
  delayDuration = 0,
  ...props
}) => {
  return (<TooltipPrimitive.Provider data-slot='tooltip-provider' delayDuration={delayDuration} {...props} />);
}

export const Tooltip = ({
  ...props
}) => {
  return (
    (<TooltipProvider>
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipProvider>)
  );
}
export const TooltipTrigger = ({
  asChild = false,
  ...props
}) => {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' asChild={asChild} {...props} />;
}

export const TooltipContent = ({
  className,
  sideOffset = 0,
  children,
  showArrow = true,
  ...props
}) => {
  return (
    (<TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        className={cn(
          'text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance bg-background shadow-md',
          className
        )}
        {...props}>
        {children}
        {showArrow && <TooltipPrimitive.Arrow
          className='bg-background fill-background z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]' />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>)
  );
}