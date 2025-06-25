import { cn } from '@/ultils/cn';

export const StepForm = ({ name, className, children }) => {
  return (
    <div
      name={name}
      className={cn(
        className
      )}
    >
      {children}
    </div>
  )
}
