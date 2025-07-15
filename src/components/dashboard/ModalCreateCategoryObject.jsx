import { useForm } from '@/hook';
import { useCreateCategoryContext } from '@/hook/context';
import { AdminTableToasts } from '@/toasts';
import { cn } from '@/ultils';
import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { Form, FormItem, FormLabel, Input, Label } from '../UI/from';

export const ModalCreateCategoryObject = ({
   isOpen = false,
   onClose,
   className,
}) => {

   const {
      isLoadingCreate,
      createObjectCategory,
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
      initialState: {
         name: ''
      },
      activeValidation: true,
   });

   const onSubmit = onSubmitForm(() => {
      AdminTableToasts.createCategory(
         createObjectCategory(name), {
         onSuccess: () => onResetForm()
      })
   })

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
                     disabled={isLoadingCreate}
                     isLoading={isLoadingCreate}
                  >
                     Crear
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </Modal>
   )
}
