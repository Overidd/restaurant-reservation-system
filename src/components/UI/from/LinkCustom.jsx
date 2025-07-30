import { cn } from '@/ultils';
import { Link, useLocation } from 'react-router-dom';

export const LinkCustom = ({ className, to, children }) => {
   const location = useLocation();
   const pathBase = location.pathname.split('/')[1];
   // const path = `/${pathBase ? '/' + pathBase + '/' : ''}${to}`

   return (
      <Link
         to={`/${pathBase}/${to}`}
         className={cn(
            'decoration-0 underline-offset-4 hover:underline',
            className
         )}
      >
         {children}
      </Link>
   )
}
