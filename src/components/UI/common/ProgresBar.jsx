

export const ProgressBar = ({ steps = 4, currentStep }) => {
   return (
      <div className="flex gap-2">
         {Array.from({ length: steps }).map((_, index) => (
            <div
               key={index}
               className={`h-2 rounded-full transition-colors duration-300 ${index < (currentStep + 1)
                  ? 'bg-primary'
                  : 'bg-primary-foreground'
                  } flex-1`
               }
            />
         ))}
      </div>
   );
};