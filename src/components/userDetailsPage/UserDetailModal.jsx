import { cn, Validations } from '@/ultils';
import { Modal } from '../UI/common';
import { useState } from 'react';
import { useForm } from '@/hook/common';
import { useReservationWithToast, useReservationFilter, useUserDetail } from '@/hook/dashboard';
import { UserToasts } from '@/toasts/UserToasts';
import {
   UserDetailHeader,
   UserDetailForm,
   UserDetailInfo,
   UserDetailMetrics,
   UserDetailTabs,
} from '.';
import { Card2 } from '../UI/card';
import { EditReservationModal } from '../common';

const initValidation = {
   name: [
      (value) => value && value?.length >= 3,
      'El nombre debe tener al menos 3 caracteres',
   ],
   email: [
      (value) => Validations.email(value),
      'El email debe tener al menos 3 caracteres',
   ],
   phone: [
      (value) => Validations.phone(value),
      'El telefono debe tener al menos 3 caracteres',
   ],
   address: [
      (value) => value && value?.length >= 3,
      'La direccion debe tener al menos 3 caracteres',
   ]
};

export const UserDetailModal = ({
   isOpen,
   onClose,
   selectUser,
   className
}) => {
   const [isEditing, setIsEditing] = useState(false);
   const [isEditReservation, setIsEditReservation] = useState(false);
   const [currentReservation, setCurrentReservation] = useState({})

   const {
      isLoading,
      releaseReservationWithToast,
      confirmReservationWithToast,
      cancelReservationWithToastSimple,
   } = useReservationWithToast();

   const {
      updateProfile,
      loading,
   } = useUserDetail();

   const {
      filteredReservations,
      handleStatusFilter,
      selectedStatus
   } = useReservationFilter(selectUser.reservations);

   const {
      onSubmitForm,
      onValueChange,
      onInitialFrom,
      formState: {
         name,
         email,
         phone,
         address
      },
      formValidation: {
         nameValid,
         emailValid,
         phoneValid,
         addressValid
      },
   } = useForm({
      validations: initValidation,
      activeValidation: true,
      initialState: {
         name: selectUser.name,
         email: selectUser.email,
         phone: selectUser.phone,
         address: selectUser.address,
      },
   });

   const handleEditReservetion = (reservation) => {
      setIsEditReservation(true);
      setCurrentReservation(reservation);
   };

   const onSubmit = onSubmitForm((value) => {
      UserToasts.updateProfile(
         updateProfile({
            ...value,
            idUser: selectUser.id
         }), {
         onSuccess: () => {
            setIsEditing(false);
            onInitialFrom({
               name: selectUser.name,
               email: selectUser.email,
               phone: selectUser.phone,
               address: selectUser.address,
            });
         }
      });
   });

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         className=''
      >
         <Card2 className={cn('space-y-6', className)}>
            <UserDetailHeader
               isEditing={isEditing}
               loading={loading}
               selectUser={selectUser}
               setIsEditing={setIsEditing}
            />
            <div className='flex-1 space-y-4 flex flex-col items-start gap-4 p-0'>
               {isEditing ? (
                  <UserDetailForm
                     name={name}
                     email={email}
                     phone={phone}
                     address={address}
                     nameValid={nameValid}
                     emailValid={emailValid}
                     phoneValid={phoneValid}
                     addressValid={addressValid}
                     onValueChange={onValueChange}
                     onSubmit={onSubmit}
                  />
               ) : (
                  <UserDetailInfo selectUser={selectUser} />
               )}
            </div>

            <UserDetailMetrics selectUser={selectUser} />

            <UserDetailTabs
               isLoading={isLoading}
               selectUser={selectUser}
               selectedStatus={selectedStatus}
               handleStatusFilter={handleStatusFilter}
               filteredReservations={filteredReservations}
               handleEditReservetion={handleEditReservetion}
               handleCancelReservation={cancelReservationWithToastSimple}
               handleConfirmReservation={confirmReservationWithToast}
               handleReleasedReservation={releaseReservationWithToast}
            />
         </Card2>

         {isEditReservation &&
            <EditReservationModal
               className={'w-xl'}
               activaBtns={['update']}
               isActiveOverflow={false}
               isOpen={isEditReservation}
               reservation={currentReservation}
               onClose={() => setIsEditReservation(false)}
            />
         }
      </Modal>
   );
}

