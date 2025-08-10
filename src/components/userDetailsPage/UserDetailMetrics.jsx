import { Card, CardContent } from '../UI/common';

export const UserDetailMetrics = ({ selectUser }) => (
   <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <Card className={'border-transparent shadow input-style-class bg-transparent text-background'}>
         <CardContent className='p-4'>
            <div className='text-2xl font-bold'>
               {selectUser.metrics?.total}
            </div>
            <p className='text-xs'>Total Reservas</p>
         </CardContent>
      </Card>
      <Card className={'border-transparent shadow input-style-class bg-transparent text-background'}>
         <CardContent className='p-4'>
            <div className='text-2xl font-bold text-green-600'>
               {selectUser.rate + '%'}
            </div>
            <p className='text-xs'>Tasa de Éxito</p>
         </CardContent>
      </Card>
   </div>
);