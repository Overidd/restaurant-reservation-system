import { useEffect, useState } from 'react';

export const useReservationFilter = (reservations) => {
   const [selectedStatus, setSelectedStatus] = useState('all');
   const [filteredReservations, setFilteredReservations] = useState(reservations);

   useEffect(() => {
      let filtered = [...reservations];

      filtered = filtered.sort((a, b) => b.updatedAt - a.updatedAt);
      
      if (selectedStatus !== 'all') {
         filtered = filtered.filter((reserve) => reserve.status === selectedStatus);
      }
      setFilteredReservations(filtered);
   }, [reservations, selectedStatus]);

   const handleStatusFilter = (status) => {
      setSelectedStatus(status);
   };

   return {
      selectedStatus,
      filteredReservations,
      handleStatusFilter
   };
}
