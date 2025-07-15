import { useForm } from '@/hook';
import { useCreateObjectContext } from '@/hook/context';
import { AdminTableToasts } from '@/toasts';
import { cn } from '@/ultils';
import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input, Label } from '../UI/from';

const schema = {
   initial: {
      name: '',
      linkImage: '',
      width: 0,
      height: 0
   },
}
export const ModalEditItemObject = ({
   isOpen,
   onClose,
   className,
}) => {

   const {
      category,
      selectObject,
      updateObject,
      deleteObject,
      isLoadingUpdate,
      isLoadingDelete
   } = useCreateObjectContext()

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      formState: {
         name,
         linkImage,
         width,
         height,
         rotation
      },

      formValidation: {
         nameValid,
         linkImageValid,
         widthValid,
         heightValid,
         rotationValid
      }

   } = useForm({
      activeValidation: true,
      initialState: {
         ...schema.initial,
         ...selectObject,
      },
   });

   const onSubmit = onSubmitForm((value) => {
      AdminTableToasts.updateObject(
         updateObject({
            idCategory: selectObject.idCategory,
            idObject: selectObject.id,
            ...value
         })
      )
   })

   const handleDeleteObject = () => {
      AdminTableToasts.deleteObject(
         deleteObject({
            idCategory: selectObject.idCategory,
            idObject: selectObject.id,
         }), {
         onSuccess: () => {
            onClose()
         }
      })
   }

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
      >
         <Card2
            className={cn(
               className
            )}
         >
            <Form
               onSubmit={onSubmit}
            >
               <Label
                  className={'text-center'}
               >
                  Editar el item {selectObject.name}
               </Label>
               <FormLabel>
                  ID: {selectObject.id} <br />
                  Categoria: {category?.name}
               </FormLabel>

               <FormItem>
                  <FormLabel
                     htmlFor='name'
                     required
                  >
                     Nombre
                  </FormLabel>
                  <Input
                     required
                     type='text'
                     id='name'
                     name='name'
                     value={name}
                     isError={!!nameValid}
                     onChange={onValueChange}
                     variant={'crystal'}
                     size='base'
                  />
               </FormItem>

               <FormItem>
                  <FormLabel
                     htmlFor='linkImage'
                     required
                  >
                     Link Image
                  </FormLabel>
                  <Input
                     required
                     type='url'
                     id='linkImage'
                     name='linkImage'
                     value={linkImage}
                     isError={!!linkImageValid}
                     onChange={onValueChange}
                     variant={'crystal'}
                     size='base'
                  />
               </FormItem>

               <FormLabel
                  htmlFor='width'
               >
                  Tamaño en la escena
               </FormLabel>
               <FromGroup
                  className={'grid grid-cols-3 gap-4'}
               >
                  <FormItem>
                     <FormLabel
                        formItemId={'width'}
                     >
                        Width
                     </FormLabel>
                     <Input
                        type='number'
                        name='width'
                        value={width}
                        isError={!!widthValid}
                        onChange={onValueChange}
                        variant={'crystal'}
                        size='base'
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel
                        htmlFor={'height'}
                     >
                        Height
                     </FormLabel>
                     <Input
                        type='number'
                        name='height'
                        value={height}
                        isError={!!heightValid}
                        onChange={onValueChange}
                        variant={'crystal'}
                        size='base'
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel
                        htmlFor={'rotation'}
                     >
                        Rotate
                     </FormLabel>
                     <Input
                        type='number'
                        name='rotation'
                        value={rotation}
                        isError={!!rotationValid}
                        onChange={onValueChange}
                     />
                  </FormItem>
               </FromGroup>

               <FromGroup
                  className={'grid grid-cols-2 gap-4'}
               >
                  <Button
                     type='submit'
                     disabled={!isFormValid || isLoadingUpdate}
                     isLoading={isLoadingUpdate}
                  >
                     Actualizar
                  </Button>
                  <Button
                     type='button'
                     variant={'destructive'}
                     disabled={isLoadingDelete}
                     isLoading={isLoadingDelete}
                     onClick={handleDeleteObject}
                  >
                     Eliminar
                  </Button>
               </FromGroup>
            </Form>
         </Card2>
      </Modal>
   )
}
