import { useState, useCallback } from 'react';
import { Modal } from '@/components/UI/common';
import { ModalContextAsync } from '.';

export const ModalProviderAsync = ({ className, children }) => {
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
    <ModalContextAsync.Provider value={{ showAsyncModal }}>
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
    </ModalContextAsync.Provider>
  );
};