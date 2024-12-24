import { createFileRoute } from '@tanstack/react-router';
import { SignInPage } from '@pages';

export const Route = createFileRoute('/(auth)/signIn')({
  component: SignInPage,
});
