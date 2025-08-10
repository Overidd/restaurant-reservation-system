import { Form, FormItem, FormLabel, Input } from '../UI/from';

export const UserDetailForm = ({
   name, email, phone, address,
   nameValid, emailValid, phoneValid, addressValid,
   onValueChange, onSubmit
}) => (
   <Form
      id='formUpdateUser'
      className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'
      onSubmit={onSubmit}
   >
      <FormItem className='space-y-2'>
         <FormLabel htmlFor='name'>Nombre</FormLabel>
         <Input
            id='name'
            name='name'
            type='text'
            value={name}
            onChange={onValueChange}
            isError={!!nameValid}
            placeholder='Nombre'
         />
      </FormItem>
      <FormItem className='space-y-2'>
         <FormLabel htmlFor='email'>Email</FormLabel>
         <Input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onValueChange}
            isError={!!emailValid}
            placeholder='Email'
         />
      </FormItem>
      <FormItem className='space-y-2'>
         <FormLabel htmlFor='phone'>Teléfono</FormLabel>
         <Input
            id='phone'
            name='phone'
            type='tel'
            value={phone}
            onChange={onValueChange}
            isError={!!phoneValid}
            placeholder='Teléfono'
         />
      </FormItem>
      <FormItem className='space-y-2'>
         <FormLabel htmlFor='address'>Dirección</FormLabel>
         <Input
            id='address'
            name='address'
            type='text'
            value={address}
            onChange={onValueChange}
            isError={!!addressValid}
            placeholder='Dirección completa'
         />
      </FormItem>
   </Form>
);