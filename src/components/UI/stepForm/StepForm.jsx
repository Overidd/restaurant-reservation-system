import { cn } from '@/ultils/cn';

export const StepForm = ({ className, children }) => {
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
