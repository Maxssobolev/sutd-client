
import { Sidebar } from 'widgets/Sidebar';
import { AppRouter } from './providers/router/AppRouter';
import './styles/index.scss'
import { FC } from 'react';


export const App: FC = () => {

  return (
    <div className='root'>
      <Sidebar />
      <AppRouter />
    </div>
  );
}