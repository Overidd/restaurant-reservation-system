
import { useForm, useToastErrorHandler } from '@/hook';
import { useGelHourFromStateFetching, useGetAllRestauranFetching, useGetTablesFromStateFetching, useGetUserFetchin } from '@/hook/fetchings';
import { useUserSearch } from '@/hook/user';
import { cn, DateParser, typeStatusTable } from '@/ultils';
import { LoaderCircle, UserSearch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CalendarButton } from '../UI/calendar';
import { UserCard } from '../UI/card';
import { Button } from '../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input, MultiSelect, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/from';

const schema = {
   initial: {
      email: '',
      phone: '',
      name: '',
      restaurant: '',
      diners: 2,
      date: new Date(),
      hour: '',
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

const mergeInitialValues = ({ initial, newInitial }) => {
   if (!newInitial) return initial;
   const initialValues = Object.entries(initial).map(([key, value]) => {
      const newValue = newInitial[key] ?? value;
      return [key, newValue];
   })
   return {
      ...Object.fromEntries(initialValues)
   }
}


// const initialValues = {
//    tables: [],
//    user: null,
//    email,
//    phone,
//    diners,
//    name,
//    restaurant,
//    date,
//    hour
// }

export const FromReservation = ({
   onSubmit,
   children,
   className,
   initialValues,
   isOpen,
}) => {
   const [selectedTables, setSelectedTables] = useState(initialValues?.tables || []);

   const {
      restaurants,
      getIdRestaurantByName,
      isLoadRestaurants,
      isLoading: isLoadingRestaurants,
   } = useGetAllRestauranFetching()

   const {
      clearUser,
      getUserByEmail,
      isFoundUser,
      isLoading,
      user,
      errorMessage: userErrorMessage,
   } = useGetUserFetchin()

   const {
      hours,
      loadHours,
      clearHours,
      isLoadHours,
      errorMessage: hoursErrorMessage,
      isLoading: isLoadingHours
   } = useGelHourFromStateFetching(typeStatusTable.AVAILABLE)

   const {
      tables,
      loadTables,
      clearTables,
      isLoadTables,
      errorMessage: tablesErrorMessage,
      isLoading: isLoadingTables,
   } = useGetTablesFromStateFetching(typeStatusTable.AVAILABLE)

   useToastErrorHandler([
      { message: userErrorMessage, priority: 1 },
      { message: hoursErrorMessage, priority: 2 },
      { message: tablesErrorMessage, priority: 3 },
   ]);

   const {
      btnSearchRef,
      animateSearchButton,
      handleGetUserByEmail,
      hasSearched,
      isBlockedFields,
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
         name,
         restaurant,
         date,
         hour
      },
      formValidation: {
         emailValid,
         phoneValid,
         dinersValid,
         nameValid
      },
      onValueChange,
      onSubmitForm,
      onResetForm,
   } = useForm({
      activeValidation: true,
      validations: schema.valid,
      initialState: mergeInitialValues({
         initial: schema.initial,
         newInitial: initialValues
      }),
      changeValueCallback: ({ name, value }) => {
         if (name === 'restaurant') {
            const idRestaurant = getIdRestaurantByName(value);
            if (!idRestaurant) return;
            loadHours({
               idRestaurant: idRestaurant,
               dateStr: DateParser.toString(date)
            });

            setSelectedTables([])
            return;
         };

         if (name === 'date') {
            const idRestaurant = getIdRestaurantByName(restaurant);
            if (!idRestaurant) return;

            loadHours({
               idRestaurant: idRestaurant,
               dateStr: DateParser.toString(value)
            });

            setSelectedTables([])
            return;
         }

         if (name === 'hour') {
            const idRestaurant = getIdRestaurantByName(restaurant);
            if (!idRestaurant) return;

            loadTables({
               idRestaurant: idRestaurant,
               dateStr: DateParser.toString(date),
               hour: value
            });

            setSelectedTables([])
            return;
         }

         onChangeEmailOrClear({ name, value });
      }
   });

   const resetForm = () => {
      clearUser();
      clearHours();
      clearTables();
      onResetForm();
      setSelectedTables([])
   }
   const handleCloseModal = () => {
      onValueChange({ name: 'restaurant', value: '' });
      clearHours();
      clearTables();
      setSelectedTables([])
   }

   useEffect(() => {
      if (!isOpen) handleCloseModal();
   }, [isOpen])

   // TODO: Mas adelante agregar validaciones con animaciones en cada input de la sección de reserva 
   const onSubmitReservation = onSubmitForm((data) => {
      if (!hasSearched && !initialValues?.user) {
         animateSearchButton();
         return;
      }

      onSubmit({
         resetForm,
         selectedTables,
         formState: {
            tables: selectedTables,
            idRestaurant: getIdRestaurantByName(restaurant),
            dateStr: DateParser.toString(date),
            hour: data.hour,
            idUser: user?.id || null,
            name: user?.name || data.name,
            email: user?.email || data.email,
            phone: user?.phone || data.phone || null,
            diners: Number(data.diners),
         },
      })
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

   return (
      <Form
         onSubmit={onSubmitReservation}
         className={cn(
            className,
         )}
      >
         <FormLabel
            className={'pb-2'}
            htmlFor='diners'
         >
            Información del cliente
         </FormLabel>
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
               icon={initialValues?.user ? null : renderEmailIcon}
               iconPosition='right'
               activeEventIcon
            />

            {
               !initialValues?.user && (
                  user
                     ? <UserCard user={user} />
                     : <span className='text-sm text-muted-foreground'>Buscar por email</span>
               )
            }
         </FormItem>

         <FromGroup className={'grid grid-cols-2 gap-4'}>
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
                  variant='crystal'
                  disabled={isBlockedFields}
               />

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
                  variant='crystal'
                  disabled={isBlockedFields}
               />
            </FormItem>

         </FromGroup>

         <FormLabel
            className={'py-2'}
            htmlFor='diners'
         >
            Información de la reserva
         </FormLabel>

         {/* Informacion de la reserva */}

         <FromGroup className={'grid grid-cols-2 gap-4'}>
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
                     // disabled={isBlockedFields}
                     variant='crystal'
                     className='w-full shadow-xl'
                  >
                     <SelectValue
                        placeholder=''
                     />
                  </SelectTrigger>
                  <SelectContent>
                     {Array.from({ length: 10 }).map((_, index) => (
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

            <FormItem >
               <FormLabel
                  htmlFor='restaurant'
               >
                  Restaurantes
               </FormLabel>

               <Select
                  name={'restaurant'}
                  value={restaurant}
                  onValueChange={onValueChange}
               >
                  <SelectTrigger
                     className='w-full'
                     variant='crystal'
                     isLoading={isLoadingRestaurants}
                     disabled={!isLoadRestaurants}
                  >
                     <SelectValue
                        placeholder='Seleccione un restaurante'
                     />
                  </SelectTrigger>
                  <SelectContent>
                     {restaurants.map((item) => (
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
         </FromGroup>

         <FromGroup className={'grid grid-cols-2 gap-4'}>
            <FormItem>
               <FormLabel
                  htmlFor='diners'
               >
                  Fecha
               </FormLabel>

               <CalendarButton
                  name={'date'}
                  date={date}
                  required={true}
                  configDate={null}
                  onValueChange={onValueChange}
                  variant='crystal'
                  btnClassName={'w-full'}
               // disabled={isBlockedFields}
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  htmlFor='diners'
               >
                  Hora
               </FormLabel>

               <Select
                  name={'hour'}
                  value={hour}
                  onValueChange={onValueChange}
               >
                  <SelectTrigger
                     className='w-full'
                     variant='crystal'
                     isLoading={isLoadingHours}
                     disabled={!isLoadHours}
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
         </FromGroup>

         <FormItem>
            <FormLabel
               htmlFor='diners'
            >
               Mesas
            </FormLabel>

            <MultiSelect
               options={tables}
               selected={selectedTables}
               onChange={setSelectedTables}
               disabled={!isLoadTables}
               isLoading={isLoadingTables}
               placeholder='Seleccione mesas'
               className='w-full'
            />
         </FormItem>

         {children}

      </Form>
   )
}

{/* <FormItem>
   <Button
      size='lg'
      type='submit'
      className='mt-2 flex items-center gap-2'
      disabled={isLoadingReservation}
   >
      {
         isLoadingReservation
            ? <LoaderCircle className='animate-spin' />
            : <CalendarPlus />
      }
      <span>
         Reservar
      </span>
   </Button>
</FormItem> */}