import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authStateEmun, startChecking } from '@/doman/store/auth'

export const useCheckAuth = ({ autoCheck = false }) => {
   const status = useSelector((state) => state.authReducer.status)
   const dispatch = useDispatch()

   useEffect(() => {
      if (!autoCheck) return;

      dispatch(startChecking())
   }, [autoCheck])

   const isAuthUser = useMemo(() => status === authStateEmun.checking, [status])
   const isAuthenticated = useMemo(() => status === authStateEmun.authenticated, [status])

   return {
      status,
      isAuthUser,
      isAuthenticated
   }
}