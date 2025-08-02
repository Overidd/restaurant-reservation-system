
import {
   useDispatch,
   useSelector
} from 'react-redux';

import {
   authStateEmun,
   checkingCredentialAction,
   logoutAction,
   startCreateUser,
   startGoogleAuth,
   startLogin,
   startLogout,
   startRecoverPassword
} from '@/doman/store/auth';

export const useAuthStore = () => {
   const dispatch = useDispatch()
   const isLoading = useSelector((state) => state.authReducer.isLoading)

   /**
    * 
    * @param {{email: string, password: string}} dataLoginUser 
    */
   const login = async (dataLoginUser) => {
      return dispatch(startLogin(dataLoginUser))
   }

   const loginIntial = (user) => {
      dispatch({ type: 'auth/login', payload: user })
   }

   const loginGoogle = () => {
      return dispatch(startGoogleAuth())
   }

   const logout = () => {
      dispatch(logoutAction())
   }

   const logoutPermanently = async () => {
      return dispatch(startLogout())
   }

   /**
    * 
    * @param {{name: string, email: string, password: string}} dataRegister 
    */
   const register = async (dataRegister) => {
      return dispatch(startCreateUser(dataRegister))
   }

   /**
    * 
    * @param {authStateEmun} state 
    */
   const checkingCredentials = (state = authStateEmun.checking) => {
      dispatch(checkingCredentialAction(state))
   }

   const recoverPassword = (email) => {
      return dispatch(startRecoverPassword(email))
   }

   return {
      isLoading,

      login,
      loginGoogle,
      register,
      logout,
      checkingCredentials,
      loginIntial,
      logoutPermanently,
      recoverPassword
   }
}