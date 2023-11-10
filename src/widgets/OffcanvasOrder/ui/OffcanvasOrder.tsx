import { CButton, CCloseButton, CCol, CFormInput, CFormSelect, CFormTextarea, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import useAbonements, { IAbonementSelectData } from 'shared/hooks/useAbonements';
import useSWR, { SWRResponse, mutate, useSWRConfig } from 'swr';

import { $host } from 'shared/http/host';
import { $hostGet } from 'shared/http/helpers/hostGet';
import { Abonement } from 'entities/Abonement/model';
import { ApplyBtn } from 'shared/ui/Forms/ApplyBtn/ApplyBtn';
import { ChangeStatusBtn } from 'shared/ui/Forms/ChangeStatus/ChangeStatus';
import { FC } from 'react';
import { GetOneClient } from 'shared/types/api/clients';
import { GetOneOrder } from 'shared/types/api/orders';
import { OrderStatus } from 'entities/Order/types/order.statuses';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import classes from './OffcanvasOrder.module.scss';
import { clientActions } from 'entities/Client/slice';
import moment from 'moment';
import { orderActions } from 'entities/Order';
import { store } from 'app/providers/ReduxProvider/ui/ReduxProvider';
import { toastActions } from 'entities/Toast';
import useClients from 'shared/hooks/useClients';
import useMentors from 'shared/hooks/useMentors';
import { useSelector } from 'react-redux';

interface OffcanvasProps {
    className?: string;
}

//clientId can be -1 if we create one
export const OffcanvasOrder: FC<OffcanvasProps> = ({className}) => {
  const orderId = useSelector<RootStateSchema, number | null>(state => state.order.selectedId)
  const { data: order, isLoading }: SWRResponse<GetOneOrder> = useSWR(
    orderId == -1 || orderId == null ? null : `api/orders/${orderId}`,
    $hostGet,
  );
  const mentors = useMentors()
  const abonements = useAbonements()
  const clients = useClients()
  
  const initialValues: GetOneOrder = orderId == -1 || orderId == null ? {
    abonement_description: '',
    abonement_duration: 0,
    abonement_id: 0,
    abonement_price: 0,
    abonement_title: '',
    client_dob: '',
    order_client_id: 0,
    order_createdat: moment().format('YYYY-MM-DD'),
    order_id: 0,
    order_mentor_id: 0,
    order_notes: '',
    order_status: OrderStatus.notStated,
    client_fio: '',
    client_id: 1,
    client_ismember: false,
    client_phone: '',
    mentor_id: 1,
    mentor_name: '',
    purchase_enddate: '',
    purchase_ispaid: false,
    purchase_paymentmethod: '',
    purchase_startdate: '',
    purchase_abonement_id: null,
    purchase_client_id: null,
    purchase_id: null,
  } : order!
  
  const hide = () => {
    store.dispatch(orderActions.deselect())
  }

  return (
  
    <COffcanvas className={classes.Offcanvas} placement="start" visible={!!orderId} onHide={hide}>
      <COffcanvasHeader>
        <COffcanvasTitle className={classes.offsetHeader}>{orderId == -1 ? 'Добавить' : `Заявка #${orderId}`}</COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={hide}>X</CCloseButton>
      </COffcanvasHeader>
      <COffcanvasBody>
        
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values) => {
            if(orderId == -1) {
              //then we create
              $host.post(`/api/orders`, values).then(r => {           
                mutate((key:string) => key.includes('api/orders')).then(() => store.dispatch(toastActions.show({type: "success", text: 'Данные добавлены'})));
              }).catch(() => {
                store.dispatch(toastActions.show({type: "error", text: 'Ошибка при добавлении'}))
              })
            } else {
              //then we update
              $host.put(`/api/orders/${orderId}`, values).then(r => {           
                mutate((key:string) => key.includes('api/orders')).then(() => store.dispatch(toastActions.show({type: "success", text: 'Данные сохранены'})));
              }).catch(() => {
                store.dispatch(toastActions.show({type: "error", text: 'Ошибка при сохранении'}))
              })
            }
          }}
        >
          {
            ({values, setFieldValue, dirty, submitForm}) => {
              
              return <Form>
                <div className={classes.status}>
                  <ChangeStatusBtn status={values?.order_status} onStatusChanged={(status) => setFieldValue('order_status', status)}/>
                </div>
                <div className={classes.client}>
                  <h2 className={classes.header}>Данные о клиенте:</h2>
                  {orderId != -1 && orderId != null ? (
                    <>
                      <CRow>
                        <CCol className={classes.infofield}>
                          <Field name="client_fio" >{({ field }: FieldProps) => 
                            <CFormInput  type="text" label="ФИО:" {...field} disabled />}
                          </Field>
                        </CCol>
                        <CCol className={classes.infofield}>
                          <Field name="client_phone">{({ field }: FieldProps) => 
                            <CFormInput type="tel" label="Телефон:" {...field} disabled />}
                          </Field>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className={classes.infofield}>
                          <Field name="client_dob">{({ field }: FieldProps) => 
                            <CFormInput type="date" label="Дата рождения:" {...field} disabled />}
                          </Field>
                        </CCol>
                        <CCol className={classes.infofield}>
                          <CFormSelect
                            label="Менеджер:"
                            onChange={(e) => {
                              setFieldValue('mentor_id', e.target.value);
                            }}
                            className={classNames(classes.select, {}, [classes.infofield])}
                            value={values?.mentor_id}
                            options={mentors as any}
                            disabled
                          />
                        </CCol>
                      </CRow>
                    </>) : 
                    <>
                      <CRow>
                        <CCol>
                          <CFormSelect
                            label="Код и ФИО клиента:"
                            onChange={(e) => {
                              setFieldValue('client_id', e.target.value);
                            }}
                            className={classes.select}
                            value={values?.client_id}
                            options={clients as any}
                          />
                        </CCol>
                      </CRow></>
                  
                  }
                </div>
                <div className={classes.abonement}>
                  <h2 className={classes.header}>Сведения по заявке:</h2>
                  <div className={classes.abonementEntry}>
                    <CRow>
                      <CCol>
                        <Field name="order_createdat">{({ field }: FieldProps) => 
                          <CFormInput type="date" label="Дата обращения:" {...field} />}
                        </Field>
                      </CCol>
                      <CCol>
                        <CFormSelect
                          label="Обработал:"
                          onChange={(e) => {
                            setFieldValue('order_mentor_id', e.target.value);
                          }}
                          className={classes.select}
                          value={values?.order_mentor_id}
                          options={mentors as any}
                        />
                      </CCol>
                    </CRow>
                    <CRow className={classes.row}>
                      <CCol>
                        <Field name="order_notes">{({ field }: FieldProps) => 
                          <CFormTextarea
                            rows={3}
                            className={classes.select}
                            label="Примечания:" 
                            {...field}
                          ></CFormTextarea>
                        }
                        </Field>
                      </CCol>
                    </CRow>
                      
                    
                  </div>
                  
                </div>
                <div className={classes.abonement}>
                  <h2 className={classes.header}>Сведения по абонементу: {!values?.abonement_id ? <small>(не закреплен)</small>: null}</h2>
                  <div className={classes.abonementEntry}>
              
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
                    <CRow ><CCol>Стоимость, руб.: {values?.abonement_price}</CCol></CRow>
                    <CRow ><CCol>Длительность, руб.: {values?.abonement_duration}</CCol></CRow>
                    <CRow className={classes.row}><CCol>{(values?.purchase_ispaid && (values?.abonement_id == values?.purchase_abonement_id)) ? <div className={classes.paid}>Оплата получена</div> : <div className={classes.unpaid}>Не оплачен</div> }</CCol></CRow>
                  </div>
                  
                </div>
                
                <div className={classes.controls}>
                  { dirty && !values?.purchase_ispaid && values?.abonement_id ? <ApplyBtn duration={1000} color="#172ad5" onApply={async () => {
                    setFieldValue('purchase_ispaid', true);
                    setFieldValue('purchase_startdate', moment().format('YYYY-MM-DD'));
                    setFieldValue('purchase_enddate', moment().add(values?.abonement_duration, 'd').format('YYYY-MM-DD'));                    
                  
                    setTimeout(() => {submitForm()}, 100);
                  }}>Сохранить и провести</ApplyBtn> : null}
                  { dirty && <ApplyBtn duration={1000} color="#17d517" onApply={submitForm} >Сохранить изменения</ApplyBtn>}
                  { values?.purchase_ispaid && values?.abonement_id && <ApplyBtn duration={1000} color="#d51717" onApply={async () => {
                    await setFieldValue('purchase_ispaid', false);
                    setTimeout(() => {submitForm()}, 100);
                  }}>Отменить оплату</ApplyBtn>}
                  
                </div>
              </Form>
            }
          }

        </Formik>

      </COffcanvasBody>
    </COffcanvas>
  
  );
}