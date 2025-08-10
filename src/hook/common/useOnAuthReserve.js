import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { startReserveTable, typeStatus } from '@/doman/store/reservation';

export const useOnAuthReserve = () => {
   const dispatch = useDispatch();
   const stateReserve = useSelector((state) => state.reserveReducer.stateReserve);

   const reserveConfirm = async () => {
      if (stateReserve !== typeStatus.PENDING_AUTH) return;
      return dispatch(startReserveTable());

      // reserveToggleTable(table);
   }

   const isPendingAuth = useMemo(() => stateReserve === typeStatus.PENDING_AUTH, [stateReserve]);

   return {
      reserveConfirm,
      stateReserve,
      isPendingAuth,
   }
}