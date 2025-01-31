import { createLazyFileRoute } from '@tanstack/react-router';
import { ProfilePage } from '@pages/ProfilePage';

export const Route = createLazyFileRoute('/_protected/profile')({
  component: ProfilePage,
});
