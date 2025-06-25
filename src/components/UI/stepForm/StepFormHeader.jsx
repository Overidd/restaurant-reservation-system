import { cn } from '@/ultils/cn';

export const StepFormHeader = ({ className, children }) => {

  return (
    <div
      className={cn(
        className
      )}
    >
      {children}
    </div>
  )
}