import { cn } from '@/ultils';
import { Pen, Trash } from 'lucide-react';
import { Card2 } from '../../UI/card';
import { Button, SlideOver } from '../../UI/common';

import { DialigDeleteTable } from '@/components/UI/dialog';
import { useForm, useModalAsync } from '@/hook/common';
import { useResource } from '@/hook/dashboard';
import { AdminTableToasts } from '@/toasts';
import { useEffect } from 'react';
import {
   Checkbox,
   Form,
   FormItem,
   FormLabel,
   FromGroup,
   Input,
   Label
} from '../../UI/from';

const schema = {
   initial: {
      name: '',
      description: '',
      image: '',
      isBlocked: false,
   },
   valid: {
      name: [
         (value) => value.length >= 2,
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
   isOpen,
   onClose,
   restaurant,
   onOpenEditProperty,
   selectedResource = {},
}) => {
   const { showAsyncModal } = useModalAsync();

   const {
      updateTable,
      deleteTable,
      isLoadingUpdateTable,
      isLoadingDeleteTable,
   } = useResource();

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      onInitialFrom,
      formState: {
         name,
         description,
         image,
         isBlocked
      },
      formValidation: {
         nameValid,
         descriptionValid,
         imageValid
      },
   } = useForm({
      validations: schema.valid,
      activeValidation: true,
      initialState: {
         ...schema.initial,
         name: selectedResource?.name,
         image: selectedResource?.image,
         description: selectedResource?.description,
         isBlocked: selectedResource?.isBlocked
      },
   });

   const handleDeleteTable = async (table) => {
      const confirmed = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialigDeleteTable
            onCancel={onCancel}
            onConfirm={onConfirm}
            table={table}
         />
      ));

      if (confirmed) {
         AdminTableToasts.deleteTable(
            deleteTable({
               table,
               idTable: table?.id,
               idRestaurant: restaurant?.id
            })
         )
      }
   }

   const onSubmit = onSubmitForm((value) => {
      AdminTableToasts.updateTable(
         updateTable({
            ...value,
            idTable: selectedResource?.id,
            idRestaurant: restaurant?.id
         })
      )
   })

   useEffect(() => {
      if (selectedResource?.id) {
         onInitialFrom({
            ...schema.initial,
            name: selectedResource?.name,
            image: selectedResource?.image,
            description: selectedResource?.description,
            isBlocked: selectedResource?.isBlocked
         })
      }
   }, [selectedResource?.id])


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
               <Label className={'text-center w-full'}>
                  Actualizar mesa
               </Label>

               <FormItem className={'flex items-center'}>
                  <Checkbox
                     id='isBlocked'
                     name={'isBlocked'}
                     checked={isBlocked}
                     onChange={onValueChange}
                  />
                  <FormLabel
                     htmlFor={'isBlocked'}
                  >
                     Bloqueo permanentemente
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
                     size='base'
                     variant='crystal'
                     value={name ?? ''}
                     onChange={onValueChange}
                     isError={!!nameValid}
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
                        disabled={isLoadingDeleteTable}
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
                        onClick={() => handleDeleteTable(selectedResource)}
                     >
                        <Trash />
                     </Button>
                  </FormItem>
               </FromGroup>

               <FormItem>
                  <Button
                     disabled={!isFormValid || isLoadingUpdateTable}
                  >
                     Actualizar
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </SlideOver>
   )
}