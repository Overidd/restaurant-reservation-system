import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className='min-h-screen w-full flex flex-col gap-10'>
      <Navbar className='mt-4 mx-auto w-[90%] max-w-6xl' />
      <Outlet />
      <Footer className='mt-auto mx-auto' />
      <Toaster
        reverseOrder={true}
        position="top-right"
        toastOptions={{
          style: {
            background: '#FAF3E6',
            color: '#4e403cc4',
          },
        }}
        containerStyle={{
          padding: '16px',
        }}
      />
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
