import { dashboardDataThunk } from '@/doman/store/dashboard';
import { calculateRate } from '@/ultils';
import { CalendarDays, CheckCircle, Clock, Users, XCircle } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoadDashboard = () => {
   const state = useSelector((state) => state.dashboardReducer)
   const dispatch = useDispatch();

   useEffect(() => {
      if (state.isRequest) return;
      dispatch(dashboardDataThunk());
   }, [state.isRequest]);

   const metrics = useMemo(() => {
      return [
         {
            id: 'total',
            value: state.metrics.total,
            rate: calculateRate(state.metrics.total, state.metrics.growthRateClients.totalClients),
            title: 'Total Reservas',
            icon: CalendarDays,
            color: 'text-muted-foreground',
            textColor: 'text-muted-foreground',
            description: 'Desde el mes pasado',
         },
         {
            id: 'confirmed',
            count: state.metrics.confirmed,
            rate: calculateRate(state.metrics.confirmed, state.metrics.total),
            title: 'Confirmadas',
            icon: CheckCircle,
            color: 'text-table-confirmed',
            textColor: 'text-table-confirmed',
            description: 'Del total',
         },
         {
            id: 'pending',
            count: state.metrics.released,
            rate: calculateRate(state.metrics.released, state.
               metrics.total),
            title: 'Liberados',
            icon: CheckCircle,
            color: 'text-table-selected',
            textColor: 'text-table-selected',
            description: 'Del total',
         },
         {
            id: 'cancelled',
            count: state.metrics.cancelled,
            rate: calculateRate(state.metrics.cancelled, state.metrics.total),
            title: 'Canceladas',
            icon: XCircle,
            color: 'text-red-600',
            textColor: 'text-red-600',
            description: 'Del total',
         },
         {
            id: 'noShow',
            count: state.metrics.noShow,
            rate: calculateRate(state.metrics.noShow, state.metrics.total),
            title: 'No Presentado',
            icon: Clock,
            color: 'text-orange-600',
            textColor: 'text-orange-600',
            description: 'Del total',
         },
         {
            id: 'clients',
            count: state.metrics.growthRateClients.totalClients,
            rate: state.metrics.growthRateClients.growthRate,
            title: 'Clientes Activos',
            icon: Users,
            color: 'text-muted-foreground',
            textColor: 'text-muted-foreground',
            description: 'Nuevos clientes',
         }
      ]
   }, [state.metrics]);


   return {
      isLoading: state.isLoading,
      metrics: metrics,
      growthRateClients: {
         totalClients: state.metrics.growthRateClients.totalClients,
         newClientsThisMonth: state.metrics.growthRateClients.newClientsThisMonth,
         growthRate: state.metrics.growthRateClients.growthRate
      },
      trends: state.trends,
      topClients: state.topClients,
      problematicClients: state.problematicClients,
      topClientAnalysis: state.topClientAnalysis,
      clientReservations: state.clientReservations,
   }
}
