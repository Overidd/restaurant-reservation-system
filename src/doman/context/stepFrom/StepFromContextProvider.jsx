import { useReserve, useStepFormContext } from '@/hook';

export const StepFromContextProvider = ({ children }) => {
   const ctx = useStepFormContext();

   const { from } = useReserve()

   if (Array.isArray(children)) {
      const [child] = children;

      return child(ctx);
   }
   return children({ ...ctx, ...from });
}