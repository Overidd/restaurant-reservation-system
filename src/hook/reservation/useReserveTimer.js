import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
   reserveDecrementTimeAction,
   reserveResetTimeAction
} from '@/doman/store/reserve';

export const useReserveTimer = () => {
   const dispatch = useDispatch();
   const { minutes, seconds } = useSelector(state => state.reserveTimeReducer);

   useEffect(() => {
      if (minutes === 0 && seconds === 0) {
         console.log('⏱ Tiempo agotado');
         return;
      }

      const timer = setInterval(() => {
         dispatch(reserveDecrementTimeAction());
      }, 1000);

      return () => clearInterval(timer);
   }, [dispatch, minutes, seconds]);

   const resetReserveTime = () => {
      dispatch(reserveResetTimeAction());
   };

   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
   const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

   return {
      minutes,
      seconds,
      formattedMinutes,
      formattedSeconds,
      resetReserveTime
   };
};
