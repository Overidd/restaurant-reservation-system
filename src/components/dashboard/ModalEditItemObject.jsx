import { useForm } from '@/hook';
import { useCreateObjectContext } from '@/hook/context';
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
export const ModalEditItemObject = ({
   isOpen,
   onClose,
}) => {

   const {
      category,
      setSelectObject,
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
      initialState: validateObject(setSelectObject) ? {
         linkImage: setSelectObject.linkImage,
         name: setSelectObject.name,
         width: setSelectObject.width,
         height: setSelectObject.height
      } : schema.initial,
      activeValidation: true,
   });

   const onSubmit = onSubmitForm((value) => {
      AdminTableToasts.updateObject(
         updateObject({
            idCategory: setSelectObject.idCategory,
            idObject: setSelectObject.idObject,
            ...value
         }), {
         onSuccess: () => {
            onClose()
         }
      })
   })

   const handleDeleteObject = () => {
      AdminTableToasts.deleteObject(
         deleteObject({
            idCategory: setSelectObject.idCategory,
            idObject: setSelectObject.idObject
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
         <Card2>
            <Form
               onSubmit={onSubmit}
            >
               <FormItem>
                  <FormLabel>
                     Categoria: {category?.name}
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
