import { dashboardDataThunk } from '@/doman/store/dashboardPage';
import { calculateRate } from '@/ultils';
import { CalendarClock, CalendarDays, CheckCircle, Clock, Users, XCircle } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoadDashboard = () => {
   const state = useSelector((state) => state.dashboardReducer)
   const dispatch = useDispatch();

   useEffect(() => {
      // if (state.isRequest) return;
      dispatch(dashboardDataThunk());
   }, []);

   const metrics = useMemo(() => {
      return [
         {
            id: 'clients',
            count: state.growthRateClients.totalClients,
            rate: state.growthRateClients.growthRate,
            title: 'Clientes Activos',
            icon: Users,
            backgroundColor: 'var(--muted-foreground)',
            color: 'var(--muted-foreground)',
            description: 'Nuevos clientes',
            className: 'md:col-span-2',
         },
         {
            id: 'total',
            count: state.metrics.total,
            rate: calculateRate(state.metrics.total, 100),
            title: 'Total Reservas',
            icon: CalendarDays,
            backgroundColor: 'var(--muted-foreground)',
            color: 'var(--muted-foreground)',
            description: 'Desde el mes pasado',
         },
         {
            id: 'pending',
            count: state.metrics.pending,
            rate: calculateRate(state.metrics.pending, state.metrics.total),
            title: 'Pendientes',
            icon: CalendarClock,
            backgroundColor: 'var(--table-pending)',
            color: 'var(--table-pending)',
            description: 'Del total',
         },
         {
            id: 'confirmed',
            count: state.metrics.confirmed,
            rate: calculateRate(state.metrics.confirmed, state.metrics.total),
            title: 'Confirmadas',
            icon: CheckCircle,
            backgroundColor: 'var(--table-confirmed)',
            color: 'var(--table-confirmed)',
            description: 'Del total',
         },
         {
            id: 'Completados',
            count: state.metrics.released,
            rate: calculateRate(state.metrics.released, state.
               metrics.total),
            title: 'Completados',
            icon: CheckCircle,
            backgroundColor: 'var(--table-released)',
            color: 'var(--table-released)',
            description: 'Del total',
         },
         {
            id: 'canceled',
            count: state.metrics.canceled,
            rate: calculateRate(state.metrics.canceled, state.metrics.total),
            title: 'Canceladas',
            icon: XCircle,
            backgroundColor: 'var(--destructive)',
            color: 'var(--destructive)',
            description: 'Del total',
         },
         {
            id: 'noShow',
            count: state.metrics.noShow,
            rate: calculateRate(state.metrics.noShow, state.metrics.total),
            title: 'No Presentado',
            icon: Clock,
            backgroundColor: 'var(--chart-4)',
            color: 'var(--chart-4)',
            description: 'Del total',
         },
      ]
   }, [state.metrics]);

   const topClientAnalysis = useMemo(() => {
      return state.topClientAnalysis.map((client) => {
         const total = client.confirmed + client.canceled + client.noShow + client.pending

         const rate = ((client?.released || 0) / (client?.total || 0) * 100).toFixed(1)

         return {
            ...client,
            rate: isNaN(rate) ? '0.0' : rate,
            total
         }
      })
   }, [state.topClientAnalysis]);

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
      topClientAnalysis: topClientAnalysis,
      clientReservations: state.clientReservations,
   }
}
