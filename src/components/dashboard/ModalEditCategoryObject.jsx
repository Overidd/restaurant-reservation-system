import { useForm } from '@/hook';
import { useSelectCategoryContext } from '@/hook/context';
import { useObjectCategories } from '@/hook/fetchings';
import { useModalEditCategoryObject } from '@/hook/modals';
import { AdminTableToasts } from '@/toasts';
import { validateObject } from '@/ultils';
import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { Form, FormItem, FormLabel, Input, Label } from '../UI/from';

export const ModalEditCategoryObject = () => {
   const {
      categorySelected
   } = useSelectCategoryContext()

   const {
      isOpen,
      closeModal,
   } = useModalEditCategoryObject()

   const {
      isLoadingUpdate,
      isLoadingDelete,
      updateObjectCategory,
      deleteObjectCategory,
   } = useObjectCategories({ isInitialLoad: false })

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
      initialState: validateObject(categorySelected) ? {
         name: categorySelected.name
      } : {
         name: ''
      },
      activeValidation: true,
   });

   const onSubmit = onSubmitForm(() => {
      AdminTableToasts.updateCategory(
         updateObjectCategory({
            idCategory: categorySelected.idCategory,
            name
         }), {
         onSuccess: () => onResetForm()
      })
   })

   const handleDeleteObject = () => {
      AdminTableToasts.deleteCategory(
         deleteObjectCategory(categorySelected.idCategory), {
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
               <Label className={'text-center'}>
                  Nueva Categoria
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
