import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '.'

export const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
   const startItem = (currentPage - 1) * itemsPerPage + 1
   const endItem = Math.min(currentPage * itemsPerPage, totalItems)

   return (
      <div className='flex items-center justify-between px-2 py-4'>
         <div className='flex items-center space-x-2'>
            <p className='text-sm text-muted-foreground'>
               Mostrando {startItem} a {endItem} de {totalItems} clientes
            </p>
         </div>
         <div className='flex items-center space-x-6'>
            <div className='flex items-center space-x-2'>
               <p className='text-sm font-medium'>
                  Página {currentPage} de {totalPages}
               </p>
            </div>
            <div className='flex items-center space-x-2'>
               <Button variant='outline' size='sm' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
                  <ChevronLeft className='h-4 w-4' />
                  Anterior
               </Button>
               <Button
                  variant='outline'
                  size='sm'
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
               >
                  Siguiente
                  <ChevronRight className='h-4 w-4' />
               </Button>
            </div>
         </div>
      </div>
   )
}