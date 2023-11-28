import {CBadge, CCard, CCardBody, CCardHeader, CCol, CListGroup, CListGroupItem, CRow} from '@coreui/react'
import { GetAllAbonements, GetCommonStats, GetStats } from 'shared/types/api/abonements';
import useSWR, { SWRResponse } from 'swr';

import { $hostGet } from 'shared/http/helpers/hostGet';
import {CChart} from '@coreui/react-chartjs'
import { FC } from 'react';
import { GetResponse } from 'shared/types/api/getResponse';
import { IPage } from 'shared/types/page.interface';
import classes from './DashboardPage.module.scss';
import { stringToColor } from 'shared/lib/helpers/generateColor/generateColor';

export const DashboardPage: FC<IPage> = ({name}) => {

  const { data: chartsStats }: SWRResponse<GetStats[]> = useSWR(
    `api/abonements/stats`,
    $hostGet,
  );

  const { data: commonStats }: SWRResponse<GetCommonStats> = useSWR(
    `api/abonements/commonstats`,
    $hostGet,
  );

  return (
    <div className={classes.DashboardPage}>
      <h1 className={classes.mainHeader}>Добро пожаловать, Максим!</h1>

      <div className={classes.widgets}>
        
        <div className={classes.chart}>
          <div className={classes.chartHeader}>Соотношение общих стоимостей проданных абонементов</div>
          {chartsStats ? 
            <div>
              <CChart
                height={300}
                width={300}
                type="doughnut"
                data={{
                  labels: chartsStats.map(abonement => `${abonement.abonement_title}  (${abonement.abonement_quantity} шт.)`),
                  datasets: [
                    {
                      backgroundColor: chartsStats.map(abonement => stringToColor(abonement.abonement_title)),
                      data: chartsStats.map(abonement => abonement.abonement_totalprice),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: 'black',
                      }
                    }
                  },
                }}
              />
            </div> : <div>Статистика по абонементам не найдена</div> }
        </div>
       

        
        <CCard className={classes.commonStats}>
          <CCardHeader>Общая сводка</CCardHeader>
          <CCardBody>
            <CListGroup>
              <CListGroupItem className="d-flex justify-content-between align-items-center">
                Всего клиентов
                <CBadge color="primary" shape="rounded-pill">
                  {commonStats?.clients_total_count}
                </CBadge>
              </CListGroupItem>
              <CListGroupItem className="d-flex justify-content-between align-items-center">
                Проданных абонементов
                <CBadge color="primary" shape="rounded-pill">
                  {commonStats?.orders_total_open_count} на сумму {commonStats?.purchases_total_amount}₽
                </CBadge>
              </CListGroupItem>
              <CListGroupItem className="d-flex justify-content-between align-items-center">
                Открытых заявок
                <CBadge color="primary" shape="rounded-pill">
                  {commonStats?.purchases_total_count}
                </CBadge>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
        
      </div>
    </div>
  );
}