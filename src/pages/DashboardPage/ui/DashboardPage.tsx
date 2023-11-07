import { CCard, CCardBody, CCardHeader, CCardText, CCardTitle } from '@coreui/react';

import { FC } from 'react';
import { IPage } from 'shared/types/page.interface';
import classes from './DashboardPage.module.scss';

export const DashboardPage: FC<IPage> = ({name}) => {

  return (
    <div className={classes.DashboardPage}>
      <h1 className='text-lg'>Добро пожаловать, Максим!</h1>
      
    </div>
  );
}