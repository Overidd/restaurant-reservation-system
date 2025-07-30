import { StatsSummary } from '@/components/common';
import { Button } from '@/components/UI/common';
import { UserDetailModal, UsersTable } from '@/components/userDetails';
import { useDownloadPdf } from '@/hook/dashboard';
import { useLoadUsers } from '@/hook/dashboard/useLoadUsers';
import { useModalUserDetail } from '@/hook/modals';
import { FileText, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export const UserDetailScreen = () => {
  const [selectedUser, setSelectedUser] = useState(null)

  const {
    metrics,
    users,
    loadings
  } = useLoadUsers()

  const {
    isOpen,
    openModal,
    closeModal
  } = useModalUserDetail()

  const {
    loading,
    downloadUserDetailPdf
  } = useDownloadPdf()

  const handleOpenModal = (user) => {
    if (!user) return;
    setSelectedUser(user)
    openModal()
  }

  return (
    <div className='min-h-screen p-4 md:p-6 lg:p-8 mx-auto max-w-7xl space-y-6'>
      <Button
        className={'w-fit flex ml-auto'}
        disabled={loading.downloadUserDetails}
        onClick={() => downloadUserDetailPdf({
          users
        })}
      >
        Generar Reporte
        {loading.downloadUserDetails
          ? <LoaderCircle className='animate-spin' />
          : <FileText />
        }
      </Button>

      <StatsSummary
        isLoading={loadings?.users}
        metrics={metrics}
      />

      <UsersTable
        onSelectUser={handleOpenModal}
        itemsPerPage={10}
        users={users}
      />

      {
        isOpen &&
        <UserDetailModal
          className={'md:w-xl'}
          isOpen={isOpen}
          onClose={closeModal}
          client={selectedUser}
        />
      }
    </div>
  )
}

export default UserDetailScreen;