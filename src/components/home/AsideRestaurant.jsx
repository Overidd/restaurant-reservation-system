import { cn } from '@/ultils';
import { Card, CardContent } from '../UI/common';

export const AsideRestaurant = ({
   className
}) => {

   return (
      <div
         data-aos='fade-up-right'
         className={cn(
            'flex flex-col justify-center md:grid grid-cols-[1fr_auto] grid-rows-4 gap-5 h-[30rem]',
            className
         )}>
         <Card
            className='row-span-3 group shadow-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-0 relative'
         >
            <CardContent className='p-0 '>
               <div className='relative aspect-[4/3] overflow-hidden'>
                  <img
                     src={'/home/vista-restaurante.png'}
                     alt={'Restaurante la canga'}
                     className='h-full md:h-auto object-cover transition-transform duration-500 group-hover:scale-105'
                     sizes='(max-width: 1024px) 100vw, 50vw'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  <div className='absolute top-[40%] left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                     <h3 className='text-base md:text-xl font-semibold mb-2'>
                        Ambiente Acogedor
                     </h3>
                     <p className='text-sm'>
                        Disfruta de nuestro espacio diseñado para tu comodidad
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

         <div
            className='col-end-3 row-start-2 row-end-4 h-[23rem] rounded-2xl relative md:-left-20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
         >
            <video
               className='w-full h-full object-cover object-center'
               src='/home/la-canga-tiktok.mp4'
               loop
               autoPlay
               muted
               playsInline
               controls
               style={{ width: '100%', maxWidth: '400px' }}
            />
         </div>
      </div>
   )
}