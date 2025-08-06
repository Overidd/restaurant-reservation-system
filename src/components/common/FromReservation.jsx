import { useUserSearch } from '@/hook/auth';
import { useForm, useToastErrorHandler } from '@/hook/common';
import { useGelHourFromStateFetching, useGetAllRestauranFetching, useGetTablesFromStateFetching, useGetUserFetchin } from '@/hook/fetchings';
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
      hour: [
         (value) => !!value,
         'La hora es obligatoria',
      ],
      restaurant: [
         (value) => !!value,
         'El restaurante es obligatorio',
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

export const FromReservation = ({
   formId,
   isOpen,
   onSubmit,
   className,
   children,
   initialValues,
   btns = [],
   isReadOnly = false,
   isEdit = false,
}) => {
   const [selectedTables, setSelectedTables] = useState(initialValues?.tables || []);

   const {
      restaurants,
      getIdRestaurantByName,
      getRestaurantById,
      isLoadRestaurants,
      loadRestaurants,
      isLoading: isLoadingRestaurants,
      errorMessage: restaurantsErrorMessage
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
   } = useGelHourFromStateFetching()

   const {
      tables,
      loadTables,
      clearTables,
      isLoadTables,
      errorMessage: tablesErrorMessage,
      isLoading: isLoadingTables,
   } = useGetTablesFromStateFetching(typeStatusTable.AVAILABLE)

   useToastErrorHandler([
      { message: restaurantsErrorMessage, priority: 0 },
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
         nameValid,
         restaurantValid,
         hourValid
      },
      onValueChange,
      onSubmitForm,
      onResetForm,
      onInitialValues,
   } = useForm({
      activeValidation: true,
      validations: schema.valid,
      initialState: mergeInitialValues({
         initial: schema.initial,
         newInitial: {
            ...initialValues,
            hour: '',
            restaurant: '',
         },
      }),
      changeValueCallback: ({ name, value }) => {
         if (name === 'restaurant') {
            const idRestaurant = getIdRestaurantByName(value);
            if (!idRestaurant) return;
            loadHours({
               idRestaurant: idRestaurant,
               dateStr: DateParser.toString(date),
               diners: diners
            });

            setSelectedTables([])
            return;
         };

         if (name === 'date') {
            const idRestaurant = getIdRestaurantByName(restaurant);
            if (!idRestaurant) return;

            loadHours({
               idRestaurant: idRestaurant,
               dateStr: DateParser.toString(value),
               diners: diners
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
               hour: value,
               diners: diners
            });

            setSelectedTables([])
            return;
         }

         if (name === 'diners') {
            const idRestaurant = getIdRestaurantByName(restaurant);
            if (!idRestaurant) return;

            loadTables({
               idRestaurant: idRestaurant,
               dateStr: DateParser.toString(date),
               hour: hour,
               diners: value,
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
      if (isEdit) return;
      loadRestaurants();
   }, [isEdit])

   useEffect(() => {
      if (!isEdit) return;
      if (!initialValues?.idRestaurant) return;
      loadRestaurants();

      loadHours({
         idRestaurant: initialValues?.idRestaurant,
         dateStr: DateParser.toString(date),
         diners: initialValues?.diners
      });

      loadTables({
         idRestaurant: initialValues?.idRestaurant,
         dateStr: DateParser.toString(date),
         hour: initialValues?.hour,
         diners: initialValues?.diners
      });
   }, [isEdit])

   useEffect(() => {
      if (!isEdit || !hours || hours?.length <= 0) return;
      onInitialValues({
         restaurant: getRestaurantById(initialValues?.idRestaurant)?.name,
         hour: initialValues?.hour
      })
   }, [isEdit, hours])

   useEffect(() => {
      if (!isOpen) handleCloseModal();
   }, [isOpen])

   // TODO: Mas adelante agregar validaciones con animaciones en cada input de la sección de reserva 
   const onSubmitReservation = onSubmitForm((data) => {
      if (!hasSearched && !isEdit) {
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
            idUser: user?.id || initialValues?.idUser,
            name: data.name || user?.name,
            email: data.email || user?.email,
            phone: data.phone || user?.phone,
            diners: Number(data.diners),
            ...(isEdit && { idReservation: initialValues?.id })
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
         id={formId}
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
               icon={initialValues?.idUser ? null : renderEmailIcon}
               disabled={!!initialValues?.idUser || isReadOnly}
               iconPosition='right'
               activeEventIcon
            />

            {
               !initialValues?.idUser && (
                  user
                     ? <UserCard
                        className={'text-accent-foreground'}
                        user={user}
                     />
                     : <span className='text-sm text-muted-foreground'>Buscar por email</span>
               )
            }
         </FormItem>

         <FromGroup className={'grid md:grid-cols-2 gap-4'}>
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
                  disabled={isBlockedFields || isReadOnly}
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
                  value={phone || user?.phone || ''}
                  onChange={onValueChange}
                  isError={!!phoneValid}
                  variant='crystal'
                  disabled={(isBlockedFields && initialValues?.user) || isReadOnly}
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

         <FromGroup className={'md:grid md:grid-cols-2 gap-4'}>
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
                  disabled={isReadOnly}
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
                  disabled={isReadOnly}
               >
                  <SelectTrigger
                     variant='crystal'
                     className='w-full truncate-text-nowarp'
                     isLoading={isLoadingRestaurants}
                     disabled={!isLoadRestaurants || isReadOnly}
                     isError={!!restaurantValid}
                  >
                     <SelectValue
                        placeholder='Seleccione un restaurante'
                     />
                  </SelectTrigger>
                  <SelectContent>
                     {restaurants.map((item) => (
                        <SelectItem
                           className={'truncate-text-nowarp'}
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

         <FromGroup className={'md:grid md:grid-cols-2 gap-4'}>
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
                  disabled={isReadOnly}
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
                  disabled={isReadOnly}
               >
                  <SelectTrigger
                     className='w-full'
                     variant='crystal'
                     isError={!!hourValid}
                     isLoading={isLoadingHours}
                     disabled={!isLoadHours || isReadOnly}
                  >
                     <SelectValue
                        placeholder='Seleccione una hora'
                     />
                  </SelectTrigger>
                  <SelectContent>
                     {hours && hours.map((item, index) => (
                        <SelectItem
                           key={item.id || 'hour' + index}
                           value={item.hour ?? item.name}
                        >
                           {item.hour ?? item.name}
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
               disabled={isLoadingTables || isReadOnly}
               isLoading={isLoadingTables}
               placeholder='Seleccione mesas'
               className='w-full'
            />
         </FormItem>

         {
            btns.length > 0 && (
               <FormItem className='flex flex-row gap-4 items-center'>
                  {
                     btns.map((item, index) => (
                        <Button
                           className={'flex-1'}
                           key={`btn-${index}`}
                           size={item.size || 'lg'}
                           type={item.type || 'button'}
                           variant={item.variant || 'default'}
                           onClick={item.type !== 'submit' ? item.onClick : null}
                           disabled={item.disabled || item.disabledBySelected && selectedTables.length === 0 || isReadOnly}
                        >
                           {item.label}
                        </Button>
                     ))
                  }
                  {children}
               </FormItem>
            )
         }
      </Form>
   )
}