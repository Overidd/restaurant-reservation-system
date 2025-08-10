import { StatsSummary } from '@/components/common';
import { CreateRestaurantModal, EditRestaurantModal, RestaurantList } from '@/components/restaurantPage';
import { Button, EmptyState } from '@/components/UI/common';
import { ModalAsyncProvider } from '@/doman/context/dialogAsync';
import { useLoadRestaurant } from '@/hook/restaurantPage';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export const RestaurantScreen = () => {
   const [isOpenModalCreate, setOpenModalCreate] = useState(false)
   const [isOpenModalEdit, setOpenModalEdit] = useState(false)

   const {
      restaurants,
      setSelectedRestaurant,
      selectedRestaurant,
      isLoading,
      metrics,
   } = useLoadRestaurant();

   const handleOpenEditModal = (data) => {
      setOpenModalEdit(true);
      setOpenModalCreate(false);
      setSelectedRestaurant(data);
   }

   const handleOpenCreateModal = () => {
      setOpenModalCreate(true);
      setOpenModalEdit(false);
   }

   return (
      <div className='min-h-screen p-4 md:p-6 lg:p-8 mx-auto max-w-7xl space-y-6'>
         <div className='flex items-center justify-end'>
            <Button
               onClick={handleOpenCreateModal}
            >
               <Plus className="w-4 h-4 mr-2" />
               Agregar Tienda
            </Button>
         </div>

         <StatsSummary
            isLoading={isLoading}
            metrics={metrics}
         />

         <RestaurantList
            isLoading={isLoading}
            openModalEdit={handleOpenEditModal}
            restaurants={restaurants}
         />

         {isOpenModalCreate &&
            <CreateRestaurantModal
               isOpen={isOpenModalCreate}
               onClose={() => setOpenModalCreate(false)}
            />
         }
         <ModalAsyncProvider>
            {isOpenModalEdit &&
               <EditRestaurantModal
                  isOpen={isOpenModalEdit}
                  onClose={() => setOpenModalEdit(false)}
                  selectedRestaurant={selectedRestaurant}
               />
            }
         </ModalAsyncProvider>
         {!isLoading && restaurants.length === 0 &&
            <EmptyState
               title={'No hay tiendas registradas'}
               description={'Comienza agregando tu primera tienda al sistema'}
               buttonText={'Agregar Primera Tienda'}
            />
         }
      </div>
   )
}

export default RestaurantScreen;