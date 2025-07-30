import { useUser, useUserSettings } from '@/hook/auth';
import { useForm } from '@/hook/common';
import { UserToasts } from '@/toasts/UserToasts';
import { Validations } from '@/ultils';
import { User } from 'lucide-react';
import { UserCard } from '../UI/card';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input } from '../UI/from';

const schema = {
   initial: {
      name: '',
      phone: '',
      address: '',
   },
   valid: {
      name: [
         (value) => value && value?.length >= 3,
         'El nombre debe tener al menos 3 caracteres',
      ],
      phone: [
         (value) => Validations.phone(value),
         'El telefono debe tener al menos 3 caracteres',
      ],
      address: [
         (value) => value && value?.length >= 3,
         'La direccion debe tener al menos 3 caracteres',
      ],
   }
}


export const ProfileUser = () => {
   const {
      updateProfile
   } = useUserSettings()

   const user = useUser()

   const {
      formState: {
         phone,
         name,
         address
      },
      formValidation: {
         phoneValid,
         nameValid,
         addressValid
      },
      onValueChange,
      onSubmitForm,
   } = useForm({
      validations: schema.valid,
      activeValidation: true,
      initialState: {
         ...schema.initial,
         name: user.name,
         phone: user.phone,
         address: user.address,
      },
   });

   const onSubmit = onSubmitForm((value) => {
      UserToasts.updateProfile(updateProfile({
         ...value,
         idUser: user.id
      }))
   });

   return (
      <Card
         className={'p-4 bg-transparent border-none shadow-none h-full'}
      >
         <CardHeader>
            <CardTitle className='flex items-center justify-between text-background'>
               <div className='space-x-2'>
                  <User className='hidden md:inline-block h-5 w-5 align-middle' />
                  <span className='align-middle text-sm md:text-base'>
                     Información Personal
                  </span>
               </div>
               {user.isRoleAdmin && (
                  <Badge
                     variant='secondary'
                  >
                     Administrador
                  </Badge>
               )}
            </CardTitle>
         </CardHeader>
         <CardContent className='space-y-4 h-full'>
            <UserCard
               className={'text-background '}
               mustShow={['name', 'lastName', 'email']}
               user={{
                  name: user.name,
                  email: user.email,
                  photoURL: user.photoURL,
               }}
            />

            <Form
               onSubmit={onSubmit}
            >
               <FormItem>
                  <FormLabel
                     htmlFor='name'
                  >
                     Nombre completo
                  </FormLabel>
                  <Input
                     id='name'
                     type='text'
                     name='name'
                     value={name}
                     isError={!!nameValid}
                     onChange={onValueChange}
                     placeholder='Ingresa tu nombre completo'
                  />
               </FormItem>

               <FromGroup className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormItem>
                     <FormLabel htmlFor='phone'>
                        Teléfono
                     </FormLabel>
                     <Input
                        id='phone'
                        type='text'
                        name='phone'
                        value={phone}
                        isError={!!phoneValid}
                        onChange={onValueChange}
                        placeholder='Ingresa tu teléfono'
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel htmlFor='address'>
                        Direccion
                     </FormLabel>
                     <Input
                        id='address'
                        type='text'
                        name='address'
                        value={address}
                        isError={!!addressValid}
                        onChange={onValueChange}
                        placeholder='Ingresa su dirección'
                     />
                  </FormItem>
               </FromGroup>

               <Button
                  type='submit'
                  className='mt-auto px-8 mx-auto w-fit'
               >
                  Guardar Cambios
               </Button>
            </Form>
         </CardContent>
      </Card>
   )
}