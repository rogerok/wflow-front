import { createFileRoute, redirect } from '@tanstack/react-router';
import { routes } from '@shared';

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context }) => {
    if (!context.isAuth) {
      throw redirect({
        to: routes.signIn(),
      });
    }
  },
});
