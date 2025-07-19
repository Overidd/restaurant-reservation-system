import { cn } from '@/ultils';
import { cva } from 'class-variance-authority';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import {
   Button,
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger
} from '.';

const speedDialVariants = cva('absolute flex items-center justify-center gap-2', {
   variants: {
      direction: {
         up: 'bottom-full mb-2 flex-col-reverse',
         down: 'top-full mt-2 flex-col',
         left: 'right-full mr-2 flex-row-reverse',
         right: 'left-full ml-2 flex-row',
      },
   },
   defaultVariants: {
      direction: 'up',
   },
})

// interface SpeedDialAction {
//    icon: React.ElementType
//    label: string
//    onClick: () => void
//    className?: string
// }

// interface SpeedDialProps extends VariantProps<typeof speedDialVariants> {
//    actions: SpeedDialAction[]
//    disabled?: boolean
//    className?: string
//    triggerProps?: ButtonProps
//    triggerOn?: 'click' | 'hover'
//    triggerSize?: ButtonProps['size']
//    triggerIcon?: React.ElementType
// }

export const SpeedDial = ({
   actions,
   direction,
   disabled,
   className,
   triggerProps,
   triggerOn = 'click',
   triggerSize = 'icon',
   triggerIcon = Plus,
   size = 10,
}) => {

   const TriggerIcon = triggerIcon

   const [isOpen, setIsOpen] = useState(false)

   const handleTrigger = () => {
      if (triggerOn === 'click') {
         setIsOpen(!isOpen)
      }
   }

   const containerEvents =
      triggerOn === 'hover'
         ? {
            onMouseEnter: () => !disabled && setIsOpen(true),
            onMouseLeave: () => !disabled && setIsOpen(false),
         }
         : {}

   const tooltipSide = {
      up: 'left',
      down: 'left',
      left: 'top',
      right: 'top',
   }[direction || 'up']

   return (
      <TooltipProvider delayDuration={100}>
         <div className={cn('relative', className)} {...containerEvents}>
            <div className={speedDialVariants({ direction })}>
               {actions.map((action, index) => (
                  <div
                     key={action.id}
                     className={cn(
                        'transition-all duration-300 ease-in-out',
                        isOpen ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 pointer-events-none',
                        direction === 'up' && !isOpen && 'translate-y-2',
                        direction === 'down' && !isOpen && '-translate-y-2',
                        direction === 'left' && !isOpen && 'translate-x-2',
                        direction === 'right' && !isOpen && '-translate-x-2',
                     )}
                     style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
                  >
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                              size='icon'
                              aria-label={action.label}
                              disabled={disabled || action.disabled}
                              className={cn('h-10 w-10 rounded-full shadow-md', action.className)}
                              onClick={() => {
                                 action.onClick()
                                 setIsOpen(false)
                              }}
                           >
                              <action.icon className='h-5 w-5' />
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent
                           side={tooltipSide}
                           className={'text-card-foreground'}
                        >
                           <p>{action.label}</p>
                        </TooltipContent>
                     </Tooltip>
                  </div>
               ))}
            </div>

            <Button
               onClick={handleTrigger}
               size={triggerSize}
               className={cn('rounded-xl shadow-lg', triggerSize !== 'icon' && 'px-4', triggerProps?.className)}
               aria-expanded={isOpen}
               aria-label={isOpen ? 'Close speed dial' : 'Open speed dial'}
               disabled={disabled}
               
               {...triggerProps}
            >
               <TriggerIcon
                  className={cn('h-6 w-6 transition-transform duration-300', isOpen && 'rotate-45')}
                  size={size}
               />
            </Button>
         </div>
      </TooltipProvider>
   )
}