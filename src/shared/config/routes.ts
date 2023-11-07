import { HiChartPie, HiClipboard, HiUsers } from 'react-icons/hi';
import React, { FC, LazyExoticComponent } from 'react';

import { IPage } from 'shared/types/page.interface';
import { IconType } from 'react-icons/lib/cjs/iconBase'

const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const ClientsPage = React.lazy(() => import('pages/ClientsPage'));
const OrdersPage = React.lazy(() => import('pages/OrdersPage'));
const AbonementsPage = React.lazy(() => import('pages/AbonementsPage'));


export interface IRoute {
  path: string;
  exact?: boolean;
  name: string;
  element?: LazyExoticComponent<FC<IPage>>;
  icon: IconType;
}

//Добавляем роуты тут

const routes: IRoute[] = [
  { icon: HiChartPie , path: '/dashboard', name: 'Панель управления', element: DashboardPage },
  { icon: HiUsers, path: '/clients', name: 'Клиенты', element: ClientsPage },
  { icon: HiClipboard, path: '/orders', name: 'Заявки', element: OrdersPage },
  { icon: HiClipboard, path: '/abonements', name: 'Абонементы', element: AbonementsPage },

];

export default routes;
