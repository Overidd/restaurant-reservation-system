import { useForm } from '@/hook/common';
import { Validations } from '@/ultils';
import { SelectHours } from '../UI/common/SelectHours';
import { Checkbox, Form, FormItem, FormLabel, FromGroup, Input } from '../UI/from';

const schema = {
   initial: {
      name: '',
      image: '',
      description: '',
      address: '',
      rows: 0,
      columns: 0,
      status: true,
      latitud: 0,
      longitud: 0,
      linkMap: '',
      hours: [],
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
      rows: [
         (value) => value >= 0,
         'El numero de filas debe ser mayor o igual a 0',
      ],
      columns: [
         (value) => value >= 0,
         'El numero de columnas debe ser mayor o igual a 0',
      ],
      latitud: [
         (value) => value >= -90 && value <= 90,
         'La latitud debe estar entre -90 y 90',
      ],
      longitud: [
         (value) => value >= -180 && value <= 180,
         'La longitud debe estar entre -180 y 180',
      ],
      linkMap: [
         (value) => value.length >= 3,
         'La url del mapa no es valida',
      ],
      hours: [
         (value) => value.length >= 1,
         'La menos un horario debe estar activo',
      ],
      address: [
         (value) => value.length >= 3,
         'La url del mapa no es valida',
      ],
   },
}

export const RestaurantForm = ({
   children,
   onSubmit,
   selectedRestaurant = {},
}) => {

   const {
      onSubmitForm,
      onValueChange,
      onResetForm,
      formState: {
         name,
         image,
         description,
         rows,
         columns,
         status,
         latitud,
         longitud,
         linkMap,
         hours,
         address
      },
      formValidation: {
         nameValid,
         imageValid,
         descriptionValid,
         rowsValid,
         columnsValid,
         latitudValid,
         longitudValid,
         linkMapValid,
         hoursValid,
         addressValid
      }
   } = useForm({
      activeValidation: true,
      validations: schema.validation,
      initialState: {
         ...schema.initial,
         ...selectedRestaurant
      },
   });

   const onSubmitModal = onSubmitForm((value) => {
      onSubmit({
         form: {
            ...value,
            idRestaurant: (selectedRestaurant?.id && selectedRestaurant.id),
         },
         reset: onResetForm,
      });
   });

   return (
      <Form
         noValidate
         onSubmit={onSubmitModal}
      >
         <FromGroup className='grid grid-cols-2 gap-4'>
            <FormItem>
               <FormLabel htmlFor='name'>
                  Nombre de la Tienda
               </FormLabel>
               <Input
                  id='name'
                  name='name'
                  value={name}
                  isError={!!nameValid}
                  onChange={onValueChange}
                  required
               // placeholder='Tienda'
               />
            </FormItem>

            <FormItem>
               <FormLabel htmlFor='image'>
                  Link Imagen
               </FormLabel>
               <Input
                  id='image'
                  name='image'
                  value={image}
                  isError={!!imageValid}
                  onChange={onValueChange}
                  required
               // placeholder='Tienda'
               />
            </FormItem>
         </FromGroup>
         <FromGroup>
            <FormItem>
               <FormLabel htmlFor='description'>
                  Descripción de la Tienda
               </FormLabel>
               <Input
                  id='description'
                  name='description'
                  value={description}
                  isError={!!descriptionValid}
                  onChange={onValueChange}
                  required
               // placeholder='Tienda'
               />
            </FormItem>
            <FormItem>
               <FormLabel htmlFor='address'>
                  Direccion
               </FormLabel>
               <Input
                  id='address'
                  name='address'
                  value={address}
                  isError={!!addressValid}
                  onChange={onValueChange}
                  required
               />
            </FormItem>
         </FromGroup>

         <FromGroup className='grid grid-cols-2 gap-4'>
            <FormItem>
               <FormLabel htmlFor='rows'>
                  Filas
               </FormLabel>
               <Input
                  id='rows'
                  name='rows'
                  type='number'
                  value={rows}
                  isError={!!rowsValid}
                  onChange={onValueChange}
                  required
               />
            </FormItem>

            <FormItem>
               <FormLabel htmlFor='columns'>
                  Columnas
               </FormLabel>
               <Input
                  id='columns'
                  name='columns'
                  type='number'
                  value={columns}
                  isError={!!columnsValid}
                  onChange={onValueChange}
                  required
               />
            </FormItem>
         </FromGroup>

         <FromGroup className='grid grid-cols-2 gap-4'>
            <FormItem>
               <FormLabel htmlFor='latitud'>
                  Latitud
               </FormLabel>
               <Input
                  id='latitud'
                  type='number'
                  name='latitud'
                  value={latitud}
                  isError={!!latitudValid}
                  onChange={onValueChange}
                  required
               />
            </FormItem>

            <FormItem>
               <FormLabel htmlFor='longitud'>
                  longitud
               </FormLabel>
               <Input
                  id='longitud'
                  type='number'
                  name='longitud'
                  value={longitud}
                  isError={!!longitudValid}
                  onChange={onValueChange}
                  required
               />
            </FormItem>
         </FromGroup>

         <FormItem>
            <FormLabel htmlFor='linkMap'>
               Enlace de Google Maps
            </FormLabel>
            <Input
               id='linkMap'
               value={linkMap}
               name='linkMap'
               isError={!!linkMapValid}
               onChange={onValueChange}
               required
            />
         </FormItem>

         <FromGroup>
            <FormLabel>
               Horarios Disponibles
            </FormLabel>
            <FormItem>
               <SelectHours
                  name='hours'
                  hours={hours}
                  isError={!!hoursValid}
                  onChange={onValueChange}
               />
            </FormItem>
         </FromGroup>

         <FormItem className='flex items-center space-x-2'>
            <Checkbox
               id='status'
               name='status'
               checked={status}
               onChange={onValueChange}
            />
            <FormLabel htmlFor='status'>
               Tienda Activa
            </FormLabel>
         </FormItem>

         {
            children
         }
      </Form>
   )
}
