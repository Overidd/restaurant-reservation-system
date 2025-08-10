import { useRestaurant } from '@/hook/restaurantPage';
import { AdminTableToasts } from '@/toasts';
import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { Label } from '../UI/from';
import { RestaurantForm } from './RestaurantForm';


export const CreateRestaurantModal = ({
   isOpen,
   onClose,
}) => {

   const {
      createRestaurant
   } = useRestaurant()

   const onSubmit = ({ form, reset }) => {
      AdminTableToasts.createRestaurant(
         createRestaurant(form),
         {
            onSuccess: () => {
               requestAnimationFrame(() => reset?.());
            },
         }
      );
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
               Crear restaurante
            </Label>
            <RestaurantForm
               onSubmit={onSubmit}
            >
               <Button
                  type='submit'
               >
                  Crear
               </Button>
            </RestaurantForm>
         </Card2>
      </Modal>
   )
}
