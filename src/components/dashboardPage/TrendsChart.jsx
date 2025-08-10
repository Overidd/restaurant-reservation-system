import { cn } from '@/ultils'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, ChartContainer, ChartTooltip, ChartTooltipContent } from '../UI/common'

export const TrendsChart = ({
   trends,
   className
}) => {

   return (
      <Card
         className={cn(
            className
         )}
      >
         <CardHeader>
            <CardDescription>
               Comparativa de reservas confirmadas, canceladas y no presentados
            </CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer
               config={{
                  canceladas: {
                     label: 'Canceladas',
                     color: 'hsl(var(--chart-1))',
                  },
                  released: {
                     label: 'Completados',
                     color: 'hsl(var(--chart-2))',
                  },
                  noShow: {
                     label: 'No presentado',
                     color: 'hsl(var(--chart-1))',
                  },
               }}
               className='h-[300px]'
            >
               <BarChart data={trends}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey='month'
                     tickLine={false}
                     tickMargin={10}
                     axisLine={false}
                  />
                  <YAxis
                     tickLine={false}
                     axisLine={false}
                     tickMargin={8}
                  />
                  <ChartTooltip
                     content={<ChartTooltipContent />}
                  />
                  <Bar
                     dataKey='canceled'
                     fill='var(--color-table-canceled)'
                     radius={[0, 0, 0, 0]}
                  />
                  <Bar
                     dataKey='noShow'
                     fill='var(--color-table-noshow)'
                     radius={[4, 4, 0, 0]}
                  />
                  <Bar
                     dataKey='released'
                     fill='var(--color-table-released)'
                     radius={[0, 0, 0, 0]}
                  />
               </BarChart>
            </ChartContainer>
         </CardContent>
      </Card>
   )
}
