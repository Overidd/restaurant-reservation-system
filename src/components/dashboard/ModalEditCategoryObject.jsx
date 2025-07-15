import { useForm } from '@/hook';
import { useCreateCategoryContext } from '@/hook/context';
import { AdminTableToasts } from '@/toasts';
import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { Form, FormItem, FormLabel, Input, Label } from '../UI/from';

export const ModalEditCategoryObject = ({
   isOpen = false,
   onClose,
}) => {

   const {
      category,
      isLoadingUpdate,
      isLoadingDelete,
      updateObjectCategory,
      deleteObjectCategory,
   } = useCreateCategoryContext()

   const {
      onSubmitForm,
      onValueChange,
      onResetForm,
      formState: {
         name,
      },
      formValidation: {
         nameValid,
      }
   } = useForm({
      activeValidation: true,
      initialState: {
         name: category.name || '',
      },
   });

   const onSubmit = onSubmitForm(({ name }) => {
      AdminTableToasts.updateCategory(
         updateObjectCategory({
            idCategory: category.id,
            name: name
         }), {
         onSuccess: () => {
            onResetForm()
         }
      })
   })

   const handleDeleteObject = () => {
      AdminTableToasts.deleteCategory(
         deleteObjectCategory(category.id), {
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
               <Label className={'text-center'}>
                  Actualizar categoría
               </Label>
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
                  <Button
                     type='submit'
                     size={'lg'}
                     className={'inline-block align-middle'}
                     disabled={isLoadingUpdate}
                     isLoading={isLoadingUpdate}
                  >
                     Actualizar
                  </Button>
                  <Button
                     type='button'
                     variant={'destructive'}
                     size={'lg'}
                     className={'inline-block align-middle'}
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
