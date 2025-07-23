import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { RestaurantForm } from './RestaurantForm';


export const CreateRestaurantModal = ({
   isOpen,
   onClose,
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
            >
               <Button
                  type='submit'
               >
                  Crear nuevo restaurante
               </Button>
            </RestaurantForm>
         </Card2>
      </Modal>
   )
}
