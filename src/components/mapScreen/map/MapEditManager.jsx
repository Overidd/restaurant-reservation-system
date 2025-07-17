import { CreateCategoryProvider, CreateObjectProvider } from '@/doman/context/object';
import { useModalTableEdit, useModalTableEditProperty } from '@/hook';
import { useMapManagerContext } from '@/hook/context';
import { useStateFilterRestaurant } from '@/hook/dashboard';
import { useSlideOverObjectCreate } from '@/hook/slideover';
import { useEffect } from 'react';
import { CreateResourceSlideOver, MapEdit, ModalManagerObjects, ModalTableEdit, ModalTableEditProperty, SlideOverEditDimensionMap } from '..';

export const MapEditManager = () => {

   const {
      isEdit,
      resources,
      selectedResource,
      setSelectedResource,
      updateSelectedResource,
      toggleIsTempResourceChange
   } = useMapManagerContext()

   const {
      filter: {
         restaurant,
      },
   } = useStateFilterRestaurant();

   const {
      isOpen: isOpenModalEdit,
      openModal: openModalEdit,
      closeModal: closeModalEdit
   } = useModalTableEdit();

   const {
      isOpen: isOpenModalEditProperty,
      closeModal: closeModalEditProperty,
      openModal: openModalEditProperty,
   } = useModalTableEditProperty();

   const {
      isOpen: isOpenObjectCreate,
      closeModal: closeModalObjectCreate,
      openModal: openModalCreateObj,
   } = useSlideOverObjectCreate();


   // const onChangeFilter = (data) => {
   //    setCurrentValue(data);
   //    loadTables(data);
   // }

   const onOpenEditTableProperty = () => {
      openModalEditProperty();
      toggleIsTempResourceChange(true);
      closeModalEdit();
   }

   const onCloseEditProperty = () => {
      toggleIsTempResourceChange(false);
      closeModalEditProperty();
      setSelectedResource({});
   };

   const closeModalEditTable = () => {
      closeModalEdit();
      setSelectedResource({});
   };
   const onOpenEditTable = (table) => {
      setSelectedResource(table);
      openModalEdit();
   }

   const onOpenCreateObject = (data) => {
      setSelectedResource(data);
      openModalCreateObj();
   }

   const handleCloseEdit = () => {
      closeModalObjectCreate();
      toggleIsTempResourceChange(false);
   }

   useEffect(() => {
      if (isEdit) return;
      handleCloseEdit();
   }, [isEdit])

   return (
      <>
         <MapEdit
            rows={restaurant.rows}
            columns={restaurant.columns}
            resources={resources}
            onOpenEditTable={onOpenEditTable}
            onOpenCreateObject={onOpenCreateObject}
            selectedResource={selectedResource}
            onDeleteTable={() => { }}
         />

         <SlideOverEditDimensionMap
            name={restaurant.name}
            rows={restaurant.rows}
            columns={restaurant.columns}
            isOpen={isEdit}
         />

         {isOpenObjectCreate &&
            <CreateCategoryProvider>
               <CreateObjectProvider>
                  <CreateResourceSlideOver
                     isOpen={isOpenObjectCreate}
                  />
                  <ModalManagerObjects />
               </CreateObjectProvider>
            </CreateCategoryProvider>
         }

         {
            isOpenModalEdit &&
            <ModalTableEdit
               initial={selectedResource}
               isOpen={isOpenModalEdit}
               onClose={closeModalEditTable}
               onOpenEditProperty={onOpenEditTableProperty}
            />
         }

         {isOpenModalEditProperty && (
            <ModalTableEditProperty
               isOpen={isOpenModalEditProperty}
               onClose={onCloseEditProperty}
               initial={selectedResource}
               onChangeValue={updateSelectedResource}
               axieRestaurant={{
                  x: restaurant.rows,
                  y: restaurant.columns
               }}
            />
         )}
      </>
   )
}