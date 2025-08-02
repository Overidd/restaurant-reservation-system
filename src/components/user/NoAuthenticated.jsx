import { cn } from '@/ultils';
import { Card2 } from '../UI/card';
import { Button } from '../UI/common';
import { LinkCustom } from '../UI/from';

export const NoAuthenticated = ({
   className,
   onClick,
}) => {
   return (
      <Card2
         onClick={onClick}
         className={cn(
            'flex flex-col gap-4 w-44 md:w-auto',
            className
         )}
      >
         <LinkCustom to={'login'}>
            <Button
               size={"lg"}
               className={'w-full'}
            >
               Iniciar sesion
            </Button>
         </LinkCustom>

         <LinkCustom to={'register'}>
            <Button
               size={"lg"}
               className={'w-full'}
            >
               Registrarse
            </Button>
         </LinkCustom>
      </Card2>
   )

}
