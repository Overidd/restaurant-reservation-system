import { Card2 } from '../UI/card';
import { Button } from '../UI/common';
import { LinkCustom } from '../UI/from';

export const NoAuthenticated = () => {
   return (
      <Card2 className='flex flex-col gap-4'>
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
