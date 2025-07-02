import { Outlet } from 'react-router-dom';


export const DashboardLayout = () => {
   return (
      <div className='text-red-300 w-full min-h-screen bg-amber-500'>

         Dashboard
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis commodi deleniti, velit delectus porro non quod, ab aliquam laboriosam, ut voluptatum nulla! Tenetur quis saepe, officia nihil provident alias laudantium?
         <Outlet />
      </div>
   )
}
