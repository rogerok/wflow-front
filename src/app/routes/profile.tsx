import { createFileRoute } from '@tanstack/react-router';
import { ProfilePage } from '@wflow-front/pages';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});
