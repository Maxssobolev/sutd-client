import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { FC, useCallback } from 'react';
import { ModalScheme, modalActions } from 'entities/Modal';

import { ModalDelete } from './components/ModalDelete/ModalDelete';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import classes from './ModalWizard.module.scss';
import { store } from 'app/providers/ReduxProvider/ui/ReduxProvider';
import { useSelector } from 'react-redux';

interface ModalWizardProps {
    className?: string;
}

export const ModalWizard: FC<ModalWizardProps> = ({className}) => {
  const modal = useSelector<RootStateSchema, ModalScheme>(state => state.modal)
  const closeModal = () => store.dispatch(modalActions.close())

  const renderModal = useCallback(() => {
    switch(modal.type) {
    case 'delete':
      return <ModalDelete {...modal} close={closeModal}/>
    default:
      return <div>Error modal type</div>
    }
  }, [modal])
  return (
    <div className={classes.ModalWizard}>
      <CModal 
        visible={modal.isShow}
        onClose={closeModal}
      >
        {renderModal()}
      </CModal>
    </div>
  );
}