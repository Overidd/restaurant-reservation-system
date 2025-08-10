import { useForm } from '@/hook/common';
import { useCreateCategoryContext } from '@/hook/context';
import { AdminTableToasts } from '@/toasts';
import { cn } from '@/ultils';
import { useEffect, useRef } from 'react';
import { Card2 } from '../../UI/card';
import { Button, Modal } from '../../UI/common';
import { Form, FormItem, FormLabel, Input, Label } from '../../UI/from';

const schema = {
   initial: {
      name: '',
   },
   validation: {
      name: [
         (value) => value.length >= 3,
         'El nombre debe tener al menos 3 caracteres',
      ],
   },
}

export const ModalCreateCategoryObject = ({
   isOpen = false,
   onClose,
   className,
}) => {
   const {
      isLoadingCreate,
      createObjectCategory,
   } = useCreateCategoryContext();

   const {
      onSubmitForm,
      onValueChange,
      onResetForm,
      formState: { name },
      formValidation: { nameValid },
   } = useForm({
      validations: schema.validation,
      initialState: schema.initial,
      activeValidation: true,
   });

   const inputRef = useRef(null);

   const onSubmit = onSubmitForm(() => {
      AdminTableToasts.createCategory(
         createObjectCategory(name), {
         onSuccess: () => onResetForm()
      });
   });

   useEffect(() => {
      window.requestAnimationFrame(() => {
         inputRef.current?.focus()
      })
   }, [])

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
      >
         <Card2
            className={cn(className)}
         >
            <Form
               noValidate
               onSubmit={onSubmit}
            >
               <Label className='text-center'>
                  Nueva Categoria
               </Label>

               <FormItem>
                  <FormLabel href='name' required>
                     Nombre
                  </FormLabel>
                  <Input
                     required
                     type='text'
                     id='name'
                     name='name'
                     value={name}
                     ref={inputRef}
                     isError={!!nameValid}
                     onChange={onValueChange}
                     variant='crystal'
                     size='lg'
                  />
               </FormItem>

               <FormItem>
                  <Button
                     type='submit'
                     size='lg'
                     className='inline-block align-middle'
                     disabled={isLoadingCreate}
                  >
                     Crear
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </Modal>
   );
};
