import { LoaderCircle } from 'lucide-react';

export const LoadingScreen = () => (
   <div className='h-screen flex justify-center items-center'>
      <LoaderCircle
         className='animate-spin'
         size={50}
         strokeWidth={3}
      />
   </div>
)
