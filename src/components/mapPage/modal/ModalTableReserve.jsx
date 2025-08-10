
import { useReservation } from '@/hook/dashboard';
import { useGetUserFetchin } from '@/hook/fetchings';

import { cn } from '@/ultils';
import { Card2, UserCard } from '../../UI/card';

import {
   Button,
   Modal
} from '../../UI/common';

import {
   Form,
   FormDescription,
   FormItem,
   FormLabel,
   FromGroup,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '../../UI/from';

import { useUserSearch } from '@/hook/auth';
import { useForm } from '@/hook/common';
import { ReservationToast } from '@/toasts';
import {
   Calendar,
   CalendarClock,
   LoaderCircle,
   UserSearch,
} from 'lucide-react';

const schema = {
   initial: {
      email: '',
      phone: '',
      diners: '',
      name: '',
   },
   valid: {
      email: [
         (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
         'Ingrese un email válido',
      ],
      name: [
         (value) => value.trim().length > 0,
         'El nombre es obligatorio',
      ],
      phone: [
         (value) => /^9\d{8}$/.test(value),
         'Ingrese un teléfono válido de 9 dígitos que comience con 9',
      ],
      diners: [
         (value) => value > 0,
         'El número de comensales debe ser mayor a 0',
      ],
   },
};

export const ModalTableReserve = ({
   isOpen,
   onClose,
   className,
   currentTable,
   currentHour,
   currentDate,
   currentRestaurant,
}) => {

   const {
      reserveTable,
      isLoading: isLoadingReservation
   } = useReservation()

   const {
      clearUser,
      errorMessage,
      getUserByEmail,
      isFoundUser,
      isLoading,
      user
   } = useGetUserFetchin()

   const {
      btnSearchRef,
      hasSearched,
      isBlockedFields,
      animateSearchButton,
      handleGetUserByEmail,
      onChangeEmailOrClear,
   } = useUserSearch({
      clearUser,
      getUserByEmail,
      isFoundUser
   })

   const {
      formState: {
         email,
         phone,
         diners,
         name
      },
      formValidation: {
         emailValid,
         phoneValid,
         dinersValid,
         nameValid
      },
      onValueChange,
      onSubmitForm,
   } = useForm({
      initialState: schema.initial,
      validations: schema.valid,
      activeValidation: true,
      changeValueCallback: onChangeEmailOrClear,
   });

   const onSubmit = onSubmitForm((value) => {
      if (!hasSearched) {
         animateSearchButton();
         return;
      }

      ReservationToast(
         reserveTable({
            tables: [currentTable],
            idRestaurant: currentRestaurant.id,
            dateStr: currentDate,
            hour: currentHour,
            idUser: user?.id,
            name: value.name || user?.name,
            email: value.email || user?.email,
            phone: value.phone || user?.phone,
            diners: Number(value.diners),
         }), {
         onSuccess: () => {
            window.requestAnimationFrame(() => onClose());
         },
      });
   });

   const renderEmailIcon = (
      <Button
         size='sm'
         type='button'
         variant='crystal'
         ref={btnSearchRef}
         disabled={isLoading || !email}
         onClick={() => handleGetUserByEmail(email)}
         className={'animate__animated'}
      >
         {isLoading
            ? <LoaderCircle className='animate-spin' />
            : <UserSearch />
         }
      </Button>
   );

   const renderEmailDescription = user ? (
      <UserCard className={'text-accent-foreground'} user={user} />
   ) : errorMessage ? (
      <FormDescription className='text-red-300'>
         {errorMessage}
      </FormDescription>
   ) : (
      <FormDescription>
         Buscar por email
      </FormDescription>
   );

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         direction='topright'
         overlayClassName='backdrop-blur-none'
      >
         <Card2 className={cn(
            className
         )}>
            <Form onSubmit={onSubmit}>
               <FromGroup className='flex gap-4 justify-center items-center text-center'>
                  <FormItem>
                     <FormLabel
                        htmlFor='date'
                        className='space-x-2'
                     >
                        <Calendar className='inline-block' />
                        <span>
                           Fecha
                        </span>
                     </FormLabel>
                     <time>
                        {currentDate}
                     </time>
                  </FormItem>

                  <FormItem>
                     <FormLabel
                        htmlFor='hour'
                        className='space-x-2'
                     >
                        <CalendarClock className='inline-block' />
                        <span>
                           Hora
                        </span>
                     </FormLabel>
                     <time>
                        {currentHour}
                     </time>
                  </FormItem>
               </FromGroup>

               <FormItem>
                  <FormLabel
                     htmlFor='diners'
                  >
                     Numero de comensales
                  </FormLabel>

                  <Select
                     name={'diners'}
                     value={String(diners) || undefined}
                     onValueChange={onValueChange}
                  >
                     <SelectTrigger
                        isError={!!dinersValid}
                        variant='crystal'
                        className='w-full shadow-xl'
                     >
                        <SelectValue
                           placeholder='Numero de comensales'
                        />
                     </SelectTrigger>
                     <SelectContent>
                        {currentTable?.chairs && Array.from({ length: currentTable.chairs }).map((_, index) => (
                           <SelectItem
                              key={`chairs-${index}`}
                              value={String(index + 1)}
                           >
                              {index + 1}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </FormItem>

               <FormItem>
                  <FormLabel htmlFor='email'>
                     Email
                  </FormLabel>
                  <Input
                     id='email'
                     name='email'
                     type='email'
                     value={email}
                     onChange={onValueChange}
                     isError={!!emailValid}
                     variant='crystal'
                     icon={renderEmailIcon}
                     iconPosition='right'
                     activeEventIcon
                  />
                  {renderEmailDescription}
               </FormItem>

               {/*  */}
               <FormItem>
                  <FormLabel htmlFor='name'>
                     Nombre
                  </FormLabel>
                  <Input
                     id='name'
                     name='name'
                     type='text'
                     value={user?.name || name}
                     onChange={onValueChange}
                     isError={!!nameValid}
                     disabled={isBlockedFields}
                     variant='crystal'
                  />
                  {!user && (
                     <FormDescription>
                        Require el nombre del usuario
                     </FormDescription>
                  )}
               </FormItem>

               <FormItem>
                  <FormLabel htmlFor='phone'>
                     Teléfono
                  </FormLabel>
                  <Input
                     id='phone'
                     name='phone'
                     type='text'
                     value={user?.phone || phone}
                     onChange={onValueChange}
                     isError={!!phoneValid}
                     disabled={user?.phone}
                     variant='crystal'
                  />
                  {!user?.phone && (
                     <FormDescription>
                        Require el teléfono del usuario
                     </FormDescription>
                  )}
               </FormItem>

               <FormItem>
                  <Button
                     size='lg'
                     type='submit'
                     className='mt-2'
                     disabled={isLoadingReservation}
                  >
                     Reservar
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </Modal>
   );
};