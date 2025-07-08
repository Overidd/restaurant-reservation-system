import { userServiceProvider } from '@/doman/services';
import { validations } from '@/ultils';
import { useState } from 'react';

export const useUser = () => {
  const [state, setUser] = useState({
    user: null,
    isLoading: false,
    errorMessage: null
  })

  const getUserByEmail = async (email) => {
    const [isValid, message] = validations.email(email);
    if (!isValid) {
      setUser({
        user: null,
        isLoading: false,
        errorMessage: message
      })
      return;
    }

    setUser({
      user: null,
      isLoading: true,
      errorMessage: null
    })
    const { ok, errorMessage, ...user } = await userServiceProvider.getUserByEmail(email);

    if (ok) {
      setUser({
        user: user,
        isLoading: false,
        errorMessage: null
      })
      return;
    }

    setUser({
      user: null,
      isLoading: false,
      errorMessage: errorMessage
    })
  }

  const clearUser = () => {
    setUser({
      user: null,
      isLoading: false,
      errorMessage: null
    })
  }

  const isFoundUser = !!state.user;

  return {
    user: state.user,
    isLoading: state.isLoading,
    errorMessage: state.errorMessage,
    getUserByEmail,
    clearUser,
    isFoundUser
  }
}
