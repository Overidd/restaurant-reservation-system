import { useForm } from '@/hook/common';
import { useCreateObjectContext } from '@/hook/context';
import { AdminTableToasts } from '@/toasts';
import { cn, Validations } from '@/ultils';
import { BetweenHorizontalStart, BetweenVerticalStart, RotateCwSquare } from 'lucide-react';
import { Card2 } from '../../UI/card';
import { Button, Modal } from '../../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input, Label, NumberInput } from '../../UI/from';
import { ObjectPreview } from '../create';

const schema = {
   initial: {
      name: '',
      image: '',
      width: 0,
      height: 0
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
      isLoadingDelete,
      setSelectObject
   } = useCreateObjectContext()

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      formState: {
         name,
         image,
         width,
         height,
         rotation
      },

      formValidation: {
         nameValid,
         imageValid,
         widthValid,
         heightValid,
         rotationValid
      }

   } = useForm({
      activeValidation: true,
      validations: schema.validation,
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
            data: {
               name: value.name,
               image: value.image,
               width: value.width,
               height: value.height,
               rotation: value.rotation,
            }
         }), {
         onSuccess: () => {
            setSelectObject({
               ...selectObject,
               name: value.name,
               image: value.image,
               width: value.width,
               height: value.height,
               rotation: value.rotation
            })
         }
      })
   })

   const handleDeleteObject = () => {
      AdminTableToasts.deleteObject(
         deleteObject({
            idCategory: selectObject.idCategory,
            idObject: selectObject.id,
         }), {
         onSuccess: () => {
            onClose()
            setSelectObject(null)
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
               <Label
                  className={'text-center'}
               >
                  Editar el item {selectObject?.name}
               </Label>

               <ObjectPreview
                  name={name}
                  image={image}
                  width={width}
                  height={height}
                  rotation={rotation}
                  className={'mb-4'}
               />

               <FormLabel>
                  ID: {selectObject?.id} <br />
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
                     htmlFor='image'
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
                        htmlFor={'width'}
                     >
                        Width
                     </FormLabel>
                     <NumberInput
                        min={1}
                        max={15}
                        axis='x'
                        name={'width'}
                        value={width}
                        isError={!!widthValid}
                        onChange={onValueChange}
                        prefix={<BetweenVerticalStart size={14} />}
                        sensitivity={0.03}
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel
                        htmlFor={'height'}
                     >
                        Height
                     </FormLabel>
                     <NumberInput
                        min={1}
                        max={15}
                        axis='y'
                        name={'height'}
                        value={height}
                        isError={!!heightValid}
                        onChange={onValueChange}
                        prefix={<BetweenHorizontalStart size={14} />}
                        sensitivity={0.03}
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel
                        htmlFor={'rotation'}
                     >
                        Rotate
                     </FormLabel>
                     <NumberInput
                        min={0}
                        max={360}
                        step={10}
                        axis='x'
                        name={'rotation'}
                        value={rotation}
                        isError={!!rotationValid}
                        onChange={onValueChange}
                        prefix={<RotateCwSquare size={14} />}
                        sensitivity={0.2}
                     />
                  </FormItem>
               </FromGroup>

               <FromGroup
                  className={'grid grid-cols-2 gap-4'}
               >
                  <Button
                     type='submit'
                     disabled={!isFormValid || isLoadingUpdate}
                  >
                     Actualizar
                  </Button>
                  <Button
                     type='button'
                     variant={'destructive'}
                     disabled={isLoadingDelete}
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
