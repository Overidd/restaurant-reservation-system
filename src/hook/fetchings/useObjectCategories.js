import { dasboardServiceProvider } from '@/doman/services';
import { useCallback, useEffect, useReducer } from 'react';

const typeReducer = {
   LOAD_START: 'LOAD_START',
   LOAD_SUCCESS: 'LOAD_SUCCESS',
   LOAD_ERROR: 'LOAD_ERROR',
   CREATE_START: 'CREATE_START',
   CREATE_END: 'CREATE_END',
   UPDATE_START: 'UPDATE_START',
   UPDATE_END: 'UPDATE_END',
   DELETE_START: 'DELETE_START',
   DELETE_END: 'DELETE_END',
   ADD_CATEGORY: 'ADD_CATEGORY',
   UPDATE_CATEGORY: 'UPDATE_CATEGORY',
   DELETE_CATEGORY: 'DELETE_CATEGORY',
}

const initialState = {
   categorys: [],
   isLoadingLoad: false,
   isLoadingCreate: false,
   isLoadingUpdate: false,
   isLoadingDelete: false,
   errorMessage: null
}

const reducer = (state, action) => {
   switch (action.type) {
      case typeReducer.LOAD_START:
         return { ...state, isLoadingLoad: true, errorMessage: null, categorys: [] }
      case typeReducer.LOAD_SUCCESS:
         return { ...state, isLoadingLoad: false, categorys: action.payload }
      case typeReducer.LOAD_ERROR:
         return { ...state, isLoadingLoad: false, errorMessage: action.payload }
      case typeReducer.CREATE_START:
         return { ...state, isLoadingCreate: true }
      case typeReducer.CREATE_END:
         return { ...state, isLoadingCreate: false }
      case typeReducer.UPDATE_START:
         return { ...state, isLoadingUpdate: true }
      case typeReducer.UPDATE_END:
         return { ...state, isLoadingUpdate: false }
      case typeReducer.DELETE_START:
         return { ...state, isLoadingDelete: true }
      case typeReducer.DELETE_END:
         return { ...state, isLoadingDelete: false }
      case typeReducer.ADD_CATEGORY:
         return { ...state, categorys: [...state.categorys, action.payload] }
      case typeReducer.UPDATE_CATEGORY:
         return {
            ...state, categorys: state.categorys.map(category => category.id === action.payload.id ? {
               ...category,
               ...action.payload,
            } : category)
         }
      case typeReducer.DELETE_CATEGORY:
         return { ...state, categorys: state.categorys.filter(category => category.id !== action.payload) }
      default:
         return state
   }
}

export const useObjectCategories = ({ isInitialLoad = false }) => {
   const [state, dispatch] = useReducer(reducer, initialState)

   const loadObjectCategory = useCallback(async () => {
      dispatch({ type: typeReducer.LOAD_START })

      const { ok, errorMessage, categorys } = await dasboardServiceProvider.getAllObjectCategories()

      if (!ok) {
         dispatch({ type: typeReducer.LOAD_ERROR, payload: errorMessage })
         return
      }

      dispatch({ type: typeReducer.LOAD_SUCCESS, payload: categorys })
   }, [])

   const createObjectCategory = useCallback(async (newName) => {
      dispatch({ type: typeReducer.CREATE_START })

      const { ok, errorMessage, newCategory } = await dasboardServiceProvider.createObjectCategory(newName)

      dispatch({ type: typeReducer.CREATE_END })

      if (!ok) throw errorMessage

      dispatch({ type: typeReducer.ADD_CATEGORY, payload: newCategory })

      return ok
   }, [])


   const updateObjectCategory = useCallback(async (data) => {
      dispatch({ type: typeReducer.UPDATE_START })

      const { ok, errorMessage, updatedCategory } = await dasboardServiceProvider.updateObjectCategory(data);

      dispatch({ type: typeReducer.UPDATE_END });

      if (!ok) throw errorMessage;

      dispatch({ type: typeReducer.UPDATE_CATEGORY, payload: updatedCategory })

      return ok;
   }, [])

   const deleteObjectCategory = useCallback(async (id) => {
      dispatch({ type: typeReducer.DELETE_START })

      const { ok, errorMessage } = await dasboardServiceProvider.deleteObjectCategory({ idCategory: id })

      dispatch({ type: typeReducer.DELETE_END })

      if (!ok) throw errorMessage

      dispatch({ type: typeReducer.DELETE_CATEGORY, payload: id })

      return ok
   }, [])

   const getIdCategoryByName = useCallback(
      (name) => state.categorys.find(
         (category) => category.name === name)?.id || null,
      [state.categorys]
   )

   const getCategoryByName = useCallback(
      (name) => state.categorys.find(
         (category) => category.name === name) || null,
      [state.categorys]
   )

   useEffect(() => {
      if (!isInitialLoad) return
      loadObjectCategory()
   }, [isInitialLoad])

   return {
      categorys: state.categorys,
      isLoadingLoad: state.isLoadingLoad,
      isLoadingCreate: state.isLoadingCreate,
      isLoadingUpdate: state.isLoadingUpdate,
      isLoadingDelete: state.isLoadingDelete,
      errorMessage: state.errorMessage,
      loadObjectCategory,
      createObjectCategory,
      updateObjectCategory,
      deleteObjectCategory,
      getIdCategoryByName,
      getCategoryByName
   }
}