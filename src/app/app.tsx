import './styles/index.scss';

import { cn } from '@bem-react/classname';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ThemeStore } from '@wflow-front/shared';
import { observer } from 'mobx-react-lite';
import React, { ReactElement } from 'react';

import { routeTree } from '../routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const cnApp = cn('App');

function App(): ReactElement {
  return (
    <div className={cnApp(undefined, [ThemeStore.theme])}>
      <RouterProvider router={router} />
    </div>
  );
}

export default observer(App);
