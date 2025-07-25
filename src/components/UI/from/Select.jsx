import { cn } from '@/ultils/cn';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cva } from 'class-variance-authority';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, LoaderCircle } from 'lucide-react';

export const Select = ({
  value,
  defaultValue,
  onValueChange,
  name,
  type = 'text',
  ...props
}) => {
  const handleValueChange = (val) => {
    let parsedVal = val;

    if (type === 'number') {
      parsedVal = Number(val);
    }

    if (onValueChange) {
      onValueChange({ name, value: parsedVal, type });
    }
  };


  return (
    <SelectPrimitive.Root
      value={value !== undefined ? value : undefined}
      defaultValue={value === undefined ? defaultValue : undefined}
      onValueChange={handleValueChange}
      data-slot="select"
      {...props}
    />
  );
};



export const SelectGroup = ({ ...props }) => {
  return <SelectPrimitive.Group data-slot='select-group' {...props} />;
}

export const SelectValue = ({ ...props }) => {
  return <SelectPrimitive.Value data-slot='select-value' {...props} />;
}

export const SelectTrigger = ({
  id,
  className,
  isError = false,
  isLoading = false,
  variant = 'default',
  size = 'default',
  children,
  ...props
}) => {
  const selectVariants = cva(
    '',
    {
      variants: {
        variant: {
          crystal: 'input-style-class py-5 px-4',
        },

        size: {
          sm: 'h-7 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 py-4 text-sm',
          base: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 py-5 text-sm',
          lg: 'h-12 rounded-md px-4 text-base',
          xl: 'h-14 rounded-md px-4 has-[>svg]:px-5 text-lg',
          icon: 'size-10 text-xl',
        },
        defaultVariants: {
          variant: 'default',
          size: 'base',
        },
      }
    })

  return (
    (<SelectPrimitive.Trigger
      id={id}
      data-slot='select-trigger'
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text - '])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size - '])]:size-4",
        selectVariants({ variant, className, size }),
        isError && '!border-destructive/50',
      )}
      {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        {
          isLoading
            ? <LoaderCircle className='animate-spin' />
            : <ChevronDownIcon />
        }
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>)
  );
}

export const SelectContent = ({
  id,
  className,
  children,
  position = 'popper',
  ...props
}) => {
  return (
    (<SelectPrimitive.Portal>
      <SelectPrimitive.Content
        id={id}
        data-slot='select-content'
        className={cn(
          'bg-[#fbf3e7] text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
          position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...props}>
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn('p-1', position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1')}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>)
  );
}

export const SelectLabel = ({ className, ...props }) => {
  return (
    (<SelectPrimitive.Label
      data-slot='select-label'
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props} />)
  );
}

export const SelectItem = ({ className, children, ...props }) => {
  return (
    (<SelectPrimitive.Item
      data-slot='select-item'
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}>
      <span className='absolute right-2 flex size-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>)
  );
}

export const SelectSeparator = ({ className, ...props }) => {
  return (
    (<SelectPrimitive.Separator
      data-slot='select-separator'
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props} />)
  );
}


export const SelectItemActionGroup = ({ className, children }) => {
  // const handleClick = () => {
  //   if (document.activeElement instanceof HTMLElement) {
  //     document.activeElement.blur();
  //   }
  // };

  return (
    <div
      data-slot='select-item-action-group'
      // tabIndex={0}
      // role='button'
      // onClick={handleClick}
      // onKeyDown={handleClick}
      className={cn(
        className
      )}
    >
      {children}
    </div>
  );
};


export const SelectScrollUpButton = ({ className, ...props }) => {
  return (
    (<SelectPrimitive.ScrollUpButton
      data-slot='select-scroll-up-button'
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}>
      <ChevronUpIcon className='size-4' />
    </SelectPrimitive.ScrollUpButton>)
  );
}

export const SelectScrollDownButton = ({ className, ...props }) => {
  return (
    (<SelectPrimitive.ScrollDownButton
      data-slot='select-scroll-down-button'
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}>
      <ChevronDownIcon className='size-4' />
    </SelectPrimitive.ScrollDownButton>)
  );
}


export const SelectCustom = ({
  onValueChange,
  onInputChange,
  defaultValue,
  className,
  placeholder,
  dataItem
}) => {

  return (
    <Select
      onValueChange={onValueChange}
      onInputChange={onInputChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {
          dataItem.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}