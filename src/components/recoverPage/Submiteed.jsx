import { cn } from '@/ultils'
import { Mail } from 'lucide-react'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../UI/common'
import { LinkCustom } from '../UI/from'


export const Submiteed = ({
   setIsSubmitted,
   className,
   email
}) => {
   return (
      <Card className={cn(
         'bg-transparent border-0',
         'text-muted-foreground',
         'w-80',
         className
      )}>
         <CardHeader className='text-center'>
            <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
               <Mail className='h-6 w-6 text-green-600' />
            </div>
            <CardTitle className='text-2xl font-bold text-accent-foreground'>
               Email enviado
            </CardTitle>
            <CardDescription className={'text-accent-foreground/80'}>
               Hemos enviado un enlace de recuperación a tu email {email} revisa tu bandeja de entrada o spam
            </CardDescription>
         </CardHeader>
         <CardContent className='text-center text-sm' >

            <Button
               onClick={() => {
                  setIsSubmitted(false)
               }}
            >
               Intentar de nuevo
            </Button>
         </CardContent>
         <CardFooter>
            <LinkCustom
               className={'mx-auto'}
               to={'login'}
            >
               Iniciar sesión
            </LinkCustom>
         </CardFooter>
      </Card>
   )
}
