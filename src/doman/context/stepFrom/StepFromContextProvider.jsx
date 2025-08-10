import { useReservationFromStep, useStepFormContext } from '@/hook/reservationFromStep';

export const StepFromContextProvider = ({ children }) => {
   const ctx = useStepFormContext();

   const { from } = useReservationFromStep()

   if (Array.isArray(children)) {
      const [child] = children;

      return child(ctx);
   }
   return children({ ...ctx, ...from });
}