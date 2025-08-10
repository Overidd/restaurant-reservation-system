import { cn } from '@/ultils';
import { Link } from 'react-router-dom';
import { Button } from '../UI/common';

export const AuthenticFlavors = ({
   path,
   image,
   name,
   className,
   description,
   imageBackground,
   align = 'left',
}) => {
   const isRight = align === 'right'

   return (
      <div
         data-aos='fade-up'
         data-aos-offset='300'
         data-aos-easing='ease-in-sine'
         className={cn(
            'flex gap-2 items-center relative',
            isRight ? 'flex-row-reverse' : 'flex-row',
            className
         )}
      >
         {imageBackground &&
            <div
               className={cn(
                  'h-[10rem] w-[10rem] absolute',
                  imageBackground && (isRight ? 'md:-mr-24' : 'md:-ml-24')
               )}
               style={{
                  backgroundImage: `url(${imageBackground})`,
                  backgroundPosition: align,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
               }}
            />
         }
         <figure
            className={cn(
               'w-44 h-44 md:h-80 md:w-64 rounded-2xl overflow-hidden',
               'transition-transform will-change-transform duration-300 hover:scale-[1.02] hover:shadow-xl',
            )}
         >
            <img
               className='w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105'
               src={image}
               alt={name}
            />
         </figure>

         <hr className='flex-1 bg-primary/50 h-[2.5px] rounded-2xl' />

         <div className={cn(
            'md:w-[17rem]'
         )}>
            <h5 className='font-extrabold md:text-lg uppercase tracking-tighter'>
               {name}
            </h5>
            <p className='text-balance'>
               {description}
            </p>
            <Link className='block mt-5' to={'/product'}>
               <Button
                  className='font-semibold border-primary text-primary hover:bg-transparent hover:text-primary'
                  variant={'outline'}
               >
                  Ver más
               </Button>
            </Link>
         </div>
      </div >
   )
}