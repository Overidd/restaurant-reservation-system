import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { closeModalAuthAction, openModalAuthAction } from '@/doman/store';

const authRouter = ['/login', '/register', '/recover'];

export const useModalAuth = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   const isOpenModal = useSelector((state) => state.UIReducer.isOpenModalAuth);

   useEffect(() => {
      const isAuthRoute = authRouter.some(route => location.pathname.includes(route));

      if (isAuthRoute && !isOpenModal) {
         dispatch(openModalAuthAction());
      }

      if (!isAuthRoute && isOpenModal) {
         dispatch(closeModalAuthAction());
      }
      
   }, [location.pathname, dispatch, isOpenModal]);

   /**
    * @param {string} to login | register
    */
   const openModal = (to = 'login') => {
      navigate(`/${location.pathname.split('/')[1]}/${to}`, { state: { background: location } });
      dispatch(openModalAuthAction());
   };

   const closeModal = () => {
      navigate(`/${location.pathname.split('/')[1]}`);
      dispatch(closeModalAuthAction());
   };

   return {
      isOpenModal,
      openModal,
      closeModal
   }
}