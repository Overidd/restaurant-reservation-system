import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { startChecking } from '@/doman/store/auth'

export const useAutoCheckAuth = () => {
   const dispatch = useDispatch()

   useEffect(() => {

      dispatch(startChecking())
   }, [])

   return
}