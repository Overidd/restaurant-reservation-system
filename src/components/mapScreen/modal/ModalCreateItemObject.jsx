import { useForm } from '@/hook';
import { useCreateObjectContext } from '@/hook/context';
import { AdminTableToasts } from '@/toasts';
import { cn, Validations } from '@/ultils';
import { Card2 } from '../../UI/card';
import { Button, Modal } from '../../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input, Label } from '../../UI/from';


const schema = {
   initial: {
      name: '',
      image: '',
      width: 0,
      height: 0,
      rotation: 0
   },
   validation: {
      name: [
         (value) => value.length >= 3,
         'El nombre debe tener al menos 3 caracteres',
      ],
      image: [
         (value) => Validations.urlImage(value),
         'La url de la imagen no es valida',
      ],
      width: [
         (value) => value > 0 && value <= 15, //Todo: El ancho debe tomar la medida del tablero
         'El ancho debe ser mayor a 0',
      ],
      height: [
         (value) => value > 0 && value <= 15, //Todo: El alto debe tomar la medida del tablero
         'El alto debe ser mayor a 0',
      ],
      rotation: [
         (value) => value >= 0 && value <= 360,
         'La rotacion debe ser mayor o igual a 0',
      ],
   }
}

export const ModalCreateItemObject = ({
   isOpen,
   onClose,
   className
}) => {

   const {
      category,
      createObject,
      isLoadingCreate,
   } = useCreateObjectContext()

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      onResetForm,
      formState: {
         name,
         image,
         width,
         height,
         rotation,
      },

      formValidation: {
         nameValid,
         imageValid,
         widthValid,
         heightValid,
         rotationValid
      }

   } = useForm({
      initialState: schema.initial,
      validations: schema.validation,
      activeValidation: true,
   });

   const onSubmit = onSubmitForm((value) => {
      if (!category) {
         return
      }

      AdminTableToasts.createObject(
         createObject({
            name: value.name,
            image: value.image,
            width: value.width,
            height: value.height,
            rotation: value.rotation,
            idCategory: category.id,
         }), {
         onSuccess: () => {
            onResetForm()
         }
      })
   })

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
      >
         <Card2>
            <Form
               noValidate
               onSubmit={onSubmit}
               className={cn(
                  className
               )}
            >
               <Label className={'text-center'}>
                  Crear un nuevo item
               </Label>
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
                     size='base'
                  />
               </FormItem>

               <FormItem>
                  <FormLabel
                     href='image'
                     required
                  >
                     Link Image
                  </FormLabel>
                  <Input
                     required
                     type='url'
                     id='image'
                     name='image'
                     value={image}
                     isError={!!imageValid}
                     onChange={onValueChange}
                     variant={'crystal'}
                     size='base'
                  />
               </FormItem>

               <FormLabel className={'basis-full'}>
                  Tamaño en la escena
               </FormLabel>

               <FromGroup
                  className={'grid grid-cols-3 gap-4'}
               >

                  <FormItem>
                     <FormLabel
                        htmlFor={'width'}
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

               <FormItem>
                  <Button
                     type='submit'
                     disabled={isLoadingCreate}
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