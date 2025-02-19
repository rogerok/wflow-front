import './styles/index.scss';

import { cn } from '@bem-react/classname';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { observer } from 'mobx-react-lite';
import React, { FC, ReactElement, useEffect } from 'react';
import { routeTree } from '../routeTree.gen';
import { GlobalStoreContextProvider, useGlobalStore } from '@shared/stores';
import { z } from 'zod';

export const router = createRouter({
  routeTree,
  context: {
    isAuth: false,
    authController: undefined,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

declare global {
  interface WindowEventMap {
    localStorageChange: CustomEvent;
  }
}

z.setErrorMap((error, ctx) => {
  let errorMessage = ctx.defaultError;
  console.error(error, ctx);
  return {
    message: errorMessage,
  };
});

const cnApp = cn('App');

const InnerApp: FC = observer(() => {
  const { theme, authController, userService } = useGlobalStore();

  useEffect(() => {
    const trackLocalStorage = authController.trackLocalStorageToken;

    window.addEventListener('storage', trackLocalStorage);
    window.addEventListener(
      'localStorageChange',
      authController.handleTokenRemoval,
    );

    return () => {
      window.removeEventListener('storage', trackLocalStorage);
      window.removeEventListener(
        'localStorageChange',
        authController.handleTokenRemoval,
      );
    };
  }, []);

  return (
    <div className={cnApp(undefined, [theme.current])}>
      <RouterProvider
        router={router}
        context={{
          isAuth: userService.isAuth,
          authController: authController,
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
