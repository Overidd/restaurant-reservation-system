
import { categoryData, productsData } from '@/data';
import { useProductFilter } from '@/hook/productPage';
import { Grid3X3, List, Search } from 'lucide-react';
import { useEffect } from 'react';
import { CardProduct } from '../UI/card';
import { Button } from '../UI/common';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/from';

export function ProductsGrid() {

   const {
      filteredProducts,
      searchTerm,
      selectedCategory,
      sortBy,
      viewMode,
      setViewMode,
      handleSearch,
      handleCategoryFilter,
      handleSort,
   } = useProductFilter(productsData);

   useEffect(() => {
      handleCategoryFilter(categoryData[0])
   }, [])


   return (
      <main className='space-y-4'>
         <div className='relative max-w-md mx-auto'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4' />
            <Input
               placeholder='Buscar productos'
               value={searchTerm}
               onChange={(e) => handleSearch(e.target.value)}
               className='pl-10'
               variant='default'
            />
         </div>

         <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex flex-wrap gap-2'>
               {categoryData.map((category) => (
                  <Button
                     key={category.id}
                     onClick={() => handleCategoryFilter(category)}
                     variant={selectedCategory === category ? 'default' : 'outline'}
                  >
                     {category.name}
                  </Button>
               ))}
            </div>

            <div className='flex items-center gap-4 justify-between w-full md:w-fit'>
               <Select
                  value={sortBy}
                  onValueChange={({ value }) => handleSort(value)}
               >
                  <SelectTrigger className='w-40'>
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem
                        value='popular'
                     >
                        Más Popular
                     </SelectItem>
                     <SelectItem
                        value='rating'
                     >
                        Mejor Calificado
                     </SelectItem>
                     <SelectItem
                        value='price-low'
                     >
                        Precio: Menor
                     </SelectItem>
                     <SelectItem
                        value='price-high'
                     >
                        Precio: Mayor
                     </SelectItem>
                  </SelectContent>
               </Select>

               <div className='flex border rounded-lg'>
                  <Button
                     variant={viewMode === 'grid' ? 'default' : 'ghost'}
                     size='sm'
                     onClick={() => setViewMode('grid')}
                     className='rounded-r-none'
                  >
                     <Grid3X3 className='w-4 h-4' />
                  </Button>
                  <Button
                     variant={viewMode === 'list' ? 'default' : 'ghost'}
                     size='sm'
                     onClick={() => setViewMode('list')}
                     className='rounded-l-none'
                  >
                     <List className='w-4 h-4' />
                  </Button>
               </div>
            </div>
         </div>

         <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'
         }>
            {filteredProducts.map((product) => (
               <CardProduct
                  variant={viewMode === 'list' ? 'compact' : 'default'}
                  key={product.id}
                  {...product}
               />
            ))}
         </div>

         {filteredProducts.length === 0 && (
            <div className='text-center py-12'>
               <div className='text-gray-400 mb-4'>
                  <Search className='w-16 h-16 mx-auto' />
               </div>
               <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                  No se encontraron productos
               </h3>
               <p className='text-gray-600 dark:text-gray-400'>
                  Intenta con otros términos de búsqueda o filtros
               </p>
            </div>
         )}
      </main>
   )
}
