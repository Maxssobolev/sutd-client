import { FC } from 'react';
import classes from './OrdersPage.module.scss';
import { IPage } from 'shared/types/page.interface';



export const OrdersPage: FC<IPage> = ({name}) => {

  return (
    <div className={classes.OrdersPage}>
      <h1 className='text-lg'>{name}</h1>
    </div>
  );
}