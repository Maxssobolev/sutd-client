import { CButton, CCloseButton, CCol, CFormInput, CFormSelect, CFormTextarea, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import useSWR, { SWRResponse, mutate, useSWRConfig } from 'swr';

import { $host } from 'shared/http/host';
import { $hostGet } from 'shared/http/helpers/hostGet';
import { Abonement } from 'entities/Abonement/model';
import { ApplyBtn } from 'shared/ui/Forms/ApplyBtn/ApplyBtn';
import { FC } from 'react';
import { GetOneAbonement } from 'shared/types/api/abonements';
import { GetOneClient } from 'shared/types/api/clients';
import InputMask from 'react-input-mask';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import { abonementActions } from 'entities/Abonement';
import classes from './OffcanvasAbonement.module.scss';
import moment from 'moment';
import { store } from 'app/providers/ReduxProvider/ui/ReduxProvider';
import { toastActions } from 'entities/Toast';
import { useSelector } from 'react-redux';

interface OffcanvasProps {
    className?: string;
}

//clientId can be -1 if we create one
export const OffcanvasAbonement: FC<OffcanvasProps> = ({className}) => {
  const abonementId = useSelector<RootStateSchema, number | null>(state => state.abonement.selectedId)
  const { data: abonement, isLoading }: SWRResponse<GetOneAbonement> = useSWR(
    abonementId == -1 || abonementId == null ? null : `api/abonements/${abonementId}`,
    $hostGet,
  );
  
  const initialValues: GetOneAbonement = abonementId == -1 || abonementId == null ? {
    abonement_description: '',
    abonement_duration: 0,
    abonement_id: 0,
    abonement_price: 0,
    abonement_title: '',
  } : abonement!
  
  const hide = () => {
    store.dispatch(abonementActions.deselect())
  }

  return (
  
    <COffcanvas className={classes.Offcanvas} placement="start" visible={!!abonementId} onHide={hide}>
      <COffcanvasHeader>
        <COffcanvasTitle className={classes.offsetHeader}>{abonementId == -1 ? 'Добавить' : `Абонемент #${abonementId}`}</COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={hide}>X</CCloseButton>
      </COffcanvasHeader>
      <COffcanvasBody>
        
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values, {resetForm}) => {
            if(abonementId == -1) {
              //then we create
              $host.post(`/api/abonements`, values).then(r => {           
                mutate((key:string) => key.includes('api/')).then(() => store.dispatch(toastActions.show({type: "success", text: 'Данные добавлены'})));
                store.dispatch(abonementActions.deselect())
                resetForm();
              }).catch(() => {
                store.dispatch(toastActions.show({type: "error", text: 'Ошибка при добавлении'}))
              })
            } else {
              //then we update
              $host.put(`/api/abonements/${abonementId}`, values).then(r => {           
                mutate((key:string) => key.includes('api/')).then(() => store.dispatch(toastActions.show({type: "success", text: 'Данные сохранены'})));
              }).catch(() => {
                store.dispatch(toastActions.show({type: "error", text: 'Ошибка при сохранении'}))
              })
            }
          }}
        >
          {
            ({values, setFieldValue, dirty, submitForm}) => {
              
              return <Form>
                <div className={classes.client}>
                  <h2 className={classes.header}>Данные об абонементе:</h2>
                  <CRow>
                    <CCol>
                      <Field name="abonement_title">{({ field }: FieldProps) => 
                        <CFormInput type="text" label="Наименование" {...field} />}
                      </Field>
                    </CCol>
                    <CCol></CCol>
                  </CRow>
                  <CRow className={classes.row}>
                    <CCol>
                      <Field name="abonement_description">{({ field }: FieldProps) => 
                        <CFormTextarea
                          rows={3}
                          className={classes.select}
                          label="Описание:" 
                          {...field}
                        ></CFormTextarea>
                      }
                      </Field>
                    </CCol>
                  </CRow>
                  <CRow className={classes.row}>
                    <CCol>
                      <Field name="abonement_price">{({ field }: FieldProps) => 
                        <CFormInput type="number" label="Стоимость, рублей" {...field} />}
                      </Field>
                    </CCol>
                    <CCol>
                      <Field name="abonement_duration">{({ field }: FieldProps) => 
                        <CFormInput type="number" label="Длительность, дней" {...field} />}
                      </Field>
                    </CCol>
                  </CRow>
                </div>
                <div className={classes.controls}>
                  { dirty && <ApplyBtn duration={1000} color="#17d517" onApply={submitForm} >Сохранить изменения</ApplyBtn>}
                </div>
              </Form>
            }
          }

        </Formik>

      </COffcanvasBody>
    </COffcanvas>
  
  );
}