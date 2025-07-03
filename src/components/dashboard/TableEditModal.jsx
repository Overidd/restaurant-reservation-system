import { useForm } from '@/hook';
import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { cn, validateObject } from '@/ultils';
import { Checkbox, Form, FormItem, FormLabel, FromGroup, Input } from '../UI/from';
import { useEffect } from 'react';
import { Pen, Trash } from 'lucide-react';

const schema = {
   initial: {
      name: '',
      description: '',
      linkImage: '',
      isReservable: false,
   },
   valid: {
      name: [
         (value) => value.length >= 3,
         'El nombre debe tener al menos 3 caracteres',
      ],
      description: [
         (value) => value.length >= 3,
         'La descripción debe tener al menos 3 caracteres',
      ],
      linkImage: [
         (value) => value.length >= 3,
         'El link de la imagen debe tener al menos 3 caracteres',
      ],
   },
}

export const TableEditModal = ({
   className,
   initial,
   isOpen,
   onClose,
   onOpenEditProperty,
}) => {

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      onInitialFrom,
      formState: { name, description, linkImage, isReservable },
      formValidation: { nameValid, descriptionValid, linkImageValid },
   } = useForm({
      initialState: validateObject(initial) ? initial : schema.initial,
      validations: schema.valid,
      activeValidation: true,
   });

   useEffect(() => {
      onInitialFrom(initial)
   }, [initial])


   const onSubmit = onSubmitForm((value) => {
      console.log(value)
   })

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         direction='topright'
         overlayClassName={'backdrop-blur-none'}
      >
         <Card2
            className={cn(
               className
            )}
         >
            <Form onSubmit={onSubmit}>

               <FormItem className={'flex items-center'}>
                  <Checkbox
                     id='isReservable'
                     name={'isReservable'}
                     checked={isReservable}
                     onChange={onValueChange}
                  />

                  <FormLabel
                     formItemId={'isReservable'}
                  >
                     Es reservable
                  </FormLabel>
               </FormItem>

               <FormItem>
                  <FormLabel
                     formItemId={'name'}
                  >
                     Nombre
                  </FormLabel>
                  <Input
                     type='text'
                     name='name'
                     id={'name'}
                     variant='crystal'
                     value={name ?? ''}
                     onChange={onValueChange}
                     isError={!!nameValid}
                     className={'!text-base py-1'}
                  />
               </FormItem>

               <FormItem>
                  <FormLabel
                     formItemId={'description'}
                  >
                     Descripcion
                  </FormLabel>
                  <Input
                     type='text'
                     name='description'
                     id={'description'}
                     variant='crystal'
                     value={description ?? ''}
                     onChange={onValueChange}
                     isError={!!descriptionValid}
                     className={'!text-base py-1'}
                  />
               </FormItem>

               <FormItem>
                  <FormLabel
                     formItemId={'linkImage'}
                  >
                     Link Image
                  </FormLabel>
                  <Input
                     type='link'
                     name='linkImage'
                     variant='crystal'
                     id={'linkImage'}
                     value={linkImage ?? ''}
                     onChange={onValueChange}
                     isError={!!linkImageValid}
                     className={'!text-base py-1'}
                  />
               </FormItem>

               <FromGroup
                  className={'flex gap-5'}
               >
                  <FormItem >
                     <FormLabel>
                        Editar Propiedad
                     </FormLabel>
                     <Button
                        type='button'
                        onClick={onOpenEditProperty}
                        variant={'crystal'}
                        size={'icon'}
                     >
                        <Pen />
                     </Button>
                  </FormItem>

                  <FormItem>
                     <FormLabel>
                        Eliminar
                     </FormLabel>
                     <Button
                        type='button'
                        variant={'crystal'}
                        size={'icon'}
                     >
                        <Trash />
                     </Button>
                  </FormItem>
               </FromGroup>

               <FormItem>
                  <Button
                     disabled={!isFormValid}
                  >
                     Actualizar
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </Modal>
   )
}