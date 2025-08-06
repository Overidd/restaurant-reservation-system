import { cn } from '@/ultils';
import { Heart, Star } from 'lucide-react';

export const CardTestimonial = ({
   className,
   animation = 'fade-left',
   text = 'Las recetas aquí no sólo son deliciosas, sino que también son fáciles de seguir. ¡Altamente recomendado!',
   user = { name: 'María García', role: 'Chef' },
   stars = 5,
}) => {

   return (
      <div
         data-aos={animation}
         className={cn('max-w-sm mx-auto bg-card rounded-2xl p-3 space-y-2 shadow-lg', className)}
      >
         <div className='flex justify-center space-x-1'>
            {[...Array(5)].map((_, i) => {
               const animations = [
                  'animate-star-dance',
                  'animate-star-float',
                  'animate-star-bounce',
                  'animate-star-wiggle',
                  'animate-star-spin-glow',
               ].sort(() => Math.random() - 0.5)

               const delays = [
                  'animate-delay-100',
                  'animate-delay-200',
                  'animate-delay-300',
                  'animate-delay-400',
                  'animate-delay-500',
               ]

               return (
                  <Star
                     key={i}
                     className={cn(
                        'w-5 h-5 transition-all duration-300',
                        i < stars && 'fill-yellow-400 text-yellow-400',
                        !(i < stars) && 'fill-gray-200 text-gray-200',
                        // Animaciones con movimiento solo cuando son 5 estrellas
                        stars === 5 && i < stars && animations[i],
                        stars === 5 && i < stars && delays[i],
                     )}
                  />
               )
            })}
         </div>
         <div className='text-center'>
            <p className='text-gray-800 bg-gray-100 p-4 text-md font-medium leading-relaxed rounded-lg'>{text}</p>
         </div>
         <div className='flex items-center justify-between pt-4'>
            <UserCard user={user} />
            <Heart className='w-6 h-6 text-gray-600 hover:text-red-500 cursor-pointer transition-colors duration-200' />
         </div>
      </div>
   )
}

// Componente de demostración
export default function Component() {
   return (
      <div className='min-h-screen bg-gray-50 p-8 space-y-8'>
         <h1 className='text-3xl font-bold text-center mb-8'>Testimonios con Animación de Estrellas</h1>

         <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {/* Testimonio con 5 estrellas - animado */}
            <CardTestimonial
               stars={5}
               text='¡Increíble experiencia! Las recetas son perfectas y fáciles de seguir. Definitivamente volveré.'
               user={{ name: 'Ana López', role: 'Chef Profesional' }}
            />

            {/* Testimonio con 4 estrellas - sin animación */}
            <CardTestimonial
               stars={4}
               text='Muy buenas recetas, aunque algunas podrían tener más detalles en las instrucciones.'
               user={{ name: 'Carlos Ruiz', role: 'Cocinero Aficionado' }}
            />

            {/* Testimonio con 3 estrellas - sin animación */}
            <CardTestimonial
               stars={3}
               text='Está bien, pero esperaba un poco más de variedad en los ingredientes.'
               user={{ name: 'Laura Martín', role: 'Estudiante' }}
            />

            {/* Otro testimonio con 5 estrellas - animado */}
            <CardTestimonial
               stars={5}
               text='¡Excelente! Cada receta que he probado ha sido un éxito total. Muy recomendado.'
               user={{ name: 'Miguel Torres', role: 'Crítico Gastronómico' }}
            />
         </div>
      </div>
   )
}

const UserCard = ({ user = {} }) => {
   return (
      <div className='flex items-center space-x-2'>
         <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
            <span className='text-xs font-medium'>{user.name?.[0] || 'U'}</span>
         </div>
         <div>
            <p className='text-sm font-medium'>{user.name || 'Usuario'}</p>
            <p className='text-xs text-gray-500'>{user.role || 'Cliente'}</p>
         </div>
      </div>
   )
}