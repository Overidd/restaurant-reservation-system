import { Outlet } from 'react-router-dom';

import { ModalUser } from '@/components/user';
import { ModalAsyncProvider } from '@/doman/context/dialogAsync';
import { Footer } from '../components/footer';
import { Navbar } from '../components/navbar';

const Layout = () => {

  return (
    <div className='min-h-screen w-full flex flex-col gap-10'>
      <ModalAsyncProvider>
        <Navbar className='mt-4 mx-auto w-[90%] max-w-6xl' />
      </ModalAsyncProvider>
      <Outlet />
      <Footer className='mt-auto mx-auto max-w-6xl' />
      <ModalUser />
    </div>
  )
}

export const AppLayout = () => {
  return (
    // <Providers>
    <Layout />
    // </Providers>
  )
}
