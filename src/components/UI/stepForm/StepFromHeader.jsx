import { cn } from '@/ultils/cn';

export const StepFromHeader = ({ className, children }) => {

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