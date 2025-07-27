import { useCallback, useMemo, useState } from 'react';

// export interface Position {
//    x: number
//    y: number
// }

// export interface Resource {
//    id: string
//    type: string
//    positionX: number
//    positionY: number
//    width?: number
//    height?: number
//    isCursor?: boolean
//    [key: string]: any
// }

// export interface BoardConfig {
//    rows: number
//    columns: number
// }

export const useBoardState = (restaurant, initialResources = []) => {
   const [resources, setResources] = useState(initialResources)
   const [selectedResource, setSelectedResource] = useState(null)
   const [draggedResource, setDraggedResource] = useState(null)
   const [previewResource, setPreviewResource] = useState(null)

   // Memoized occupied cells calculation
   const occupiedCells = useMemo(() => {
      const occupied = new Set()
      resources.forEach((resource) => {
         const { positionX, positionY, width = 1, height = 1 } = resource
         for (let dx = 0; dx < width; dx++) {
            for (let dy = 0; dy < height; dy++) {
               occupied.add(`${positionX + dx}-${positionY + dy}`)
            }
         }
      })
      return occupied
   }, [resources])

   // Check if position is valid for placing resource
   const isValidPosition = useCallback(
      (x, y, width = 1, height = 1, excludeId) => {
         // Check bounds
         if (x < 1 || y < 1 || x + width - 1 > restaurant.rows || y + height - 1 > restaurant.columns) {
            return false
         }

         // Check collisions with other resources
         const tempOccupied = new Set()
         resources
            .filter((r) => r.id !== excludeId)
            .forEach((resource) => {
               const { positionX, positionY, width: rWidth = 1, height: rHeight = 1 } = resource
               for (let dx = 0; dx < rWidth; dx++) {
                  for (let dy = 0; dy < rHeight; dy++) {
                     tempOccupied.add(`${positionX + dx}-${positionY + dy}`)
                  }
               }
            })

         for (let dx = 0; dx < width; dx++) {
            for (let dy = 0; dy < height; dy++) {
               if (tempOccupied.has(`${x + dx}-${y + dy}`)) {
                  return false
               }
            }
         }

         return true
      },
      [resources, restaurant],
   )

   const addResource = useCallback(
      (resource) => {
         if (isValidPosition(resource.positionX, resource.positionY, resource.width, resource.height)) {
            setResources((prev) => [...prev, resource])
            return true
         }
         return false
      },
      [isValidPosition],
   )

   const updateResource = useCallback((id, updates) => {
      setResources((prev) => prev.map((resource) => (resource.id === id ? { ...resource, ...updates } : resource)))
   }, [])

   const removeResource = useCallback(
      (id) => {
         setResources((prev) => prev.filter((resource) => resource.id !== id))
         if (selectedResource?.id === id) {
            setSelectedResource(null)
         }
      },
      [selectedResource],
   )

   const moveResource = useCallback(
      (id, newX, newY) => {
         const resource = resources.find((r) => r.id === id)
         if (!resource) return false

         if (isValidPosition(newX, newY, resource.width, resource.height, id)) {
            updateResource(id, { positionX: newX, positionY: newY })
            return true
         }
         return false
      },
      [resources, isValidPosition, updateResource],
   )

   return {
      resources,
      selectedResource,
      setSelectedResource,
      draggedResource,
      setDraggedResource,
      previewResource,
      setPreviewResource,
      occupiedCells,
      isValidPosition,
      addResource,
      updateResource,
      removeResource,
      moveResource,
   }
}
