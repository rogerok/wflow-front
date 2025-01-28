import './styles/index.scss';

import { cn } from '@bem-react/classname';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { observer } from 'mobx-react-lite';
import React, { FC, ReactElement, useEffect } from 'react';
import { GlobalStoreContextProvider, useGlobalStore } from '@shared';
import { routeTree } from '../routeTree.gen';

export const router = createRouter({
  routeTree,
  context: {
    isAuth: false,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const cnApp = cn('App');

const InnerApp: FC = observer(() => {
  const { theme, authController, userService } = useGlobalStore();

  useEffect(() => {
    authController.restoreSession();

    const trackLocalStorage = authController.trackLocalStorageToken;

    window.addEventListener('storage', trackLocalStorage);

    return () => {
      window.removeEventListener('storage', trackLocalStorage);
    };
  }, []);

  return (
    <div className={cnApp(undefined, [theme.current])}>
      <RouterProvider
        router={router}
        context={{
          isAuth: userService.isAuth,
        }}
      />
    </div>
  );
});

function App(): ReactElement {
  return (
    <GlobalStoreContextProvider router={router}>
      <InnerApp />
    </GlobalStoreContextProvider>
  );
}

export default observer(App);
