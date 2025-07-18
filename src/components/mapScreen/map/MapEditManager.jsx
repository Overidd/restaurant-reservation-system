import { CreateCategoryProvider, CreateObjectProvider } from '@/doman/context/object';
import { useModalTableEdit, useModalTableEditProperty } from '@/hook';
import { useMapManagerContext } from '@/hook/context';
import { useSlideOverObjectCreate } from '@/hook/slideover';
import { CreateResourceSlide, EditDimensionMapSlide, EditTablePropertySlide, EditTableSlide, MapEdit, ModalManagerObjects } from '..';

export const MapEditManager = () => {

   const {
      isEdit,
      resources,
      restaurant,
      selectedResource,
      setSelectedResource,
      updateSelectedResource,
      toggleIsTempResourceChange,
      changeValueTempRestaurant
   } = useMapManagerContext()

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
      openModal: openModalCreateObject,
   } = useSlideOverObjectCreate();

   const handleOpenEditTableProperty = () => {
      closeModalEdit();
      openModalEditProperty();
      toggleIsTempResourceChange(true);
   }

   const handleOpenEditTable = (table) => {
      openModalEdit();
      closeModalObjectCreate();
      setSelectedResource(table);
   }

   const handleOpenCreateObject = (data) => {
      closeModalEdit();
      openModalCreateObject();
      setSelectedResource(data);
      toggleIsTempResourceChange(true);
   }

   const handleCloseEditProperty = () => {
      closeModalEditProperty();
      setSelectedResource(null);
      toggleIsTempResourceChange(false);
   };

   const handleCloseModalEditTable = () => {
      closeModalEdit();
      setSelectedResource(null);
      toggleIsTempResourceChange(false);
   };

   console.log(restaurant.rows, restaurant.columns);
   return (
      <>
         <MapEdit
            rows={restaurant.rows}
            columns={restaurant.columns}
            resources={resources}
            onOpenEditTable={handleOpenEditTable}
            onOpenCreateObject={handleOpenCreateObject}
            selectedResource={selectedResource}
            onDeleteTable={() => { }}
         />

         <EditDimensionMapSlide
            isOpen={isEdit}
            restaurant={restaurant}
            changeValueTempRestaurant={changeValueTempRestaurant}
         />

         {isOpenObjectCreate &&
            <CreateCategoryProvider>
               <CreateObjectProvider>
                  <CreateResourceSlide
                     selectedResource={selectedResource}
                     onClose={closeModalObjectCreate}
                     isOpen={isOpenObjectCreate}
                  />
                  <ModalManagerObjects />
               </CreateObjectProvider>
            </CreateCategoryProvider>
         }

         {
            isOpenModalEdit &&
            <EditTableSlide
               initial={selectedResource}
               isOpen={isOpenModalEdit}
               onClose={handleCloseModalEditTable}
               onOpenEditProperty={handleOpenEditTableProperty}
            />
         }

         {isOpenModalEditProperty && (
            <EditTablePropertySlide
               isOpen={isOpenModalEditProperty}
               onClose={handleCloseEditProperty}
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