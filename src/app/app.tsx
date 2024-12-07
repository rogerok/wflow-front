import './styles/index.scss';

import { cn } from '@bem-react/classname';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import {
  GlobalStoreContextProvider,
  useGlobalStore,
} from '@wflow-front/shared';
import { observer } from 'mobx-react-lite';
import React, { FC, ReactElement } from 'react';

import { routeTree } from '../routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const cnApp = cn('App');

const WflowApp: FC = observer(() => {
  const { theme } = useGlobalStore();

  return (
    <div className={cnApp(undefined, [theme.current])}>
      <RouterProvider router={router} />
    </div>
  );
});

function App(): ReactElement {
  return (
    <GlobalStoreContextProvider>
      <WflowApp />
    </GlobalStoreContextProvider>
  );
}

export default observer(App);
