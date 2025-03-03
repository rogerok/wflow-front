import { createRootRouteWithContext } from '@tanstack/react-router';
import React from 'react';
import { AuthController } from '@shared/services';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { NotFoundPage } from '@pages/NotFoundPage';

interface RouterContext {
  isAuth: boolean;
  authController?: AuthController;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <MainLayout />,
  beforeLoad: async ({ context }) => {
    if (!context.isAuth) {
      await context.authController?.restoreSession();
    }
  },
  notFoundComponent: () => <NotFoundPage />,
});
