import './styles/index.scss';

import { cn } from '@bem-react/classname';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { MainLayout, ThemeStore } from '@wflow-front/shared';
import { Header, Navbar } from '@wflow-front/widgets';
import { observer } from 'mobx-react-lite';
import React, { memo, ReactElement } from 'react';

import { routeTree } from '../routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const cnApp = cn('App');

export const Card = memo(
  ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }): ReactElement => {
    return (
      <div className={'card'}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    );
  }
);

function App(): ReactElement {
  return (
    <div className={cnApp(undefined, [ThemeStore.theme])}>
      <MainLayout
        header={<Header />}
        content={<RouterProvider router={router} />}
        navbar={<Navbar />}
      />
    </div>
  );
}

export default observer(App);
