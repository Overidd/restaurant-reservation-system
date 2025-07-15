import { useDispatch, useSelector } from 'react-redux';

import { toggleIsEditAction } from '@/doman/store/dashboard';

export const useEditTables = () => {
   const isEdit = useSelector((state) => state.tableAdminReducer.isEdit);
   const dispatch = useDispatch();

   const toggleIsEdit = (is) => { //false or true
      dispatch(toggleIsEditAction(is));
   }

   return {
      isEdit,
      toggleIsEdit
   }
}
