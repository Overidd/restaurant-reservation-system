import { cn } from '@/ultils';
import { CardTestimonial } from '../UI/card';
import { Button } from '../UI/common';
import { LinkCustom } from '../UI/from';

const testimonialData = [
   {
      id: 1,
      text: 'Las recetas aquí no sólo son deliciosas',
      className: 'relative right-20 animate-bounce-card',
      stars: 5,
      user: {
         name: 'Fernando',
         lastName: 'Perez',
         photoURL: '',
      },
   },
   {
      id: 2,
      text: 'He descubierto platillos deliciosos',
      className: 'relative bottom-32 right-5 ',
      stars: 5,
      user: {
         name: 'Sofia',
         lastName: 'Mendoza',
         photoURL: '',
      },
   }
]

export const HomeHeader = () => {
   return (
      <header
         className={cn(
            'flex flex-row justify-center items-center gap-40',
            'w-full h-screen'
         )}
         style={{
            backgroundImage: 'url(/home/header-image.webp)',
         }}
      >
         <section className='space-y-4'>
            <h1 className='text-secondary-foreground text-5xl font-bold uppercase'>
               la <br /> canga
            </h1>
            <p className='text-secondary-foreground font-semibold'>
               Realiza tu reserva
            </p>
            <LinkCustom to={'reserve'}>
               <Button
                  className='text-secondary-foreground font-semibold'
                  variant={'outline'}
               >
                  Reservar
               </Button>
            </LinkCustom>
         </section>

         <section
            className={cn(
               'bg-cover bg-center bg-no-repeat',
               'rounded-4xl -rotate-12 relative',
               'w-[30rem] h-[40rem]',
               'hidden md:block',
            )}
            style={{
               backgroundImage: 'url(/home/plato-prymary-image.jpg)',
            }}
         >
            <div className='absolute bottom-0 flex gap-5'>
               {testimonialData.map((item) => (
                  <CardTestimonial
                     className={item.className}
                     key={item.id}
                     text={item.text}
                     stars={item.stars}
                     user={item.user}
                  />
               ))}
            </div>
         </section>
      </header>
   )
}
