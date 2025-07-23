import { StatsSummary } from '@/components/common';
import { CreateRestaurantModal, EditRestaurantModal, RestaurantList } from '@/components/restaurant';
import { Button, EmptyState } from '@/components/UI/common';
import { useLoadRestaurant } from '@/hook/restaurant';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export const RestaurantScreen = () => {
   const [isOpenModalCreate, setOpenModalCreate] = useState(false)
   const [isOpenModalEdit, setOpenModalEdit] = useState(false)

   const {
      isLoading,
      restaurants,
      deleteRestaurant,
      setSelectedRestaurant,
      selectedRestaurant,
      updateRestaurant,
      createRestaurant,
      metrics
   } = useLoadRestaurant();

   const handleDelete = (id) => {
      deleteRestaurant(id);
   }

   const handleUpdate = (data) => {
      updateRestaurant();
      setSelectedRestaurant(data);
   }

   return (
      <div className='container mx-auto p-6 space-y-6'>
         <div className='flex items-center justify-end'>
            <Button>
               <Plus className="w-4 h-4 mr-2" />
               Agregar Tienda
            </Button>
         </div>

         <StatsSummary
            metrics={metrics}
         />

         <RestaurantList
            onDelete={handleDelete}
            onEdit={handleUpdate}
            restaurants={restaurants}
         />

         {isOpenModalCreate &&
            <CreateRestaurantModal
               isOpen={isOpenModalCreate}
               onClose={() => setOpenModalCreate(false)}
            />
         }

         {isOpenModalEdit &&
            <EditRestaurantModal
               isOpen={isOpenModalEdit}
               onClose={() => setOpenModalEdit(false)}
               selectedRestaurant={selectedRestaurant}
            />
         }

         {restaurants.length === 0 &&
            <EmptyState
               title={'No hay tiendas registradas'}
               description={'Comienza agregando tu primera tienda al sistema'}
               buttonText={'Agregar Primera Tienda'}
            />
         }
      </div>
   )
}

