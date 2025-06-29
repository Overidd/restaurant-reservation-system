import { useEffect } from 'react';

export const useRedirectIfAuthenticated = (isAuthenticated, callback) => {
   useEffect(() => {
      if (isAuthenticated) {
         callback();
      }
   }, [isAuthenticated, callback]);
};
