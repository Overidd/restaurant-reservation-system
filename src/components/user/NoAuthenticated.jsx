import { Button } from '../UI/common';
import { LinkCustom } from '../UI/from';

export const NoAuthenticated = () => {
   return (
      <>
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
      </>
   )

}
