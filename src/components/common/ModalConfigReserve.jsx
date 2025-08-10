import { useModalConfirmReserve } from '@/hook/reservationFromStep';
import { Card2 } from '../UI/card';
import { Modal } from '../UI/common';
// import { useLocation, useNavigate } from 'react-router-dom';

export const ModalConfigReserve = () => {
   // const navigate = useNavigate();
   // const location = useLocation();
   const { isOpenModal, closeModal } = useModalConfirmReserve();

   const changeCloseModal = () => {
      closeModal();
      // navigate(`/${location.pathname.split('/')[1]}`, { state: { background: location } });
   }

   return (
      <Modal
         isOpen={isOpenModal}
         onClose={changeCloseModal}
      >
         <Card2>
            <img src="/icon/success.svg" alt="" />
            Reserva exitosa
         </Card2>
      </Modal>
   )
}