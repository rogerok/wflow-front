import './styles/index.scss';

import { cn } from '@bem-react/classname';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { observer } from 'mobx-react-lite';
import React, { FC, ReactElement, useEffect } from 'react';

import { routeTree } from '../routeTree.gen';
import { GlobalStoreContextProvider, useGlobalStore } from '@shared';

export const router = createRouter({
  routeTree,
  context: {
    isAuth: undefined,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const cnApp = cn('App');

const InnerApp: FC = observer(() => {
  const { theme, isAuth, authController } = useGlobalStore();

  useEffect(() => {
    authController.restoreSession();
  }, []);

  return authController.userService.getUserRequestStore.isLoading ? (
    <div style={{ width: '1000px', background: 'red' }}>Loading</div>
  ) : (
    <div className={cnApp(undefined, [theme.current])}>
      <RouterProvider router={router} context={{ isAuth: isAuth }} />
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
