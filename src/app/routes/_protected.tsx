import { createFileRoute, redirect } from '@tanstack/react-router';
import { routes } from '@shared/const';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context }) => {
    if (!context.isAuth) {
      throw redirect({
        to: routes.main(),
      });
    }
  },
});
