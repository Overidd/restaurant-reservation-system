import { useForm } from '@/hook';
import { useObjectCategories, useObjects } from '@/hook/fetchings';
import { useModalCreateItemObject } from '@/hook/modals';
import { AdminTableToasts } from '@/toasts';
import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/from';


const schema = {
   initial: {
      name: '',
      linkImage: '',
      category: '',
      width: 0,
      height: 0
   },
}

export const ModalCreateItemObject = () => {
   const {
      isOpen,
      closeModal
   } = useModalCreateItemObject()

   const {
      categorys,
      isLoadingLoad,
      getIdCategoryByName
   } = useObjectCategories({ isInitialLoad: true })

   const {
      createObject,
      isLoadingCreate,
   } = useObjects()

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      onResetForm,
      formState: {
         category,
         name,
         linkImage,
         width,
         height,
      },

      formValidation: {
         nameValid,
         linkImageValid,
         widthValid,
         heightValid
      }

   } = useForm({
      initialState: schema.initial,
      activeValidation: true,
   });

   const onSubmit = onSubmitForm((value) => {
      AdminTableToasts.createObject(
         createObject({
            name: value.name,
            linkImage: value.linkImage,
            width: value.width,
            height: value.height,
            idCategory: getIdCategoryByName(value.category),
         }), {
         onSuccess: () => {
            onResetForm()
         }
      })
   })

   return (
      <Modal
         isOpen={isOpen}
         onClose={closeModal}
      >
         <Card2>
            <Form
               onSubmit={onSubmit}
            >
               <FormItem
                  className={'flex-1'}
               >
                  <FormLabel>
                     Categoria
                  </FormLabel>
                  <Select
                     value={category || undefined}
                     onValueChange={onValueChange}
                  >
                     <SelectTrigger
                        isLoading={isLoadingLoad}
                        disabled={isLoadingLoad}
                        variant='crystal'
                        className='w-full'
                        name='category'
                        id='category'
                     >
                        <SelectValue
                           placeholder='Selecciona una categoria'
                        />
                     </SelectTrigger>
                     <SelectContent>
                        {categorys.map((item) => (
                           <SelectItem
                              key={item.id}
                              value={item.name}
                           >
                              {item.name}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
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
               </FromGroup>

               <FormItem>
                  <Button
                     type='submit'
                     disabled={!isFormValid || isLoadingCreate}
                     isLoading={isLoadingCreate}
                  >
                     Crear nuevo item
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </Modal>
   )
}