import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import React from 'react';
import { AuthController, MainLayout, NavbarLinks } from '@shared';
import { Header, Navbar } from '@widgets';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface RouterContext {
  isAuth: boolean;
  authController?: AuthController;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <MainLayout
        header={<Header />}
        content={<Outlet />}
        navbar={<Navbar links={NavbarLinks} />}
      />

      <TanStackRouterDevtools position={'top-right'} />
    </>
  ),
  beforeLoad: async ({ context }) => {
    if (!context.isAuth) {
      await context.authController?.restoreSession();
    }
  },
});
