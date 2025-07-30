import { useUser, useUserSettings } from '@/hook/auth';
import { useForm } from '@/hook/common';
import { cn, Validations } from '@/ultils';
import { LoaderCircle, Phone } from 'lucide-react';
import { useEffect } from 'react';
import { Card2 } from '../card';
import { Button, CardContent, CardHeader, CardTitle } from '../common';
import { Form, FormItem, Input } from '../from';

const initValidation = {
   phone: [
      (value) => Validations.phone(value),
      'El número de teléfono es obligatorio',
   ],
};

export const DialogEnterPhone = ({
   onConfirm,
}) => {

   const {
      id,
      isRegisterPhone,
   } = useUser()

   const {
      loading,
      updatePhone,
   } = useUserSettings()

   const {
      onSubmitForm,
      onValueChange,
      formState: {
         phone
      },
      formValidation: {
         phoneValid
      },
   } = useForm({
      validations: initValidation,
      activeValidation: true,
      initialState: {
         phone: '',
      },
   });

   const onSubmit = onSubmitForm((value) => {
      updatePhone({
         phone: value.phone,
         idUser: id,
      })
   });
   // console.log(isRegisterPhone);
   useEffect(() => {
      if (!isRegisterPhone) return;
      onConfirm();
   }, [isRegisterPhone])

   return (
      <Card2 className={cn(
         'space-y-4'
      )}>
         <CardHeader className={'gap-3'}>
            <CardTitle className={'text-background text-center text-sm md:text-md'}>
               Antes de continuar su reserva, ingresa su número de teléfono
            </CardTitle>
         </CardHeader>

         <CardContent>
            <Form
               onSubmit={onSubmit}
            >
               <FormItem>
                  <Input
                     type='number'
                     name='phone'
                     value={phone}
                     isError={!!phoneValid}
                     onChange={onValueChange}
                     placeholder='Tu número de teléfono'
                  />
               </FormItem>

               <Button
                  className={'space-y-2'}
                  disabled={loading.updateProfile}
                  type='submit'
                  size={'sm'}
               >
                  Confirmar
                  {loading.updateProfile
                     ? <LoaderCircle
                        className='animate-spin'
                     />
                     : <Phone />
                  }
               </Button>
            </Form>
         </CardContent>
      </Card2>
   )
}

