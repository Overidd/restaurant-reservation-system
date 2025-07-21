import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartContainer, ChartTooltip, ChartTooltipContent } from '../UI/common'

export const TrendsChart = ({
   trends,
   className
}) => {

   return (
      <Card>
         <CardHeader>
            <CardTitle>Tendencia de Reservas por Mes</CardTitle>
            <CardDescription>Comparativa de reservas confirmadas, canceladas y no-show</CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer
               config={{
                  released: {
                     label: 'Liberadas',
                     color: 'hsl(var(--chart-1))',
                  },
                  canceladas: {
                     label: 'Canceladas',
                     color: 'hsl(var(--chart-2))',
                  },
                  noShow: {
                     label: 'No presentado',
                     color: 'hsl(var(--chart-3))',
                  },
               }}
               className='h-[300px]'
            >
               <BarChart data={trends}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey='month' tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey='released' fill='var(--color-released)' radius={[0, 0, 0, 0]} />
                  <Bar dataKey='canceled' fill='var(--color-canceladas)' radius={[0, 0, 0, 0]} />
                  <Bar dataKey='noShow' fill='var(--color-noShow)' radius={[4, 4, 0, 0]} />
               </BarChart>
            </ChartContainer>
         </CardContent>
      </Card>
   )
}
