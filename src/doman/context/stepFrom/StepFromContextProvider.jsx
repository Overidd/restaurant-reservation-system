import { useStepFormContext } from '@/hook';

export const StepFromContextProvider = ({ children }) => {
   const ctx = useStepFormContext();

   if (Array.isArray(children)) {
      const [child] = children;

      return child(ctx);
   }

   return children(ctx);
}