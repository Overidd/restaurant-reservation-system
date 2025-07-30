import { StatsSummary } from '@/components/common'
import { ProblematicClients, TopClients, TopReservationAnalysis, TrendsChart } from '@/components/dashboard'
import { Button } from '@/components/UI/common'
import { useDownloadPdf, useLoadDashboard } from '@/hook/dashboard'
import { FileText, LoaderCircle } from 'lucide-react'

export const DashboardScreen = () => {
   const {
      metrics,
      trends,
      topClients,
      problematicClients,
      topClientAnalysis,
      isLoading
   } = useLoadDashboard()

   const {
      loading,
      downloadDashboardPdf,
   } = useDownloadPdf()

   console.log(topClients);

   return (
      <div className='min-h-screen p-4 md:p-6 lg:p-8 mx-auto max-w-7xl space-y-6'>
         <Button
            className={'w-fit flex ml-auto'}
            disabled={loading.downloadDashboard}
            onClick={() => downloadDashboardPdf({
               metrics,
               topClients,
               problematicClients,
               topClientAnalysis,
            })}
         >
            Generar Reporte
            {loading.downloadDashboard
               ? <LoaderCircle className='animate-spin' />
               : <FileText />
            }
         </Button>

         <StatsSummary
            className={'grid gap-4 md:grid-cols-4'}
            isLoading={isLoading}
            metrics={metrics}
         />

         <TrendsChart
            trends={trends}
         />

         <div className='grid gap-6 lg:grid-cols-2'>
            <TopClients
               topClients={topClients}
            />

            <ProblematicClients
               problematicClients={problematicClients}
            />
         </div>

         <TopReservationAnalysis
            topClientAnalysis={topClientAnalysis}
         />
      </div>
   )
}
export default DashboardScreen;