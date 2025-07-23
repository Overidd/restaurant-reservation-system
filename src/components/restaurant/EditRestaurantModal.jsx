import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { RestaurantForm } from './RestaurantForm';


export const EditRestaurantModal = ({
   isOpen,
   onClose,
   selectedRestaurant
}) => {

   const onSubmit = ({ form, reset }) => {

   }

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
      >
         <Card2
            className='space-y-4'
         >
            <RestaurantForm
               onSubmit={onSubmit}
               selectedRestaurant={selectedRestaurant}
            >
               <Button
                  type='submit'
               >
                  Actualizar
               </Button>
               <Button
                  type='submit'
               >
                  Eliminar
               </Button>
            </RestaurantForm>
         </Card2>
      </Modal>
   )
}
