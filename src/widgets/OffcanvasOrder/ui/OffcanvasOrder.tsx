import { CButton, CCloseButton, CCol, CFormInput, CFormSelect, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import useAbonements, { IAbonementSelectData } from 'shared/hooks/useAbonements';
import useSWR, { SWRResponse, mutate, useSWRConfig } from 'swr';

import { $host } from 'shared/http/host';
import { $hostGet } from 'shared/http/helpers/hostGet';
import { Abonement } from 'entities/Abonement/model';
import { ApplyBtn } from 'shared/ui/Forms/ApplyBtn/ApplyBtn';
import { FC } from 'react';
import { GetOneClient } from 'shared/types/api/clients';
import { GetOneOrder } from 'shared/types/api/orders';
import { OrderStatus } from 'entities/Order/types/order.statuses';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import classes from './OffcanvasOrder.module.scss';
import { clientActions } from 'entities/Client/slice';
import { store } from 'app/providers/ReduxProvider/ui/ReduxProvider';
import { toastActions } from 'entities/Toast';
import useMentors from 'shared/hooks/useMentors';
import { useSelector } from 'react-redux';

interface OffcanvasProps {
    className?: string;
}

//clientId can be -1 if we create one
export const OffcanvasOrder: FC<OffcanvasProps> = ({className}) => {
  const orderId = useSelector<RootStateSchema, number | null>(state => state.purchase.selectedId)
  const { data: purchase, isLoading }: SWRResponse<GetOneOrder> = useSWR(
    orderId == -1 || orderId == null ? null : `api/orders/${orderId}`,
    $hostGet,
  );
  const mentors = useMentors()
  const abonements = useAbonements()
  
  const initialValues: GetOneOrder = orderId == -1 || orderId == null ? {
    abonement_description: '',
    abonement_duration: 0,
    abonement_id: 0,
    abonement_price: 0,
    abonement_title: '',
    client_dob: '',
    order_client_id: 0,
    order_createdat: '',
    order_id: 0,
    order_mentor_id: 0,
    order_notes: '',
    order_status: OrderStatus.notStated,
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
  } : purchase!
  
  const hide = () => {
    store.dispatch(clientActions.deselect())
  }

  return (
  
    <COffcanvas className={classes.Offcanvas} placement="start" visible={!!orderId} onHide={hide}>
      <COffcanvasHeader>
        <COffcanvasTitle className={classes.offsetHeader}>Заказ #{orderId}</COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={hide}>X</CCloseButton>
      </COffcanvasHeader>
      <COffcanvasBody>
        
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values) => {
            if(orderId == -1) {
              //then we create
            } else {
              //then we update
              $host.put(`/api/clients/${orderId}`, values).then(r => {           
                mutate((key:string) => key.includes('api/clients')).then(() => store.dispatch(toastActions.show({type: "success", text: 'Данные сохранены'})));
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
                  <h2 className={classes.header}>Данные о клиенте:</h2>
                  <CRow>
                    <CCol>
                      <Field name="client_fio">{({ field }: FieldProps) => 
                        <CFormInput type="text" label="ФИО" {...field} />}
                      </Field>
                    </CCol>
                    <CCol>
                      <Field name="client_phone">{({ field }: FieldProps) => 
                        <CFormInput type="tel" label="Телефон" {...field} />}
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
                    (orderId == -1 || !values?.abonement_id || !values?.client_ismember) ? <div className={classes.abonementEntry}>Сведения отсутствуют</div> : <div className={classes.abonementEntry}>
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