import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className='min-h-screen w-full flex flex-col gap-10'>
      <Navbar className='mt-4 mx-auto w-[90%] max-w-6xl' />
      {/* <AppSidebar /> */}
      {/* <AppHeader /> */}
      {/* <div className="max-w-6xl w-[90%] mx-auto"> */}
      {/* </div> */}
      <Outlet />
      <Footer className='mt-auto mx-auto' />
      <Toaster position="top-right" reverseOrder={false} />
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
