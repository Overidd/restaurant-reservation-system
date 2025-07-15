import { dasboardServiceProvider } from '@/doman/services';
import { useReducer } from 'react';

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
}

const initialState = {
   objects: [],
   isLoadingLoad: false,
   isLoadingCreate: false,
   isLoadingUpdate: false,
   isLoadingDelete: false,
   errorMessage: null
}

const reducer = (state, action) => {
   switch (action.type) {
      case typeReducer.LOAD_START:
         return { ...state, isLoadingLoad: true, errorMessage: null, objects: [] }
      case typeReducer.LOAD_SUCCESS:
         return { ...state, isLoadingLoad: false, objects: action.payload }
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
      default:
         return state
   }
}



export const useObjects = () => {
   const [state, dispatch] = useReducer(reducer, initialState)

   const loadObjects = async (idCategory) => {
      dispatch({ type: typeReducer.LOAD_START })

      const { ok, errorMessage, objects } = await dasboardServiceProvider.getObjectsByCategoryId(idCategory);

      if (!ok) {
         dispatch({ type: typeReducer.LOAD_ERROR, payload: errorMessage })
         return
      }

      dispatch({ type: typeReducer.LOAD_SUCCESS, payload: objects })
   }

   const createObject = async (data) => {
      dispatch({ type: typeReducer.CREATE_START })
      const { ok, errorMessage } = await dasboardServiceProvider.createObjectInCategory(data);

      dispatch({ type: typeReducer.CREATE_END })

      if (!ok) throw errorMessage

      return ok
   }

   const updateObject = async ({
      idCategory,
      idObject,
      data
   }) => {
      dispatch({ type: typeReducer.UPDATE_START })
      const { ok, errorMessage } = await dasboardServiceProvider.updateObjectInCategory({
         idCategory,
         idObject,
         ...data
      });

      dispatch({ type: typeReducer.UPDATE_END })

      if (!ok) throw errorMessage

      return ok
   }

   const deleteObject = async ({
      idCategory,
      idObject
   }) => {
      dispatch({ type: typeReducer.DELETE_START })
      const { ok, errorMessage } = await dasboardServiceProvider.deleteObjectInCategory({
         idCategory,
         idObject
      });

      dispatch({ type: typeReducer.DELETE_END })

      if (!ok) throw errorMessage

      return ok
   }

   const getObjectByName = (name) => state.objects.find(object => object.name === name)

   // useEffect(() => {
   //    if (!idCategory || !isInitialLoad) return
   //    loadObjects(idCategory)
   // }, [idCategory, isInitialLoad])

   return {
      errorMessage: state.errorMessage,
      isLoadingCreate: state.isLoadingCreate,
      isLoadingUpdate: state.isLoadingUpdate,
      isLoadingDelete: state.isLoadingDelete,
      isLoadingLoad: state.isLoading,
      objects: state.objects,
      loadObjects,
      createObject,
      updateObject,
      deleteObject,
      getObjectByName
   }
}