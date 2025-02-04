import { createRootRouteWithContext } from '@tanstack/react-router';
import React from 'react';
import { AuthController } from '@shared/services';
import { NavbarLinks } from '@shared/const';
import { MainLayout } from '../layouts/MainLayout/MainLayout';

interface RouterContext {
  isAuth: boolean;
  authController?: AuthController;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <MainLayout navbarLinks={NavbarLinks} />,
  beforeLoad: async ({ context }) => {
    if (!context.isAuth) {
      await context.authController?.restoreSession();
    }
  },
});
