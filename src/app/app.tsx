import './styles/index.scss';

import { cn } from '@bem-react/classname';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { observer } from 'mobx-react-lite';
import React, { FC, ReactElement, useEffect } from 'react';

import { routeTree } from '../routeTree.gen';
import {
  globalStore,
  GlobalStoreContextProvider,
  useGlobalStore,
} from '@shared';

export const router = createRouter({
  routeTree,
  context: {
    isAuth: globalStore.userService.isAuth,
    authController: globalStore.authController,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const cnApp = cn('App');

const InnerApp: FC = observer(() => {
  const { theme, authController } = useGlobalStore();

  useEffect(() => {
    authController.restoreSession();
  }, []);

  return (
    <div className={cnApp(undefined, [theme.current])}>
      <RouterProvider router={router} />
    </div>
  );
});

function App(): ReactElement {
  return (
    <GlobalStoreContextProvider>
      <InnerApp />
    </GlobalStoreContextProvider>
  );
}

export default observer(App);
