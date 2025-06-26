import { closeModalAction, openModalAction } from '@/doman/store/reserve';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const useModalReserve = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   const isOpenModal = useSelector((state) => state.reserveReducer.isOpenModal);


   useEffect(() => {
      const isReserveRoute = location.pathname.includes('/reserve');

      if (isReserveRoute && !isOpenModal) {
         // console.log('open modal');
         dispatch(openModalAction());
      }

      if (!isReserveRoute && isOpenModal) {
         // console.log('close modal');
         dispatch(closeModalAction());
      }
   }, [location.pathname, dispatch, isOpenModal]);

   const openModal = () => {
      navigate(`${location.pathname}/reserve`, { state: { background: location } });
      dispatch(openModalAction());
   };

   const closeModal = () => {
      navigate(`/${location.pathname.split('/')[1]}`);
      dispatch(closeModalAction());
   };

   return {
      isOpenModal,
      openModal,
      closeModal
   };
};