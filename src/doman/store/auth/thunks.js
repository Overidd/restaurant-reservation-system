import { authService } from '@/doman/services';

import { checkingCredentialAction, loaddingAction, loginAction, logoutAction } from './authSlice';

export const startGoogleAuth = () => {
   return async (dispatch) => {
      dispatch(checkingCredentialAction());

      const res = await authService.googleAuth();

      if (!res.ok) {
         dispatch(logoutAction({ errorMessage: res.errorMessage }));
         return;
      }

      dispatch(loginAction(res));
   };
};


/**
 * @param {{email: string, password: string, name: string, lastName: string}} dataRegister 
 * @returns 
 */
export const startCreateUser = (dataRegister) => {
   return async (dispatch) => {
      dispatch(checkingCredentialAction());
      dispatch(loaddingAction());

      const res = await authService.register(dataRegister);

      if (!res.ok) {
         dispatch(logoutAction({ errorMessage: res.errorMessage }));
         throw new Error(res.errorMessage);
      }

      dispatch(loginAction(res));
   }
}

/**
 * 
 * @param {{email: string, password: string}} dataLoginUser 
 * @returns 
 */
export const startLogin = (dataLoginUser) => {

   return async (dispatch) => {
      dispatch(checkingCredentialAction());
      dispatch(loaddingAction());

      const res = await authService.login(dataLoginUser);
      if (!res.ok) {
         dispatch(logoutAction({ errorMessage: res.errorMessage }));
         throw new Error(res.errorMessage);
      }
      dispatch(loginAction(res));
   }
}

export const startLogout = () => {
   return async (dispatch) => {
      await authService.logout();
      dispatch(logoutAction({}));
      dispatch(checkingCredentialAction());
   }
}

export const startChecking = () => {
   return async (dispatch) => {
      const { isUserLogged, ...res } = await authService.checking();

      if (!res.ok) {
         dispatch(logoutAction({ errorMessage: res.errorMessage }));
         // throw new Error(res.errorMessage);
         return;
      }

      if (!isUserLogged) {
         dispatch(logoutAction({}));
         return;
      }

      dispatch(loginAction(res));
   }
}
