import { MapManagerContext } from '@/doman/context/map';
import { useContext } from 'react';

export const useMapManagerContext = () => {

   const ctx = useContext(MapManagerContext)

   if (!ctx) throw new Error('useBoardManagerContext debe usarse dentro de BoardManagerProvider')

   return {
      resources: ctx.resources,
      isEdit: ctx.isEdit,
      selectedResource: ctx.selectedResource,
      setSelectedResource: ctx.setSelectedResource,
      toggleIsTempResourceChange: ctx.toggleIsTempResourceChange,
      updateSelectedResource: ctx.updateSelectedResource,
   }
}
