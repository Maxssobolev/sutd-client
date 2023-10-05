import { FC } from 'react';
import classes from './DashboardPage.module.scss';
import { IPage } from 'shared/types/page.interface';



export const DashboardPage: FC<IPage> = ({name}) => {

  return (
    <div className={classes.DashboardPage}>
      <h1 className='text-lg'>{name}</h1>
    </div>
  );
}