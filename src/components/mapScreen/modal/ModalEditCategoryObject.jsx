import { useForm } from '@/hook/common';
import { useCreateCategoryContext } from '@/hook/context';
import { AdminTableToasts } from '@/toasts';
import { cn } from '@/ultils';
import { Card2 } from '../../UI/card';
import { Button, Modal } from '../../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input, Label } from '../../UI/from';

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

export const ModalEditCategoryObject = ({
   isOpen = false,
   onClose,
   className,
}) => {

   const {
      category,
      setCategory,
      isLoadingUpdate,
      isLoadingDelete,
      updateObjectCategory,
      deleteObjectCategory,
   } = useCreateCategoryContext()

   const {
      onSubmitForm,
      onValueChange,
      formState: {
         name,
      },
      formValidation: {
         nameValid,
      }
   } = useForm({
      activeValidation: true,
      validations: schema.validation,
      initialState: {
         name: category.name || schema.initial.name,
      },
   });

   const onSubmit = onSubmitForm(({ name }) => {
      AdminTableToasts.updateCategory(
         updateObjectCategory({
            idCategory: category.id,
            name: name
         }), {
         onSuccess: () => {
            setCategory({
               ...category,
               name
            })
         }
      }
      )
   })

   const handleDeleteObject = () => {
      AdminTableToasts.deleteCategory(
         deleteObjectCategory(category.id), {
         onSuccess: () => {
            onClose()
            setCategory(null)
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
               noValidate
               onSubmit={onSubmit}
            >
               <Label className={'text-center'}>
                  Edtiar la categoria {category.name}
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

               <FromGroup
                  className={'flex flex-row gap-4 justify-end'}
               >
                  <Button
                     disabled={isLoadingUpdate}
                     size={'lg'}
                     type='submit'
                     className={'inline-block align-middle transition-all duration-300'}
                  >
                     Actualizar
                  </Button>
                  <Button
                     disabled={isLoadingDelete}
                     onClick={handleDeleteObject}
                     size={'lg'}
                     type='button'
                     variant={'destructive'}
                     className={'inline-block align-middle transition-all duration-300'}
                  >
                     Eliminar
                  </Button>
               </FromGroup>
            </Form>
         </Card2>
      </Modal>
   )
}
