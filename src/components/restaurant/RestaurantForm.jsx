import { useForm } from '@/hook';
import { SelectHours } from '../UI/common/SelectHours';
import { Checkbox, Form, FormItem, FromGroup, Input, Label } from '../UI/from';

const schema = {
   initial: {
      name: '',
      image: '',
      description: '',
      rows: 0,
      columns: 0,
      status: false,
      latitude: 0,
      longitude: 0,
      linkMap: '',
      hours: []
   },
   validation: {
      name: [
         (value) => value.length >= 3,
         'El nombre debe tener al menos 3 caracteres',
      ],
      image: [
         (value) => value.length >= 3,
         'La url de la imagen no es valida',
      ],
      description: [
         (value) => value.length >= 3,
         'La descripcion debe tener al menos 3 caracteres',
      ],
      rows: [
         (value) => value >= 0,
         'El numero de filas debe ser mayor o igual a 0',
      ],
      columns: [
         (value) => value >= 0,
         'El numero de columnas debe ser mayor o igual a 0',
      ],
      latitude: [
         (value) => value >= -90 && value <= 90,
         'La latitud debe estar entre -90 y 90',
      ],
      longitude: [
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
         latitude,
         longitude,
         linkMap,
         hours
      },
      formValidation: {
         nameValid,
         imageValid,
         descriptionValid,
         rowsValid,
         columnsValid,
         latitudeValid,
         longitudeValid,
         linkMapValid,
         hoursValid
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
         form: value,
         reset: onResetForm,
      });
   });

   return (
      <Form
         onSubmit={onSubmitModal}
      >
         <FromGroup className='grid grid-cols-2 gap-4'>
            <FormItem>
               <FormItem htmlFor='name'>
                  Nombre de la Tienda
               </FormItem>
               <Input
                  id='name'
                  name='name'
                  value={name}
                  isError={!nameValid}
                  onChange={onValueChange}
                  required
               // placeholder='Tienda'
               />
            </FormItem>

            <FormItem>
               <FormItem htmlFor='image'>
                  Imagen de la Tienda
               </FormItem>
               <Input
                  id='image'
                  name='image'
                  value={image}
                  isError={!imageValid}
                  onChange={onValueChange}
                  required
               // placeholder='Tienda'
               />
            </FormItem>
         </FromGroup>

         <FormItem>
            <FormItem htmlFor='description'>
               Descripción de la Tienda
            </FormItem>
            <Input
               id='description'
               name='description'
               value={description}
               isError={!descriptionValid}
               onChange={onValueChange}
               required
            // placeholder='Tienda'
            />
         </FormItem>

         <FromGroup className='grid grid-cols-2 gap-4'>
            <FormItem>
               <FormItem htmlFor='rows'>Filas</FormItem>
               <Input
                  id='rows'
                  name='rows'
                  type='number'
                  value={rows}
                  isError={!rowsValid}
                  onChange={onValueChange}
                  required
               />
            </FormItem>

            <FormItem>
               <FormItem htmlFor='columns'>Columnas</FormItem>
               <Input
                  id='columns'
                  name='columns'
                  type='number'
                  value={columns}
                  isError={!columnsValid}
                  onChange={onValueChange}
                  required
               />
            </FormItem>
         </FromGroup>

         <FromGroup className='grid grid-cols-2 gap-4'>
            <FormItem>
               <FormItem htmlFor='latitud'>Latitud</FormItem>
               <Input
                  id='latitud'
                  type='number'
                  name='latitud'
                  value={latitude}
                  isError={!latitudeValid}
                  onChange={onValueChange}
                  required
               />
            </FormItem>

            <FormItem>
               <Label htmlFor='longitude'>
                  Longitud
               </Label>
               <Input
                  id='longitude'
                  type='number'
                  step='any'
                  value={longitude}
                  isError={!longitudeValid}
                  onChange={onValueChange}
                  required
               />
            </FormItem>
         </FromGroup>

         <FormItem>
            <Label htmlFor='linkMap'>
               Enlace de Google Maps
            </Label>
            <Input
               id='linkMap'
               value={linkMap}
               name='linkMap'
               isError={!linkMapValid}
               onChange={onValueChange}
               required
            />
         </FormItem>

         <FromGroup>
            <Label>
               Horarios Disponibles
            </Label>
            <FormItem className='flex gap-2'>
               <SelectHours
                  value={hours}
                  isError={hoursValid}
                  onValueChange={onValueChange}
               />
            </FormItem>
         </FromGroup>

         <FormItem className='flex items-center space-x-2'>
            <Checkbox
               id='status'
               checked={status}
               onCheckedChange={onValueChange}
            />
            <Label htmlFor='status'>
               Tienda Activa
            </Label>
         </FormItem>

         {
            children
         }
      </Form>
   )
}
