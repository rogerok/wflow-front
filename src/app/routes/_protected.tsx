import { createFileRoute, redirect } from '@tanstack/react-router';
import { routes } from '@shared';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context }) => {
    if (!context.isAuth) {
      const isSuccess = await context.authController?.restoreSession();

      if (!isSuccess) {
        throw redirect({
          to: routes.main(),
        });
      }
    }
  },
});
