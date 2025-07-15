import { useForm } from '@/hook';
import { useSelectCategoryContext } from '@/hook/context';
import { useObjects } from '@/hook/fetchings';
import { useModalEditItemObject } from '@/hook/modals';
import { AdminTableToasts } from '@/toasts';
import { validateObject } from '@/ultils';
import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input } from '../UI/from';

const schema = {
   initial: {
      name: '',
      linkImage: '',
      width: 0,
      height: 0
   },
}
export const ModalEditItemObject = () => {
   const {
      categorySelected
   } = useSelectCategoryContext()

   const {
      isOpen,
      closeModal,
      currentData,
   } = useModalEditItemObject()

   const {
      updateObject,
      deleteObject,
      isLoadingUpdate,
      isLoadingDelete
   } = useObjects()

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
      initialState: validateObject(currentData) ? {
         linkImage: currentData.linkImage,
         name: currentData.name,
         width: currentData.width,
         height: currentData.height
      } : schema.initial,
      activeValidation: true,
   });

   const onSubmit = onSubmitForm((value) => {
      AdminTableToasts.updateObject(
         updateObject({
            idCategory: currentData.idCategory,
            idObject: currentData.idObject,
            ...value
         }), {
         onSuccess: () => {
            closeModal()
         }
      })
   })

   const handleDeleteObject = () => {
      AdminTableToasts.deleteObject(
         deleteObject({
            idCategory: currentData.idCategory,
            idObject: currentData.idObject
         }), {
         onSuccess: () => {
            closeModal()
         }
      })
   }

   return (
      <Modal
         isOpen={isOpen}
         onClose={closeModal}
      >
         <Card2>
            <Form
               onSubmit={onSubmit}
            >
               <FormItem>
                  <FormLabel>
                     Categoria: {categorySelected?.name}
                  </FormLabel>
               </FormItem>

               <FormItem>
                  <FormLabel
                     href='name'
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
                     size='lg'
                  />
               </FormItem>

               <FormItem>
                  <FormLabel
                     href='linkImage'
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
                     size='lg'
                  />
               </FormItem>

               <FromGroup
                  className={'flex flex-wrap gap-4'}
               >
                  <FormLabel className={'basis-full'}>
                     Tamaño en la escena
                  </FormLabel>

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
                        size='lg'
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel
                        formItemId={'height'}
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
                        size='lg'
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel
                        formItemId={'rotation'}
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

               <FormItem>
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
               </FormItem>
            </Form>
         </Card2>
      </Modal>
   )
}
