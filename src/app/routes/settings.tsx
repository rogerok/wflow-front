import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@pages';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});
