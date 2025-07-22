import { ProblematicClients, StatsSummary, TopClients, TopReservationAnalysis, TrendsChart } from '@/components/dashboard'
import { Button } from '@/components/UI/common'
import { useLoadDashboard } from '@/hook/dashboard'

export const DashboardScreen = () => {
   const data = useLoadDashboard()

   return (
      <div className='min-h-screen p-4 md:p-6 lg:p-8 mx-auto max-w-7xl space-y-6'>
         <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-end'>
            {/* <p className='text-muted-foreground'>
               Panel principal de estadísticas
            </p> */}
            <div className='flex gap-2'>
               <Button
                  variant='outline'
               >
                  Exportar Datos
               </Button>
               <Button>
                  Generar Reporte
               </Button>
            </div>
         </div>

         <StatsSummary
            metrics={data?.metrics}
         />

         <TrendsChart
            trends={data?.trends}
         />

         <div className='grid gap-6 lg:grid-cols-2'>
            <TopClients
               topClients={data?.topClients}
            />

            <ProblematicClients
               problematicClients={data?.problematicClients}
            />
         </div>

         <TopReservationAnalysis
            topClientAnalysis={data?.topClientAnalysis}
         />
      </div>
   )
}
