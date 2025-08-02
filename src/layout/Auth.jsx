import { Outlet } from 'react-router-dom';

import { cn } from '@/ultils';

import { Card2 } from '@/components/UI/card';
import { Modal } from '@/components/UI/common';
import { useModalAuth } from '@/hook/auth';

export const AuthLayout = () => {

  const {
    isOpenModal,
    closeModal
  } = useModalAuth()

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={closeModal}
    >
      <Card2
        className={cn('space-y-2')}
      >
        {/* <figure className='w-[5rem] h-[5rem] mx-auto'>
          <img
            className='w-full h-full'
            src='/logo-while.png'
            alt='Logo de la empresa'
          />
        </figure> */}

        {/* <div className={'text-primary-foreground/50 space-y-2'}> */}
        <Outlet />
        {/* </div> */}

      </Card2>
    </Modal>
  )
}
