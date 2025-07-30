import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { closeModalReserveAction, openModalReserveAction } from '@/doman/store';

export const useModalReserve = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   const isOpenModal = useSelector((state) => state.UIReducer.isOpenModalReserve);


   useEffect(() => {
      const isReserveRoute = location.pathname.includes('/reserve');

      if (isReserveRoute && !isOpenModal) {
         dispatch(openModalReserveAction());
      }

      if (!isReserveRoute && isOpenModal) {
         dispatch(closeModalReserveAction());
      }
   }, [location.pathname, dispatch, isOpenModal]);

   const openModal = () => {
      navigate(`${location.pathname}/reserve`, { state: { background: location } });
      dispatch(openModalReserveAction());
   };

   const closeModal = () => {
      navigate(`/${location.pathname.split('/')[1]}`);
      dispatch(closeModalReserveAction());
   };

   return {
      isOpenModal,
      openModal,
      closeModal
   };
};