import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div>
      {/* <NavBar /> */}
      {/* <AppSidebar /> */}
      {/* <AppHeader /> */}

      <main className="p-4 max-w-screen-2xl mx-auto md:p-6">
        <Outlet />
      </main>
      {/* <Footer/> */}
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
