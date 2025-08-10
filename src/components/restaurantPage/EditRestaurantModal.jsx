import { useModalAsync } from '@/hook/common';
import { useRestaurant } from '@/hook/restaurantPage';
import { AdminTableToasts } from '@/toasts';
import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { DialigDelete } from '../UI/dialog';
import { FormItem, Label } from '../UI/from';
import { RestaurantForm } from './RestaurantForm';


export const EditRestaurantModal = ({
   isOpen,
   onClose,
   selectedRestaurant,
}) => {

   const {
      showAsyncModal
   } = useModalAsync();

   const {
      updateRestaurant,
      deleteRestaurant
   } = useRestaurant()

   const handleDeleteRestaurant = async () => {
      const res = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialigDelete
            label='Eliminar restaurante'
            onCancel={onCancel}
            onConfirm={onConfirm}
         />
      ));

      if (!res) return;
      AdminTableToasts.deleteRestaurant(
         deleteRestaurant(selectedRestaurant.id), {
         onSuccess: () => {
            requestAnimationFrame(() => onClose?.());
         },
      })
   }

   const onSubmit = ({ form }) => {
      AdminTableToasts.updateRestaurant(
         updateRestaurant(form),
         {
            onSuccess: () => {
               requestAnimationFrame(() => onClose?.());
            },
         }
      )
   }

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
      >
         <Card2
            className='space-y-4'
         >
            <Label className={'text-center'}>
               Editar restaurante
            </Label>
            <RestaurantForm
               onSubmit={onSubmit}
               selectedRestaurant={selectedRestaurant}
            >
               <FormItem
                  className={'flex gap-4'}
               >
                  <Button
                     type='submit'
                     className={'flex-1'}
                  >
                     Actualizar
                  </Button>
                  <Button
                     type='button'
                     variant='destructive'
                     className={'flex-1'}
                     onClick={() => handleDeleteRestaurant(selectedRestaurant)}
                  >
                     Eliminar
                  </Button>
               </FormItem>
            </RestaurantForm>
         </Card2>
      </Modal>
   )
}
