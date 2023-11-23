import { CButton, CFormInput, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { FC, useState } from 'react';

import { $host } from 'shared/http/host';
import { ModalScheme } from 'entities/Modal';
import classes from './ModalDelete.module.scss';
import { mutate } from 'swr';
import { store } from 'app/providers/ReduxProvider/ui/ReduxProvider';
import { toastActions } from 'entities/Toast';

interface ModalDeleteProps extends ModalScheme{
    className?: string;
    close: () => void;
}

export const ModalDelete: FC<ModalDeleteProps> = ({className, confirmationText, payload, type, close, additionalText}) => {
  const [input, setInput] = useState('')
  const onApprove = async () => {
    try {
      await $host.delete(`/api/${payload?.entityName}s/${payload?.entityId}`)
      await mutate((key:string) => key.includes('api/'))
      store.dispatch(toastActions.show({type: "success", text: 'Данные удалены'}));
      close();
    }
    catch(e) {
      console.log(e)
      store.dispatch(toastActions.show({type: "error", text: 'Во время удаления произошла ошибка, свяжитесь с администратором'}));
    }
  }

  return (
    <div className={classes.ModalDelete}>
      <CModalHeader>
        <CModalTitle>
          <div className={classes.confirmationText}>{confirmationText}</div>
          {additionalText ? <div className={classes.additionalText}>{additionalText}</div> : ''}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput type="text" value={input} valid={input == confirmationText} onChange={(e) => setInput(e.target.value)} label="Пожалуйста, наберите выделенный текст" />
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" disabled={input != confirmationText} onClick={onApprove}>
          Подтверждаю
        </CButton>
        <CButton color="secondary" onClick={close}>Отмена</CButton>
      </CModalFooter>
    </div>
  );
}