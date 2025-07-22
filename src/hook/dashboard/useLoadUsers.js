import { getAllUsersThunk, getByIdUserReservationThunk, setSelectedUser } from '@/doman/store/dashboard';
import { Users } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoadUsers = () => {
   const state = useSelector((state) => state.usersReducer)
   const dispatch = useDispatch();

   useEffect(() => {
      if (state.isRequest) return;
      dispatch(getAllUsersThunk());
   }, [state.isRequest]);

   const getByIdUserReservations = (idUser) => {
      const reservations = state.reservations.find((r) => r.idUser === idUser);
      if (reservations) {
         dispatch(setSelectedUser({
            idUser,
            reservations: reservations
         }))
         return;
      };
      dispatch(getByIdUserReservationThunk(idUser));
   }

   const metrics = useMemo(() => {
      return [
         {
            id: 'clients',
            count: state.users.length,
            rate: 0,
            title: 'Total Clientes',
            icon: Users,
            color: 'text-muted-foreground',
            textColor: 'text-muted-foreground',
            description: 'Nuevos clientes',
         },
      ]
   }, [state.users]);

   return {
      users: state.users,
      metrics: metrics,
      reservations: state.reservations,
      selectedUser: state.selectedUser,
      loadings: {
         users: state.loadings.users,
         reservations: state.loadings.reservations
      },

      // FUNCTIONS
      getByIdUserReservations
   }
}
