import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import React from 'react';
import { Header, Navbar } from '@widgets';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { MainLayout } from '@shared/elements';
import { AuthController } from '@shared/services';
import { NavbarLinks } from '@shared/const';

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
