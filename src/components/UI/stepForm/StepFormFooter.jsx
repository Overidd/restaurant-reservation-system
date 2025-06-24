import { cn } from '@/ultils/cn';

export const StepFormFooter = ({ className, children }) => {
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
