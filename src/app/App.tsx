
import { Sidebar } from 'widgets/Sidebar';
import { AppRouter } from './providers/router/AppRouter';
import './styles/index.scss'
import { FC } from 'react';
import { PageLayout, RootLayout } from 'shared/ui/Layout';


export const App: FC = () => {

  return (
    <div className='root'>
      <RootLayout>
        <Sidebar />
        <PageLayout>
          <AppRouter />
        </PageLayout>
      </RootLayout>
    </div>
  );
}