import { CreateCategoryProvider } from '@/doman/context/object/CreateCategoryProvider';
import { CreateObjectProvider } from '@/doman/context/object/CreateObjectProvider';
import { useMapManagerContext } from '@/hook/context';
import { useModalTableEdit, useRestaurantUi } from '@/hook/dashboard';
import { useModalTableEditProperty } from '@/hook/map';
import { useSlideOverObjectCreate } from '@/hook/slideover';
import { CreateResourceSlide, EditDimensionMapSlide, EditTablePropertySlide, EditTableSlide, MapEdit, ModalManagerObjects } from '..';

export const MapEditManager = () => {
   const {
      isEdit,
      resources,
      restaurant,
   } = useMapManagerContext()

   const {
      selectedResource,
      setSelectedResource,
      toggleIsTempResourceChange,
   } = useRestaurantUi();

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
      closeModalEditProperty();
      setSelectedResource(table);
   }

   const handleOpenCreateObject = (data) => {
      closeModalEdit();
      openModalCreateObject();
      setSelectedResource(data);
      closeModalEditProperty();
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

   return (
      <>
         <MapEdit
            restaurant={restaurant}
            resources={resources}
            onOpenEditTable={handleOpenEditTable}
            selectedResource={selectedResource}
            onOpenCreateObject={handleOpenCreateObject}
         />

         <EditDimensionMapSlide
            className={'w-72'}
            isOpen={isEdit}
            restaurant={restaurant}
         />

         {isOpenObjectCreate &&
            <CreateCategoryProvider>
               <CreateObjectProvider>
                  <CreateResourceSlide
                     className={'w-80'}
                     restaurant={restaurant}
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
               className={'w-80'}
               restaurant={restaurant}
               isOpen={isOpenModalEdit}
               onClose={handleCloseModalEditTable}
               selectedResource={selectedResource}
               onOpenEditProperty={handleOpenEditTableProperty}
            />
         }

         {isOpenModalEditProperty && (
            <EditTablePropertySlide
               className={'w-80'}
               restaurant={restaurant}
               isOpen={isOpenModalEditProperty}
               onClose={handleCloseEditProperty}
               selectedResource={selectedResource}
            />
         )}
      </>
   )
}