import { CCloseButton, CCol, CFormInput, CFormSelect, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import useAbonements, { IAbonementSelectData } from 'shared/hooks/useAbonements';
import useSWR, { SWRResponse } from 'swr';

import { $hostGet } from 'shared/http/helpers/hostGet';
import { Abonement } from 'entities/Abonement/model';
import { Client } from 'entities/Client';
import { FC } from 'react';
import { GetOneClient } from 'shared/types/api/clients';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import classes from './OffcanvasClient.module.scss';
import { clientActions } from 'entities/Client/slice';
import { store } from 'app/providers/ReduxProvider/ui/ReduxProvider';
import useMentors from 'shared/hooks/useMentors';
import { useSelector } from 'react-redux';

interface OffcanvasProps {
    className?: string;
}

export const OffcanvasClient: FC<OffcanvasProps> = ({className}) => {
  const clientId = useSelector<RootStateSchema, number | null>(state => state.client.selectedId)
  const { data: client, isLoading }: SWRResponse<GetOneClient> = useSWR(
    clientId == -1 || clientId == null ? null : `api/clients/${clientId}`,
    $hostGet,
  );
  const mentors = useMentors()
  const abonements = useAbonements()

  const initialValues: GetOneClient = clientId == -1 || clientId == null ? {
    abonement_description: '',
    abonement_duration: 0,
    abonement_id: 0,
    abonement_price: 0,
    abonement_title: '',
    client_dob: '',
    client_fio: '',
    client_id: 0,
    client_ismember: false,
    client_phone: '',
    mentor_id: 0,
    mentor_name: '',
    purchase_enddate: '',
    purchase_ispaid: false,
    purchase_paymentmethod: '',
    purchase_startdate: '',
    purchase_abonement_id: null,
  } : client!
  
  const hide = () => {
    store.dispatch(clientActions.deselect())
  }

  return (
  
    <COffcanvas className={classes.Offcanvas} placement="start" visible={!!clientId} onHide={hide}>
      <COffcanvasHeader>
        <COffcanvasTitle className={classes.offsetHeader}>Клиент #{clientId}</COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={hide} />
      </COffcanvasHeader>
      <COffcanvasBody>
        
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={() => {
            
          }}
        >
          {
            ({values, setFieldValue}) => {
              
              return <Form>
                <div className={classes.client}>
                  <h2 className={classes.header}>Данные о клиенте:</h2>
                  <CRow>
                    <CCol>
                      <Field name="client_fio">{({ field }: FieldProps) => 
                        <CFormInput type="text" label="ФИО" {...field} />}
                      </Field>
                    </CCol>
                    <CCol>
                      <Field name="client_phone">{({ field }: FieldProps) => 
                        <CFormInput type="tel" label="Телефон" pattern="(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?" {...field} />}
                      </Field>
                    </CCol>
                  </CRow>
                  <CRow className={classes.row}>
                    <CCol>
                      <Field name="client_dob">{({ field }: FieldProps) => 
                        <CFormInput type="date" label="Дата рождения" {...field} />}
                      </Field>
                    </CCol>
                    <CCol>
                      
                    
                      <CFormSelect
                        label="Менеджер"
                        onChange={(e) => {
                          setFieldValue('mentor_id', e.target.value);
                        }}
                        className={classes.select}
                        value={values?.mentor_id}
                        options={mentors as any}
                      />
                    </CCol>
                  </CRow>
                </div>

                <div className={classes.abonement}>
                  <h2 className={classes.header}>Сведения по абонементу:</h2>
                  {
                    (clientId == -1 || !values?.abonement_id || !values?.client_ismember) ? <div className={classes.abonementEntry}>Сведения отсутствуют</div> : <div className={classes.abonementEntry}>
                      <CRow>
                        <CCol>
                          <CFormSelect
                            label="Код и наименование абонемента"
                            /**
                             * Здесь небольшой трюк для того чтобы получить по селекту все данные об абонементе
                             */
                            onChange={(e) => {
                              const edata = JSON.parse(e.target.value) as Abonement;
                    
                              setFieldValue('abonement_id', edata.abonement_id);
                              setFieldValue('abonement_price', edata.abonement_price);
                              setFieldValue('abonement_duration', edata.abonement_duration);
                              setFieldValue('abonement_title', edata.abonement_title);
                              setFieldValue('abonement_description', edata.abonement_description);
                            }}
                            className={classes.select}
                            value={abonements.find(abn => abn.id == values?.abonement_id)?.value as any}
                            options={abonements as any}
                          />
                        </CCol>
                      </CRow>
                      
                      <CRow className={classes.row}><CCol>Описание: {values?.abonement_description}</CCol></CRow>
                      <CRow className={classes.row}><CCol>Стоимость, руб.: {values?.abonement_price}</CCol></CRow>
                      <CRow className={classes.row}><CCol>Длительность, руб.: {values?.abonement_duration}</CCol></CRow>
                      <CRow className={classes.row}><CCol>{(values?.purchase_ispaid && (values?.abonement_id == values?.purchase_abonement_id)) ? <div className={classes.paid}>Оплата получена</div> : <div className={classes.unpaid}>Не оплачен</div> }</CCol></CRow>
                      
                      
                    </div>
                  }
                </div>
            
              
              
              </Form>
            }
          }

        </Formik>

      </COffcanvasBody>
    </COffcanvas>
  
  );
}