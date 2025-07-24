import { useForm } from '@/hook';
import { useUser, useUserSettings } from '@/hook/auth';
import { Validations } from '@/ultils';
import { User } from 'lucide-react';
import { UserCard } from '../UI/card';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input } from '../UI/from';

const schema = {
   initial: {
      name: '',
      email: '',
      phone: '',
      address: '',
   },
   valid: {
      name: [
         (value) => value.length >= 3,
         'El nombre debe tener al menos 3 caracteres',
      ],
      email: [
         (value) => Validations.email(value),
         'El email debe tener al menos 3 caracteres',
      ],
      phone: [
         (value) => Validations.phone(value),
         'El telefono debe tener al menos 3 caracteres',
      ],
      address: [
         (value) => value.length >= 3,
         'La direccion debe tener al menos 3 caracteres',
      ],
   }
}


export const ProfileUser = () => {
   const {
      editProfile
   } = useUserSettings()

   const user = useUser()

   const {
      formState: {
         email,
         phone,
         name,
         address
      },
      formValidation: {
         emailValid,
         phoneValid,
         nameValid,
         addressValid
      },
      onValueChange,
      onSubmitForm,
   } = useForm({
      initialState: {
         ...schema.initial,
         name: user.name,
         email: user.email,
         phone: user.phone,
         address: user.address,
      },
      validations: schema.valid,
      activeValidation: true,
   });

   const onSubmit = onSubmitForm((value) => {
   });

   return (
      <Card
         className={'p-4 bg-transparent border-none shadow-none'}
      >
         <CardHeader>
            <CardTitle className='flex items-center gap-2 text-background'>
               <User className='h-5 w-5' />
               Información Personal
            </CardTitle>
         </CardHeader>
         <CardContent className='space-y-4'>
            <UserCard
               className={'text-background '}
               mustShow={['name', 'lastName', 'email']}
               user={{ name: 'Eduardo', lastName: 'Gonzalez', photoURL: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', email: 'M5M2J@example.com' }}
            />

            <Form
               onSubmit={onSubmit}
            >
               <FromGroup className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormItem>
                     <FormLabel
                        htmlFor='name'
                     >
                        Nombre completo
                     </FormLabel>
                     <Input
                        id='name'
                        name='name'
                        value={name}
                        isError={!!nameValid}
                        onChange={onValueChange}
                        placeholder='Ingresa tu nombre completo'
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel htmlFor='email'>
                        Correo electrónico
                     </FormLabel>
                     <Input
                        id='email'
                        type='email'
                        name='email'
                        value={email}
                        isError={!!emailValid}
                        onChange={onValueChange}
                        placeholder='Ingresa tu correo electrónico'
                     />
                  </FormItem>
               </FromGroup>

               <FromGroup className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormItem>
                     <FormLabel htmlFor='phone'>
                        Teléfono
                     </FormLabel>
                     <Input
                        id='phone'
                        name='phone'
                        value={phone}
                        isError={!!phoneValid}
                        onChange={onValueChange}
                        placeholder='Ingresa tu teléfono'
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel htmlFor='address'>
                        Teléfono
                     </FormLabel>
                     <Input
                        id='address'
                        name='address'
                        value={address}
                        isError={!!addressValid}
                        onChange={onValueChange}
                        placeholder='Ingresa su dirección'
                     />
                  </FormItem>
               </FromGroup>

               <FromGroup>
                  {user.isRoleAdmin && (
                     <div className='pt-4'>
                        <Badge
                           variant='secondary'
                           className='bg-purple-100 text-purple-800'
                        >
                           Administrador
                        </Badge>
                     </div>
                  )}

                  <Button
                     // onClick={handleSaveProfile}
                     className='px-8'
                  >
                     Guardar Cambios
                  </Button>
               </FromGroup>
            </Form>
         </CardContent>
      </Card>
   )
}