import React, {  FC, LazyExoticComponent } from 'react';
import { IPage } from 'shared/types/page.interface';

const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const ClientsPage = React.lazy(() => import('pages/ClientsPage'));
const OrdersPage = React.lazy(() => import('pages/OrdersPage'));


export interface IRoute {
  path: string;
  exact?: boolean;
  name: string;
  element?: LazyExoticComponent<FC<IPage>>;
}

//Добавляем роуты тут

const routes: IRoute[] = [
  { path: '/dashboard', name: 'Панель управления', element: DashboardPage },
  { path: '/clients', name: 'Клиенты', element: ClientsPage },
  { path: '/orders', name: 'Заявки', element: OrdersPage },

];

export default routes;
