import { cn } from '@/ultils';
import { Outlet } from 'react-router-dom';
import { Card2 } from '@/components/UI/card';
import { Modal } from '@/components/UI/common';

import {
  useCheckAuth,
  useModalAuth,
  useRedirectIfAuthenticated
} from '@/hook';

export const AuthLayout = () => {
  const { isAuthenticated } = useCheckAuth()
  const { isOpenModal, closeModal } = useModalAuth(isAuthenticated)
  useRedirectIfAuthenticated(isAuthenticated, closeModal);
  if (isAuthenticated) return null;

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={closeModal}
    >
      <Card2
        className={cn(
          'p-10 px-12'
        )}
      >
        <figure className='w-[5rem] h-[5rem] mx-auto'>
          <img
            className='w-full h-full'
            src='/logo-while.png'
            alt='Logo de la empresa'
          />
        </figure>

        <div className={'text-primary-foreground/50 space-y-2'}>
          <Outlet />
        </div>

      </Card2>
    </Modal>
  )
}
