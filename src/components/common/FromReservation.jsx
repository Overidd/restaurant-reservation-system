import { useGelHourFromStateFetching, useGetAllRestauranFetching, useGetTablesFromStateFetching, useGetUserFetchin } from '@/hook/fetchings';
import { cn, DateParser, typeStatusTable, Validations } from '@/ultils';
import { LoaderCircle, UserSearch } from 'lucide-react';
import { mergeInitialValues, useForm, useToastErrorHandler } from '@/hook/common';
import { memo, useEffect, useRef, useState } from 'react';
import { CalendarButton } from '../UI/calendar';
import { useUserSearch } from '@/hook/auth';
import { UserCard } from '../UI/card';
import { Button } from '../UI/common';
import {
   Form,
   FormItem,
   FormLabel,
   FromGroup,
   Input,
   MultiSelect,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '../UI/from';
import toast from 'react-hot-toast';
import { reasonData } from '@/data';

const schema = {
   initial: {
      email: '',
      phone: '',
      name: '',
      reason: '',
      restaurant: '',
      diners: 2,
      date: new Date(),
      hour: '',
   },
   valid: {
      email: [
         (value) => Validations.email(value),
         'Ingrese un email válido',
      ],
      name: [
         (value) => value.trim().length > 0,
         'El nombre es obligatorio',
      ],
      phone: [
         (value) => Validations.phone(value),
         'Ingrese un teléfono válido de 9 dígitos que comience con 9',
      ],
      diners: [
         (value) => value > 0,
         'El número de comensales debe ser mayor a 0',
      ],
      reason: [
         (value) => !!value,
         'El motivo es obligatorio',
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

export const FromReservation = memo(({
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

   const chairsInitialValueRef = useRef(
      initialValues?.tables
         ? initialValues?.tables.map(t => Number(t.chairs)).reduce((a, b) => a + b, 0)
         : 0
   );

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
   } = useGelHourFromStateFetching({
      isValidateDatePassed: !initialValues
   })

   const {
      tables,
      loadTables,
      clearTables,
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
         reason,
         date,
         hour
      },
      formValidation: {
         emailValid,
         phoneValid,
         dinersValid,
         nameValid,
         restaurantValid,
         reasonValid,
         hourValid,
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
         },
      }),

      changeValueCallback: ({ name, value }) => {
         if (name === 'email') {
            onChangeEmailOrClear({ name, value });
            return;
         }

         if (!['restaurant', 'date', 'hour', 'diners'].includes(name)) return;

         if (name === 'restaurant') {
            const idRestaurant = getIdRestaurantByName(value);
            if (!idRestaurant) return;
            loadHours({
               idRestaurant: idRestaurant,
               dateStr: DateParser.toString(date),
               diners: Number(diners),
            });
         };

         if (name === 'date') {
            const idRestaurant = getIdRestaurantByName(restaurant);
            if (!idRestaurant) return;

            loadHours({
               idRestaurant: idRestaurant,
               dateStr: DateParser.toString(value),
               diners: Number(diners),
            });
         }

         if (name === 'hour') {
            const idRestaurant = getIdRestaurantByName(restaurant);
            if (!idRestaurant) return;

            loadTables({
               idRestaurant: idRestaurant,
               dateStr: DateParser.toString(date),
               diners: Number(diners),
               hour: value,
            });
         }

         if (name === 'diners') {
            const idRestaurant = getIdRestaurantByName(restaurant);
            if (!idRestaurant) return;

            loadHours({
               idRestaurant: idRestaurant,
               dateStr: DateParser.toString(date),
               diners: Number(value),
            });
            
            onInitialValues({
               hour: '',
            })

            // loadTables({
            //    idRestaurant: idRestaurant,
            //    dateStr: DateParser.toString(date),
            //    diners: Number(value),
            //    hour: hour,
            // });
         }
         setSelectedTables([])
      }
   });

   const resetForm = () => {
      clearUser();
      clearHours();
      clearTables();
      onResetForm();
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
         diners: Math.max(initialValues?.diners - chairsInitialValueRef.current, 0)
      });

      loadTables({
         idRestaurant: initialValues?.idRestaurant,
         dateStr: DateParser.toString(date),
         hour: initialValues?.hour,
         diners: Math.max(initialValues?.diners - chairsInitialValueRef.current, 0)
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
      if (!isOpen) resetForm();
   }, [isOpen])

   useEffect(() => {
      if (!user?.phone) return;
      onInitialValues({
         phone: user?.phone
      })
   }, [user])

   const onSubmitReservation = onSubmitForm((data) => {
      if (!hasSearched && !isEdit) {
         animateSearchButton();
         return;
      }

      if (selectedTables.length === 0) {
         toast.error('Debes seleccionar al menos una mesa');
         return
      };

      onSubmit({
         resetForm,
         selectedTables,
         formState: {
            tables: selectedTables || initialValues?.tables,
            idRestaurant: getIdRestaurantByName(restaurant) || initialValues?.idRestaurant,
            dateStr: DateParser.toString(date) || initialValues?.dateStr,
            hour: data.hour || initialValues?.hour,
            reason: data.reason || initialValues?.reason,
            idUser: user?.id || initialValues?.idUser,
            name: data.name || user?.name,
            email: data.email || user?.email,
            phone: data.phone || user?.phone,
            diners: Number(data.diners) || initialValues?.diners,
            ...(isEdit && { idReservation: initialValues?.id })
         },
      })
   });

   const handleSelectedTables = (table) => {
      const chairsNew = table.reduce((acc, table) => acc + table.chairs, 0);
      if (chairsNew > diners) {
         toast.error('La cantidad de asientos no puede superar a la cantidad de comensales');
         return
      };

      setSelectedTables(table);
   }

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

         <FromGroup className={'grid md:grid-cols-2 gap-4'}>
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
               {
                  !initialValues?.idUser && <span className='text-sm text-muted-foreground'>Es necesario ingresar el teléfono</span>
               }
            </FormItem>
         </FromGroup>

         <FromGroup className={'grid md:grid-cols-2 gap-4'}>
            <FormItem>
               <FormLabel htmlFor='name'>
                  Nombre
               </FormLabel>
               <Input
                  id='name'
                  name='name'
                  type='text'
                  value={name || user?.name || ''}
                  onChange={onValueChange}
                  isError={!!nameValid}
                  variant='crystal'
                  disabled={isBlockedFields || isReadOnly}
               />

            </FormItem>
            <FormItem>
               <FormLabel htmlFor='reason'>
                  Motivo
               </FormLabel>
               <Select
                  name='reason'
                  value={reason || undefined}
                  onValueChange={onValueChange}
               >
                  <SelectTrigger
                     isError={!!reasonValid}
                     variant='crystal'
                     className='w-full'
                  >
                     <SelectValue placeholder='Seleccione un motivo' />
                  </SelectTrigger>
                  <SelectContent>
                     {reasonData.map((item) => (
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

         <FormLabel
            className={'py-2'}
            htmlFor='diners'
         >
            Información de la reserva
         </FormLabel>

         <FromGroup className={'md:grid md:grid-cols-2 gap-4'}>
            <FormItem>
               <FormLabel
                  htmlFor='diners'
               >
                  Numero de comensales
               </FormLabel>

               <Select
                  name={'diners'}
                  type='number'
                  value={String(diners) || undefined}
                  onValueChange={onValueChange}
                  disabled={isReadOnly}
               >
                  <SelectTrigger
                     isError={!!dinersValid}
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
               onChange={handleSelectedTables}
               isLoading={isLoadingTables}
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
                           disabled={item.disabled || (initialValues?.tables && item.disabledBySelected && selectedTables.length === 0) || (!initialValues?.tables && selectedTables.length === 0) || isReadOnly}
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
})

FromReservation.displayName = 'FormReservation'

