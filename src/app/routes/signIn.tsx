import { createFileRoute } from '@tanstack/react-router';
import { SignInPage } from '@wflow-front/pages';

export const Route = createFileRoute('/signIn')({
  component: SignInPage,
});
