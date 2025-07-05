import { useForm } from '@/hook';
import { cn, validateObject } from '@/ultils';
import { Button, Modal } from '../UI/common';
import { CalendarButton } from '../UI/calendar';
import { Card2 } from '../UI/card';

import {
   Form,
   FormDescription,
   FormItem,
   FormLabel,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '../UI/from';

const hours = []

const schema = {
   initial: {
      date: '',
      hour: '',
      email: '',
      phone: '',
   },
   valid: {
      email: [
         (value) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
         'Ingrese un email válido',
      ],
      phone: [
         (value) =>
            /^9\d{8}$/.test(value),
         'Ingrese un teléfono válido de 9 dígitos que comience con 9',
      ],
   },
};

export const TableReserveModal = ({
   isOpen,
   onClose,
   className,
   initial,
}) => {
   const {
      formState: { date, hour, email, phone },
      formValidation: { emailValid, phoneValid },
      onValueChange,
      onSubmitForm,
   } = useForm({
      initialState: validateObject(initial) ? initial : schema.initial,
      validations: schema.valid,
      activeValidation: true,
   });

   const onSubmit = onSubmitForm((value) => {
      console.log(value);
   });

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         direction='topright'
         overlayClassName={'backdrop-blur-none'}
      >
         <Card2
            className={cn(
               'w-[22rem]',
               className
            )}
         >
            <Form onSubmit={onSubmit}>
               <FormItem>
                  <FormLabel
                     formItemId='date'
                  >
                     Fecha
                  </FormLabel>
                  <CalendarButton
                     date={date}
                     name={'date'}
                     variant={'crystal'}
                     onValueChange={onValueChange}
                     btnClassName={'w-full'}
                  />
               </FormItem>

               <FormItem>
                  <FormLabel
                     formItemId='hour'
                  >
                     Hora
                  </FormLabel>

                  <Select
                     name={'hour'}
                     value={hour || undefined}
                     onValueChange={onValueChange}
                  >
                     <SelectTrigger
                        variant='crystal'
                        className='w-full shadow-xl'
                     >
                        <SelectValue
                           placeholder='Seleccione una hora'
                        />
                     </SelectTrigger>
                     <SelectContent>
                        {hours.map((item, index) => (
                           <SelectItem
                              key={item.id || 'hour' + index}
                              value={item.hour}
                           >
                              {item.hour}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </FormItem>

               <FormItem>
                  <FormLabel
                     formItemId='email'
                  >
                     Email
                  </FormLabel>

                  <Input
                     id='email'
                     type='email'
                     name='email'
                     value={email}
                     variant='crystal'
                     iconPosition='right'
                     onChange={onValueChange}
                     isError={!!emailValid}
                     activeEventIcon={true}
                     className={'py-3'}
                     icon={
                        <Button
                           size='sm'
                           type='button'
                           variant='crystal'
                           onClick={() => console.log('Buscar')}
                        >
                           Buscar
                        </Button>
                     }
                  />
                  <FormDescription>
                     Buscar por email
                  </FormDescription>
               </FormItem>

               <FormItem>
                  <FormLabel
                     formItemId='phone'
                  >
                     Telefono
                  </FormLabel>
                  <Input
                     id='phone'
                     type='text'
                     name='phone'
                     value={phone}
                     onChange={onValueChange}
                     isError={!!phoneValid}
                     variant='crystal'
                     className={'py-3'}
                  />
               </FormItem>

               <FormItem>
                  <Button
                     size={'lg'}
                     type='submit'
                     className='mt-2'
                  >
                     Reservar
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </Modal>
   )
}