import { useMemo } from 'react';

export const useGenerateResources = ({
   isTempResourceChange,
   selectedResource,
   tables = [],
   objects = [],
}) => {

   const mergedResources = useMemo(() => {
      const allResources = [...tables, ...objects]

      if (!isTempResourceChange || !selectedResource) {
         return allResources
      }

      const exists = allResources.some(resource => resource?.id === selectedResource?.id)

      const updatedResources = allResources.map(resource =>
         resource?.id === selectedResource?.id ? { ...selectedResource } : resource
      )

      return exists
         ? updatedResources
         : [...updatedResources, { ...selectedResource }]
   }, [isTempResourceChange, selectedResource, tables, objects])

   return {
      resources: mergedResources
   }
}
