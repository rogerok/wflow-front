import { createFileRoute } from '@tanstack/react-router';
import { SignUpPage } from '@pages';

export const Route = createFileRoute('/(auth)/signUp')({
  component: SignUpPage,
});
