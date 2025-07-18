import { useForm } from '@/hook';
import { cn, validateObject } from '@/ultils';
import { Pen, Trash } from 'lucide-react';
import { useEffect } from 'react';
import { Card2 } from '../../UI/card';
import { Button, SlideOver } from '../../UI/common';

import {
   Checkbox,
   Form,
   FormItem,
   FormLabel,
   FromGroup,
   Input
} from '../../UI/from';

const schema = {
   initial: {
      name: '',
      description: '',
      image: '',
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
      image: [
         (value) => value.length >= 3,
         'El link de la imagen debe tener al menos 3 caracteres',
      ],
   },
}

export const EditTableSlide = ({
   className,
   initial ={},
   isOpen,
   onClose,
   onOpenEditProperty,
}) => {

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      onInitialFrom,
      formState: {
         name,
         description,
         image,
         isReservable
      },
      formValidation: {
         nameValid,
         descriptionValid,
         imageValid
      },
   } = useForm({
      initialState: validateObject(initial) ? initial : schema.initial,
      validations: schema.valid,
      activeValidation: true,
   });

   useEffect(() => {
      if (!initial.id || !isOpen) return
      onInitialFrom(initial)
   }, [initial.id, isOpen])


   const onSubmit = onSubmitForm((value) => {
      console.log(value)
   })

   return (
      <SlideOver
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
                     htmlFor={'isReservable'}
                  >
                     Es reservable
                  </FormLabel>
               </FormItem>

               <FormItem>
                  <FormLabel
                     htmlFor={'name'}
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
                     htmlFor={'description'}
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
                     htmlFor={'image'}
                  >
                     Link Image
                  </FormLabel>
                  <Input
                     type='link'
                     name='image'
                     variant='crystal'
                     id={'image'}
                     value={image ?? ''}
                     onChange={onValueChange}
                     isError={!!imageValid}
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
      </SlideOver>
   )
}