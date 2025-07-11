import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

/**
 * @param {Array<{message: string, priority: number}>} errors 
 */
export const useToastErrorHandler = (errors) => {
   const lastToastId = useRef(null);

   useEffect(() => {
      const latestError = errors
         .filter((e) => e.message)
         .sort((a, b) => a.priority - b.priority)[0];

      if (latestError?.message) {
         if (lastToastId.current) toast.dismiss(lastToastId.current);
         lastToastId.current = toast.error(latestError.message);
      }
   }, [errors.map((e) => e.message).join('|')]);
};
