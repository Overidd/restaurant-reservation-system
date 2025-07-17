import { Modal } from '@/components/UI/common';
import { useCallback, useState } from 'react';
import { ModalAsyncContext } from '.';

export const ModalAsyncProvider = ({ className, children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: null,
    resolve: null
  });

  const showAsyncModal = useCallback((content) => {
    return new Promise((resolve) => {
      setModalState({ isOpen: true, content, resolve });
    });
  }, []);

  const handleClose = useCallback((result) => {
    if (modalState.resolve) modalState.resolve(result);
    setModalState({ isOpen: false, content: null, resolve: null });
  }, [modalState]);

  return (
    <ModalAsyncContext.Provider value={{ showAsyncModal }}>
      {children}
      <Modal
        direction='topright'
        className={className}
        isOpen={modalState.isOpen}
        overlayClassName={'backdrop-blur-none'}
        onClose={() => handleClose(false)}
      >
        {modalState.content && modalState.content({
          onConfirm: (data) => handleClose(data ? { isConfirmed: true, data } : true),
          onCancel: () => handleClose(false),
        })}
      </Modal>
    </ModalAsyncContext.Provider>
  );
};