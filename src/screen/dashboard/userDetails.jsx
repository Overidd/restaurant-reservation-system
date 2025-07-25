import { StatsSummary } from '@/components/common';
import { Button } from '@/components/UI/common';
import { UserDetailModal, UsersTable } from '@/components/userDetails';
import { useLoadUsers } from '@/hook/dashboard/useLoadUsers';
import { useModalUserDetail } from '@/hook/modals';
import { useState } from 'react';

export function ClientDetails() {
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

  const handleOpenModal = (user) => {
    if (!user) return;
    setSelectedUser(user)
    openModal()
  }

  return (
    <div className='min-h-screen p-4 md:p-6 lg:p-8 mx-auto max-w-7xl space-y-6'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-end'>
        {/* <div>
            <h1 className='text-3xl font-bold tracking-tight'>Lista de Clientes</h1>
            <p className='text-muted-foreground'>
              Gestión completa de clientes con historial de reservas y perfiles detallados
            </p>
          </div> */}
        <div className='flex gap-2'>
          <Button
            variant='outline'
          >
            Exportar Datos
          </Button>
          <Button>
            Generar Reporte
          </Button>
        </div>
      </div>

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
