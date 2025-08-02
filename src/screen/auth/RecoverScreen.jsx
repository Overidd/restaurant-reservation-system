import { Submiteed } from '@/components/recover';
import { Button } from '@/components/UI/common';
import { Form, FormItem, Input, LinkCustom } from '@/components/UI/from';
import { useAuthStore } from '@/hook/auth';
import { useForm } from '@/hook/common';
import { UserToasts } from '@/toasts/UserToasts';
import { Mail } from 'lucide-react';
import { useState } from 'react';


const initValidation = {
   email: [
      (value) => /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(value),
      'El correo no es válido',
   ]
};

export const RecoverScreen = () => {
   const [isSubmitted, setIsSubmitted] = useState(false)

   const {
      isLoading,
      recoverPassword,
   } = useAuthStore()
   const {
      onSubmitForm,
      onValueChange,
      formState: {
         email
      },
      formValidation: {
         emailValid
      },
   } = useForm({
      validations: initValidation,
      activeValidation: true,
      initialState: {
         email: ''
      },
   });

   const onSubmit = onSubmitForm((value) => {
      UserToasts.recoverPassword(
         recoverPassword(value.email), {
         onSuccess: () => {
            setIsSubmitted(true)
         }
      })
   });

   if (isSubmitted) {
      return (
         <Submiteed
            setIsSubmitted={setIsSubmitted}
            email={email}
         />
      )
   }
   return (
      <>
         <h2 className='text-primary-foreground/90 text-lg font-bold text-center'>
            Recuperar tu contraseña
         </h2>

         <Form
            className={'mt-8'}
            onSubmit={onSubmit}
         >
            <FormItem>

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

            <Button
               type='submit'
               disabled={isLoading}
               size='lg'
            >
               <span>
                  Enviar
               </span>
            </Button>

            <LinkCustom
               className={'text-center'}
               to={'login'}
            >
               Iniciar sesion
            </LinkCustom>

         </Form >
      </>
   )
}

export default RecoverScreen;