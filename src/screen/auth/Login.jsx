import {
   Key,
   Mail
} from 'lucide-react';

import { useForm } from '@/hook';

import { Button } from '@/components/UI/common';
import {
   Form,
   FormItem,
   FormLabel,
   Input,
   LinkCustom
} from '@/components/UI/from';
import { useAuthStore } from '@/hook/auth';

const initValidation = {
   email: [
      (value) => /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(value),
      'El correo no es válido',
   ],
   password: [
      (value) => value.length >= 4,
      'La contraseña debe tener al menos 4 caracteres',
   ]
};

const messageState = {
   loading: 'Cargando...',
   success: 'Login exitoso',
   error: 'Ocurrió un error',
}

export const LoginScreen = () => {
   const { login, loginGoogle, isLoading } = useAuthStore(messageState)

   const {
      onSubmitForm,
      onValueChange,
      formState: {
         email,
         password
      },
      formValidation: {
         emailValid,
         passwordValid
      },
   } = useForm({
      validations: initValidation,
      activeValidation: true,
      initialState: {
         email: '',
         password: ''
      },
   });

   const onSubmit = onSubmitForm((value) => {
      login(value)
   });

   return (
      <>
         <h2 className='text-primary-foreground/90 text-3xl font-bold text-center'>
            Login
         </h2>

         <Form
            onSubmit={onSubmit}
         >
            <FormItem>
               <FormLabel
                  htmlFor='email'
               >
                  Correo
               </FormLabel>
               <Input
                  id='email'
                  name='email'
                  type='email'
                  variant={'crystal'}
                  iconPosition='left'
                  placeholder={'Ingrese su correo'}
                  value={email}
                  onChange={onValueChange}
                  isError={!!emailValid}
                  icon={<Mail />}
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  htmlFor='password'
               >
                  Contraseña
               </FormLabel>
               <Input
                  id='password'
                  name='password'
                  type='password'
                  variant={'crystal'}
                  iconPosition='left'
                  value={password}
                  onChange={onValueChange}
                  isError={!!passwordValid}
                  icon={<Key />}
               />

            </FormItem>

            <LinkCustom
               className={'text-right'}
               to={'register'}
            >
               No tienes una cuenta
            </LinkCustom>

            <FormItem>
               <Button
                  type='submit'
                  disabled={isLoading}
                  className={'py-5'}
               >
                  Iniciar sesion
               </Button>

               <div className='flex flex-row gap-2 items-center justify-baseline'>
                  <div className='bg-gradient-to-l from-white/50 to-transparent h-px flex-1' />
                  <span className='w-fit text-sm'>
                     O continuar con
                  </span>
                  <div className='bg-gradient-to-r from-white/50 to-transparent h-px flex-1' />
               </div>

               <Button
                  type='button'
                  size={'icon'}
                  variant={'crystal'}
                  className={'mx-auto'}
                  onClick={loginGoogle}
               >
                  <img
                     src="/icon/icon-google.svg"
                     alt="Google"
                  />
               </Button>
            </FormItem>
         </Form>
      </>
   )
}