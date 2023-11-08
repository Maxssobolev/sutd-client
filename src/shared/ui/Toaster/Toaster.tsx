import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react';
import { FC, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { ToastScheme, toastActions } from 'entities/Toast';

import { RootStateSchema } from 'app/providers/ReduxProvider';
import { store } from 'app/providers/ReduxProvider/ui/ReduxProvider';
import { useSelector } from 'react-redux';

interface ToastProps {
    className?: string;
}

const exToast = (toast: ToastScheme) => (
  <CToast color={toast.type} visible={toast.isShow}>
    <CToastHeader closeButton>
      <div className="fw-bold me-auto">Уведомление системы</div>
      <small>только что</small>
    </CToastHeader>
    <CToastBody>{toast.text}</CToastBody>
  </CToast>
)

export const Toaster: FC<ToastProps> = ({className}) => {
  const [myToast, addToast] = useState<ReactElement>()
  const toast = useSelector<RootStateSchema, ToastScheme>(state => state.toast)

  useEffect(() => {
    if(toast.isShow) {
      addToast(exToast(toast));
      setTimeout(() => {
        store.dispatch(toastActions.hide())
      }, 500)
    }
  }, [toast])
  return (
    <CToaster push={myToast} placement="top-end" />
  );
}