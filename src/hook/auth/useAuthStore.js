
import toast from 'react-hot-toast';
import {
   useDispatch
} from 'react-redux';

import {
   authStateEmun,
   checkingCredentialAction,
   logoutAction,
   startCreateUser,
   startGoogleAuth,
   startLogin,
   startLogout
} from '@/doman/store/auth';

export const useAuthStore = (messageState) => {
   const dispatch = useDispatch()

   /**
    * 
    * @param {{email: string, password: string}} dataLoginUser 
    */
   const login = async (dataLoginUser) => {
      await toast.promise(
         dispatch(startLogin(dataLoginUser)),
         {
            ...messageState,
            error: (err) => err.message || messageState.error
         }
      )
   }

   const loginIntial = (user) => {
      dispatch({ type: 'auth/login', payload: user })
   }

   const loginGoogle = () => {
      dispatch(startGoogleAuth())
   }

   const logout = () => {
      dispatch(logoutAction())
   }

   const logoutPermanently = async () => {
      await toast.promise(
         dispatch(startLogout()),
         {
            loading: 'Cerrando sesión',
            success: 'Sesión cerrada',
            error: (err) => err.message
         }
      )
   }

   /**
    * 
    * @param {{name: string, email: string, password: string}} dataRegister 
    */
   const register = async (dataRegister) => {
      await toast.promise(
         dispatch(startCreateUser(dataRegister)),
         {
            ...messageState,
            error: (err) => err.message || messageState.error
         }
      )
   }

   /**
    * 
    * @param {authStateEmun} state 
    */
   const checkingCredentials = (state = authStateEmun.checking) => {
      dispatch(checkingCredentialAction(state))
   }
   
   return {
      login,
      loginGoogle,
      register,
      logout,
      checkingCredentials,
      loginIntial,
      logoutPermanently,
   }
}