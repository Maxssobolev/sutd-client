import { GetAllAbonements, GetStats } from 'shared/types/api/abonements';
import useSWR, { SWRResponse } from 'swr';

import { $hostGet } from 'shared/http/helpers/hostGet';
import {CChart} from '@coreui/react-chartjs'
import { FC } from 'react';
import { GetResponse } from 'shared/types/api/getResponse';
import { IPage } from 'shared/types/page.interface';
import classes from './DashboardPage.module.scss';
import { stringToColor } from 'shared/lib/helpers/generateColor/generateColor';

export const DashboardPage: FC<IPage> = ({name}) => {

  const { data: stats, isLoading }: SWRResponse<GetStats[]> = useSWR(
    `api/abonements/stats`,
    $hostGet,
  );

  return (
    <div className={classes.DashboardPage}>
      <h1 className='text-lg'>Добро пожаловать, Максим!</h1>

      <div className={classes.chart}>
        <div className={classes.chartHeader}>Проданных абонементов</div>
        {stats ? 
          <div>
            <CChart
              height={300}
              width={300}
              type="doughnut"
              data={{
                labels: stats.map(abonement => `${abonement.abonement_title}  (${abonement.abonement_quantity} шт.)`),
                datasets: [
                  {
                    backgroundColor: stats.map(abonement => stringToColor(abonement.abonement_title)),
                    data: stats.map(abonement => abonement.abonement_totalprice),
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
    </div>
  );
}