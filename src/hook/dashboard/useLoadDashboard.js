import { dashboardDataThunk } from '@/doman/store/dashboard';
import { calculateRate } from '@/ultils';
import { CalendarClock, CalendarDays, CheckCircle, Clock, Users, XCircle } from 'lucide-react';
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
            id: 'clients',
            count: state.growthRateClients.totalClients,
            rate: state.growthRateClients.growthRate,
            title: 'Clientes Activos',
            icon: Users,
            color: 'text-muted-foreground',
            textColor: 'text-muted-foreground',
            description: 'Nuevos clientes',
            className: 'md:col-span-2',
         },
         {
            id: 'total',
            count: state.metrics.total,
            rate: calculateRate(state.metrics.total, state.growthRateClients.totalClients),
            title: 'Total Reservas',
            icon: CalendarDays,
            color: 'text-muted-foreground',
            textColor: 'text-muted-foreground',
            description: 'Desde el mes pasado',
         },
         {
            id: 'pending',
            count: state.metrics.pending,
            rate: calculateRate(state.metrics.pending, state.metrics.total),
            title: 'Pendientes',
            icon: CalendarClock,
            color: 'text-table-pending',
            textColor: 'text-table-pending',
            description: 'Del total',
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
            id: 'Liberados',
            count: state.metrics.released,
            rate: calculateRate(state.metrics.released, state.
               metrics.total),
            title: 'Liberados',
            icon: CheckCircle,
            color: 'text-table-released',
            textColor: 'text-table-released',
            description: 'Del total',
         },
         {
            id: 'canceled',
            count: state.metrics.canceled,
            rate: calculateRate(state.metrics.canceled, state.metrics.total),
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
      ]
   }, [state.metrics]);


   return {
      isLoading: state.isLoading,
      metrics: metrics,
      growthRateClients: {
         totalClients: state.growthRateClients.totalClients,
         newClientsThisMonth: state.growthRateClients.newClientsThisMonth,
         growthRate: state.growthRateClients.growthRate
      },
      trends: state.trends,
      topClients: state.topClients,
      problematicClients: state.problematicClients,
      topClientAnalysis: state.topClientAnalysis,
      clientReservations: state.clientReservations,
   }
}
