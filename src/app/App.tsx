import '@coreui/coreui/dist/css/coreui.min.css'
import './styles/index.scss'

import { PageLayout, RootLayout } from 'shared/ui/Layout';

import { AppRouter } from './providers/router/AppRouter';
import { FC } from 'react';
import { OffcanvasClient } from 'widgets/OffcanvasClient';
import { Sidebar } from 'widgets/Sidebar';
import { Toaster } from 'shared/ui/Toaster/Toaster';

export const App: FC = () => {

  return (
    <div className='root'>
      <RootLayout>
        <Sidebar />
        <PageLayout>
          <AppRouter />
        </PageLayout>
      </RootLayout>

      <OffcanvasClient />
      <Toaster />
    </div>
  );
}