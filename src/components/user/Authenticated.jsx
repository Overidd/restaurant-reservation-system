import { LogOut } from 'lucide-react'

import { Button } from '../UI/common'


export const Authenticated = ({
   name,
   photoURL,
   onlogout,
}) => {
   return (
      <>
         <span className='text-primary-foreground'>
            {name}
         </span>

         <figure>
            <img
               src={photoURL}
               alt={name}
            />
         </figure>


         <Button
            size={"lg"}
            className={'w-full'}
            onClick={onlogout}
            title='Cerrar sesion'
         >
            <LogOut />
         </Button>
      </>
   )
}
