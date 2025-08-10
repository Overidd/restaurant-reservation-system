
import { Navbar } from '@/components/navbar';
import { UserModal } from '@/components/user';
import { ModalAsyncProvider } from '@/doman/context/dialogAsync';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer';

const Layout = () => {

  return (
    <div className='min-h-screen w-full flex flex-col gap-10'>
      <ModalAsyncProvider>
        <Navbar className='mt-4 mx-auto w-[90%] max-w-6xl' />
      </ModalAsyncProvider>
      <Outlet />
      <UserModal />
      <Footer className='mx-auto max-w-6xl' />
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
