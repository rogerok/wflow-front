import { createRootRoute, Outlet } from '@tanstack/react-router';
import React from 'react';
import { MainLayout, NavbarLinks } from '@shared';
import { Header, Navbar } from '@widgets';

export const Route = createRootRoute({
  component: () => (
    <>
      <MainLayout
        header={<Header />}
        content={<Outlet />}
        navbar={<Navbar links={NavbarLinks} />}
      />

      {/*<TanStackRouterDevtools position={'bottom-right'} />*/}
    </>
  ),
});
