import { createRootRoute, Outlet } from '@tanstack/react-router';
import { MainLayout } from '@wflow-front/shared';
import { Header, Navbar } from '@wflow-front/widgets';
import React from 'react';

export const Route = createRootRoute({
  component: () => (
    <>
      <MainLayout
        header={<Header />}
        content={<Outlet />}
        navbar={<Navbar />}
      />

      {/*<TanStackRouterDevtools position={'bottom-right'} />*/}
    </>
  ),
});
