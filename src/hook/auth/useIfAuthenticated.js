import { useEffect } from 'react';

export const useIfAuthenticated = (isAuthenticated, callback) => {
   
   useEffect(() => {
      if (isAuthenticated) {
         callback();
      }
   }, [isAuthenticated]);
};
