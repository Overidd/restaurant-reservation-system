import { useForm } from '@/hook';
import { Card2 } from '../UI/card';
import { cn, validateObject } from '@/ultils';
import { Button, Modal } from '../UI/common';
import { Checkbox, Form, FormItem, FormLabel } from '../UI/from';

const schema = {
   initial: {
      name: '',
      description: '',
      linkImage: '',
      isReservable: false,
   },
   valid: {
      name: [
         (value) => value.length >= 3,
         'El nombre debe tener al menos 3 caracteres',
      ],
      description: [
         (value) => value.length >= 3,
         'La descripción debe tener al menos 3 caracteres',
      ],
      linkImage: [
         (value) => value.length >= 3,
         'El link de la imagen debe tener al menos 3 caracteres',
      ],
   },
}

export const TableEditPropertyModal = ({
   className,
   initial,
   isOpen,
   onClose
}) => {
   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      formState: { name, description, linkImage, isReservable },
      formValidation: { nameValid, descriptionValid, linkImageValid },
   } = useForm({
      initialState: validateObject(initial) ? initial : schema.initial,
      validations: schema.valid,
      activeValidation: true,
   });

   const onSubmit = onSubmitForm((value) => {
      console.log(value)
   })

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         direction='topright'
         overlayClassName={'backdrop-blur-none'}
      >
         <Card2
            className={cn(
               className
            )}
         >
            <Form onSubmit={onSubmit}>
               <FormItem>
                  <FormLabel
                     formItemId={'name'}
                  >
                     Nombre
                  </FormLabel>
                  <Input
                     max={12}
                     min={1}
                     type='text'
                     name='name'
                     variant='crystal'
                     value={name ?? ''}
                     onChange={onValueChange}
                     isError={!!nameValid}
                     className={'!text-lg py-1'}
                  />
               </FormItem>

               <FormItem>
                  <FormLabel
                     formItemId={'description'}
                  >
                     Descripcion
                  </FormLabel>
                  <Input
                     max={12}
                     min={1}
                     type='text'
                     name='name'
                     variant='crystal'
                     value={description ?? ''}
                     onChange={onValueChange}
                     isError={!!descriptionValid}
                     className={'!text-lg py-1'}
                  />
               </FormItem>

               <FormItem>
                  <FormLabel
                     formItemId={'linkImage'}
                  >
                     Link Image
                  </FormLabel>
                  <Input
                     type='text'
                     name='linkImage'
                     variant='crystal'
                     value={linkImage ?? ''}
                     onChange={onValueChange}
                     isError={!!linkImageValid}
                     className={'!text-lg py-1'}
                  />
               </FormItem>


               <FormItem>
                  <Checkbox
                     id='isReservable'
                     name={'isReservable'}
                     checked={isReservable}
                     onChange={onValueChange}
                  />
                  <FormLabel
                     formItemId={'isReservable'}
                  >
                     Es reservable
                  </FormLabel>
               </FormItem>

               <FormItem>
                  <Button>
                     Editar Propiedades
                  </Button>
               </FormItem>

               <FormItem>
                  <Button
                     disabled={!isFormValid}
                  >
                     Actualizar
                  </Button>

                  <Button>
                     Eliminar
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </Modal>
   )
}
