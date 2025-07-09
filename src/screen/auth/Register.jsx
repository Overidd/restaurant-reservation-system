import {
  Key,
  Mail
} from 'lucide-react'

import {
  useAuthStore,
  useForm
} from '@/hook'

import { Button } from '@/components/UI/common'
import {
  Form,
  FormItem,
  FormLabel,
  FromGroup,
  Input,
  LinkCustom
} from '@/components/UI/from'

const initValidation = {
  name: [
    (value) => value.trim().length > 0,
    'El nombre es obligatorio',
  ],
  lastname: [
    (value) => value.trim().length > 0,
    'El apellido es obligatorio',
  ],
  email: [
    (value) => /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(value),
    'El correo no es válido',
  ],
  password: [
    (value) => value.trim().length >= 6,
    'La contraseña debe tener al menos 6 caracteres',
  ],
  passwordConfirm: [
    (value, fields) => fields.passwordConfirm === fields.password,
    'Las contraseñas no coinciden',
    true,
  ],
}

const messageState = {
  loading: 'Cargando...',
  success: 'Registro exitoso',
  error: 'Ocurrió un error',
}

export const RegisterScreen = () => {
  const { register, loginGoogle, isLoading } = useAuthStore(messageState)

  const {
    onSubmitForm,
    onValueChange,
    formState: {
      name,
      lastname,
      email,
      password,
      passwordConfirm
    },
    formValidation: {
      nameValid,
      lastnameValid,
      emailValid,
      passwordValid,
      passwordConfirmValid
    },
  } = useForm({
    validations: initValidation,
    activeValidation: true,
    initialState: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = onSubmitForm((value) => {
    register(value);
  });

  return (
    <>
      <h2 className='text-primary-foreground/90 text-3xl font-bold text-center'>
        Registro
      </h2>

      <Form
        onSubmit={onSubmit}
        className={''}
      >

        <FromGroup className={'flex gap-4'}>
          <FormItem>
            <FormLabel
              formItemId='name'
            >
              Nombre
            </FormLabel>
            <Input
              id='name'
              name='name'
              type='text'
              variant={'crystal'}
              placeholder={'Nombre'}
              value={name}
              onChange={onValueChange}
              isError={!!nameValid}
              className={'p-3'}
            />
          </FormItem>

          <FormItem>
            <FormLabel
              formItemId='lastname'
            >
              Apellido
            </FormLabel>
            <Input
              id='lastname'
              name='lastname'
              type='text'
              variant={'crystal'}
              placeholder={'Apellido'}
              value={lastname}
              onChange={onValueChange}
              isError={!!lastnameValid}
              className={'py-3'}
            />
          </FormItem>
        </FromGroup>

        <FormItem>
          <FormLabel
            formItemId='email'
          >
            Correo
          </FormLabel>
          <Input
            id='email'
            name='email'
            type='email'
            variant={'crystal'}
            iconPosition='left'
            placeholder={'Correo electrónico'}
            value={email}
            onChange={onValueChange}
            isError={!!emailValid}
            icon={<Mail />}
            className={'py-3'}
          />
        </FormItem>

        <FormItem>
          <FormLabel
            formItemId='password'
          >
            Contraseña
          </FormLabel>
          <Input
            id='password'
            name='password'
            type='password'
            variant={'crystal'}
            iconPosition='left'
            value={password}
            onChange={onValueChange}
            isError={!!passwordValid}
            icon={<Key />}
            className={'py-3'}
          />

        </FormItem>

        <FormItem>
          <FormLabel
            formItemId='passwordConfirm'
          >
            Confirmar contraseña
          </FormLabel>
          <Input
            id='passwordConfirm'
            name='passwordConfirm'
            type='password'
            variant={'crystal'}
            iconPosition='left'
            value={passwordConfirm}
            onChange={onValueChange}
            isError={!!passwordConfirmValid}
            icon={<Key />}
            className={'py-3'}
          />
        </FormItem>

        <LinkCustom
          className={'text-right'}
          to={'login'}
        >
          ¿Ya tienes una cuenta?
        </LinkCustom>

        <FormItem>
          <Button
            type='submit'
            disabled={isLoading}
            className={'py-5'}
          >
            Registrate
          </Button>

          <div className='flex flex-row gap-2 items-center justify-baseline'>
            <div className='bg-gradient-to-l from-white/50 to-transparent h-px flex-1' />
            <span className='w-fit text-sm'>
              O continuar con
            </span>
            <div className='bg-gradient-to-r from-white/50 to-transparent h-px flex-1' />
          </div>

          <Button
            type='button'
            size={'icon'}
            variant={'crystal'}
            onclick={loginGoogle}
            className={'mx-auto'}
          >
            <img
              src="/icon/icon-google.svg"
              alt="Google"
            />
          </Button>
        </FormItem>
      </Form>
    </>
  )
}
